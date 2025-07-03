import 'dotenv/config'
import express from "express";
import cors from "cors";
import Anthropic from '@anthropic-ai/sdk';
import { promptEnhancer } from "./prompts/promptEnhancer";
import { codegenPrompt } from "./prompts/codegenPrompt";
import { TextBlock } from "@anthropic-ai/sdk/resources/messages";
import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { SYSTEM_ANALYSIS_PROMPT } from "./prompts/analysisPrompt";


const anthropic = new Anthropic();
const app = express();
app.use(cors())
app.use(express.json())
app.use('/videos', express.static(path.join(__dirname, '../render-worker/media/videos/scene/720p30')));


app.post("/api/enhance-prompt", async(req, res)=> {

    const prompt = req.body.prompt

    if (!prompt) {
    res.status(400).json({ error: "Missing `prompt` in request body." });
    return;
  }

    try {
        const enhancedAI = await anthropic.messages.create({
  model: "claude-opus-4-20250514",
  max_tokens: 1024,
  messages: [{ role: "user", content: prompt }],
  system: promptEnhancer
});
    const enhancedResponse = (enhancedAI.content[0] as TextBlock).text.trim() 

function getRawPrompt(input: string): string {
  // 1. Replace all line breaks (LF or CRLF) with spaces
  const noLineBreaks = input.replace(/\r?\n/g, ' ');

  // 2. Collapse any sequence of whitespace into a single space, then trim
  const collapsed = noLineBreaks.replace(/\s+/g, ' ').trim();

  // 3. Escape any internal double quotes so that the result can be put inside a JSON string
  const escaped = collapsed.replace(/"/g, '\\"');

  // 4. Return the escaped, single‐line prompt
  return escaped;
}

const enhancedPrompt = getRawPrompt(enhancedResponse);

 res.status(200).json({message: "code enhance successful", enhancedPrompt})


    } catch (err) {
       console.error("Enhancer error:", err);
     res.status(500).json({ error: "Failed to enhance prompt." });
    return;
}
})

// Extract the video generation logic into a reusable function
async function generateVideoFromCode(code: string): Promise<{ videoUrl: string; sceneClassName: string }> {
    return new Promise((resolve, reject) => {
        try {
            // Write scene.py
            const sceneFile = path.join(__dirname, '../render-worker/scene.py');
            fs.writeFileSync(sceneFile, code, 'utf8');

            // Extract scene class name from scene.py
            const sceneContent = fs.readFileSync(sceneFile, "utf8");
            const match = sceneContent.match(/class\s+(\w+)\s*\(\s*Scene\s*\)/);
            if (!match) {
                reject(new Error("Could not find scene class name."));
                return;
            }
            const sceneClassName = match[1];

            // Build the docker run command
            const PWD = path.join(__dirname, '../render-worker');
            const dockerArgs = [
                'run', '--rm',
                '-v', `${PWD}:/manim`,
                '-w', '/manim',
                'manimcommunity/manim:latest',
                'manim', 'scene.py', sceneClassName, '-qm'
            ];

            // Run Docker
            const dockerProcess = spawn('docker', dockerArgs, { timeout: 5 * 60 * 1000 });

            let stdout = '';
            let stderr = '';

            dockerProcess.stdout.on('data', (data) => {
                stdout += data.toString();
            });

            dockerProcess.stderr.on('data', (data) => {
                stderr += data.toString();
            });

            dockerProcess.on('close', async (code) => {
                if (code !== 0) {
                    reject(new Error(`Docker failed: ${stderr}`));
                    return;
                }

                // Path to the rendered video
                const videoPath = path.join(PWD, 'media', 'videos', 'scene', '720p30', `${sceneClassName}.mp4`);

                // Wait for the file to appear
                const maxWait = 60000;
                const interval = 200;
                let waited = 0;
                while (!fs.existsSync(videoPath) && waited < maxWait) {
                    await new Promise(r => setTimeout(r, interval));
                    waited += interval;
                }

                if (!fs.existsSync(videoPath)) {
                    reject(new Error("Rendered video not found."));
                    return;
                }

                // Check file size > 0
                const stats = fs.statSync(videoPath);
                if (stats.size === 0) {
                    reject(new Error("Rendered video is empty."));
                    return;
                }

                // Return the video URL
                const publicUrl = `/videos/${sceneClassName}.mp4`;
                resolve({ videoUrl: publicUrl, sceneClassName });
            });

        } catch (err) {
            reject(err);
        }
    });
}

// Modified /chat endpoint - generates code AND video
app.post("/chat", async (req, res) => {
    const prompt = req.body.enhancedPrompt;

    if (!prompt) {
        res.status(400).json({ error: "Missing `enhancedPrompt` in request body." });
        return;
    }
    
    try {
        // 1. ANALYSIS PHASE
        const analysisAi = await anthropic.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 8000,
            system: SYSTEM_ANALYSIS_PROMPT,
            messages: [
                { role: 'user', content: prompt },
            ],
        });
        const analysisText = (analysisAi.content[0] as TextBlock).text;

        if(!analysisText){ 
            console.error("Analysis failed - no text returned");
            res.status(500).json({ error: "Analysis failed" });
            return;
        }

        // 2. CODE GENERATION PHASE
        const codeAI = await anthropic.messages.create({
            messages:[{ role: "user", content: analysisText }],
            model: 'claude-sonnet-4-20250514',
            max_tokens: 8000,
            system: codegenPrompt
        });

        let codeText = (codeAI.content[0] as TextBlock).text;

        if(!codeText) {
            console.error("Code generation failed - no text returned");
            res.status(500).json({ error: "Code generation failed" });
            return;
        }

        // Optionally inject BROWN if needed
        if (/BROWN/.test(codeText) && !/^BROWN\s*=/.test(codeText)) {
            codeText = codeText.replace(
                /(from manim import \*.*\n)/,
                `$1BROWN = "#A52A2A"\n`
            );
        }

        // 3. GENERATE VIDEO FROM THE CODE
        const videoResult = await generateVideoFromCode(codeText);

        // 4. RETURN BOTH CODE AND VIDEO
        res.status(200).json({ 
            code: codeText, 
            videoUrl: videoResult.videoUrl,
            sceneClassName: videoResult.sceneClassName 
        });

    } catch (err) {
        console.error("Chat error:", err);
        res.status(500).json({ error: err instanceof Error ? err.message : "Failed to generate code and video." });
        return;
    }
});

// Simplified /generate-video endpoint - just for code edits
app.post("/generate-video", async (req, res) => {
    const { code } = req.body;
    if (!code) {
        res.status(400).json({ error: "Missing `code` in request body." });
        return;
    }

    try {
        const videoResult = await generateVideoFromCode(code);
        res.status(200).json({ videoUrl: videoResult.videoUrl });
    } catch (err) {
        console.error("Generate-video error:", err);
        res.status(500).json({ error: err instanceof Error ? err.message : "Failed to generate video." });
        return;
    }
});

// app.post("/chat", async (req, res) => {
//     const prompt = req.body.enhancedPrompt;

//     if (!prompt) {
//         res.status(400).json({ error: "Missing `enhancedPrompt` in request body." });
//         return;
//     }
    
//     try {
//         // 1. ANALYSIS PHASE
//         const analysisAi = await anthropic.messages.create({
//             model: 'claude-opus-4-20250514',
//             max_tokens: 4000,
//             system: SYSTEM_ANALYSIS_PROMPT,
//             messages: [
//                 { role: 'user', content: prompt },
//             ],
//         });
//         const analysisText = (analysisAi.content[0] as TextBlock).text;

//         if(!analysisText){ 
//             console.error("Analysis failed - no text returned");
//             res.status(500).json({ error: "Analysis failed" });
//             return;
//         }

//         // 2. CODE GENERATION PHASE
//         const codeAI = await anthropic.messages.create({
//             messages:[{ role: "user", content: analysisText }],
//             model: 'claude-sonnet-4-20250514',
//             max_tokens: 8000,
//             system: codegenPrompt
//         });

//         let codeText = (codeAI.content[0] as TextBlock).text;

//         if(!codeText) {
//             console.error("Code generation failed - no text returned");
//             res.status(500).json({ error: "Code generation failed" });
//             return;
//         }

//         // Optionally inject BROWN if needed
//         if (/BROWN/.test(codeText) && !/^BROWN\s*=/.test(codeText)) {
//             codeText = codeText.replace(
//                 /(from manim import \*.*\n)/,
//                 `$1BROWN = "#A52A2A"\n`
//             );
//         }

//         // Extract scene class name from codeText
//         const match = codeText.match(/class\s+(\w+)\s*\(\s*Scene\s*\)/);
//         if (!match) {
//             res.status(500).json({ error: "Could not find scene class name." });
//             return;
//         }
//         const sceneClassName = match[1];

//         // Return code and scene class name to frontend
//         res.status(200).json({ code: codeText, sceneClassName });

//     } catch (err) {
//         console.error("Codegen error:", err);
//         res.status(500).json({ error: "Failed to generate code." });
//         return;
//     }
// });

// app.post("/generate-video", async (req, res) => {
//     const { code } = req.body;
//     if (!code) {
//         res.status(400).json({ error: "Missing `code` in request body." });
//         return;
//     }

//     try {
//         // Write scene.py
//         const sceneFile = path.join(__dirname, '../render-worker/scene.py');
//         fs.writeFileSync(sceneFile, code, 'utf8');

//         // Extract scene class name from scene.py
//         const sceneContent = fs.readFileSync(sceneFile, "utf8");
//         const match = sceneContent.match(/class\s+(\w+)\s*\(\s*Scene\s*\)/);
//         if (!match) {
//             res.status(500).json({ error: "Could not find scene class name." });
//             return;
//         }
//         const sceneClassName = match[1];

//         // Build the docker run command
//         const PWD = path.join(__dirname, '../render-worker');
//         const dockerArgs = [
//             'run', '--rm',
//             '-v', `${PWD}:/manim`,
//             '-w', '/manim',
//             'manimcommunity/manim:latest',
//             'manim', 'scene.py', sceneClassName, '-qm'
//         ];

//         // Run Docker and respond after completion
//         const dockerProcess = spawn('docker', dockerArgs, { timeout: 5 * 60 * 1000 });

//         let stdout = '';
//         let stderr = '';

//         dockerProcess.stdout.on('data', (data) => {
//             stdout += data.toString();
//         });

//         dockerProcess.stderr.on('data', (data) => {
//             stderr += data.toString();
//         });

//         dockerProcess.on('close', async (code) => {
//             if (code !== 0) {
//                 console.error("Docker error:", stderr);
//                 res.status(500).json({ error: "Failed to render video." });
//                 return;
//             }

//             // Path to the rendered video
//             const videoPath = path.join(PWD, 'media', 'videos', 'scene', '720p30', `${sceneClassName}.mp4`);

//             // Wait for the file to appear (max 15 seconds, check every 200ms)
//             const maxWait = 15000;
//             const interval = 200;
//             let waited = 0;
//             while (!fs.existsSync(videoPath) && waited < maxWait) {
//                 await new Promise(r => setTimeout(r, interval));
//                 waited += interval;
//             }

//             if (!fs.existsSync(videoPath)) {
//                 res.status(500).json({ error: "Rendered video not found." });
//                 return;
//             }

//             // Optionally, check file size > 0
//             const stats = fs.statSync(videoPath);
//             if (stats.size === 0) {
//                 res.status(500).json({ error: "Rendered video is empty." });
//                 return;
//             }

//             // Send the video URL
//             const publicUrl = `/videos/${sceneClassName}.mp4`;
//             res.status(200).json({ videoUrl: publicUrl });
//         });

//     } catch (err) {
//         console.error("Generate-video error:", err);
//         res.status(500).json({ error: "Failed to generate video." });
//         return;
//     }
// });

app.listen(3000, ()=>{
    console.log('app running on port 3000')
});
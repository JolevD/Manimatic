require("dotenv").config();
import express from "express";
import cors from "cors";
import Anthropic from '@anthropic-ai/sdk';
import { promptEnhancer } from "./prompts/promptEnhancer";
import { codegenPrompt } from "./prompts/codegenPrompt";
import { TextBlock } from "@anthropic-ai/sdk/resources/messages";
import fs from "fs";
import path from "path";


const anthropic = new Anthropic();
const app = express();
app.use(cors())
app.use(express.json())


app.post("/chat", async (req, res) => {
    const prompt = req.body.prompt;

   try {
    const enhancedAI = await anthropic.messages.create({
  model: "claude-opus-4-20250514",
  max_tokens: 1024,
  messages: [{ role: "user", content: prompt }],
  system: promptEnhancer
});
    const enhancedResponse = (enhancedAI.content[0] as TextBlock).text 
    console.log(enhancedResponse)

    const codeAI = await anthropic.messages.create({
        messages:[{ role: "user", content: enhancedResponse }],
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8000,
        system: codegenPrompt
    })

    const codeText = (codeAI.content[0] as TextBlock).text

        // 2) Persist to disk for Docker worker
        const sceneFile = path.join(__dirname, '../render-worker/scene.py');
        fs.writeFileSync(sceneFile, codeText, 'utf8');

        res.status(200).json({message: "code gen successful"})
   } catch (error) {
    console.log(error)
   }


})

app.listen(3000);
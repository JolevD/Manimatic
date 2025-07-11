import React, { useState } from 'react';
import { Copy, FileCode, Send, Loader2 } from 'lucide-react';

interface ManimCodeDisplayProps {
  prompt: string;
}

const ManimCodeDisplay: React.FC<ManimCodeDisplayProps> = ({ prompt }) => {
  const [code, setCode] = useState(() => generateManimCode(prompt));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Generate sample Manim code based on the prompt
  function generateManimCode(userPrompt: string) {
    const lowerPrompt = userPrompt.toLowerCase();
    
    if (lowerPrompt.includes('pythagorean') || lowerPrompt.includes('theorem')) {
      return `from manim import *

class PythagoreanTheorem(Scene):
    def construct(self):
        # Create a right triangle
        triangle = Polygon(
            [-2, -1, 0], [2, -1, 0], [-2, 2, 0],
            color=WHITE, fill_opacity=0.3
        )
        
        # Add labels for sides
        a_label = MathTex("a").next_to(triangle, LEFT)
        b_label = MathTex("b").next_to(triangle, DOWN)
        c_label = MathTex("c").next_to(triangle, UR)
        
        # Create the theorem equation
        theorem = MathTex("a^2 + b^2 = c^2").to_edge(UP)
        
        # Animate the construction
        self.play(Create(triangle))
        self.play(Write(a_label), Write(b_label), Write(c_label))
        self.play(Write(theorem))
        
        # Highlight the relationship
        self.play(
            triangle.animate.set_fill(BLUE, opacity=0.5),
            theorem.animate.set_color(YELLOW)
        )
        
        self.wait(2)`;
    } else if (lowerPrompt.includes('sort') || lowerPrompt.includes('bubble')) {
      return `from manim import *

class BubbleSort(Scene):
    def construct(self):
        # Create array of numbers
        numbers = [64, 34, 25, 12, 22, 11, 90]
        array = VGroup()
        
        for i, num in enumerate(numbers):
            rect = Rectangle(width=0.8, height=1.2, color=WHITE)
            text = Text(str(num), font_size=24).move_to(rect.get_center())
            element = VGroup(rect, text)
            element.shift(RIGHT * i * 1.2 - RIGHT * 3.6)
            array.add(element)
        
        self.play(Create(array))
        
        # Bubble sort animation
        n = len(numbers)
        for i in range(n):
            for j in range(0, n - i - 1):
                # Highlight comparison
                self.play(
                    array[j].animate.set_color(RED),
                    array[j + 1].animate.set_color(RED)
                )
                
                if numbers[j] > numbers[j + 1]:
                    # Swap animation
                    self.play(
                        array[j].animate.shift(RIGHT * 1.2),
                        array[j + 1].animate.shift(LEFT * 1.2)
                    )
                    # Update array order
                    array[j], array[j + 1] = array[j + 1], array[j]
                    numbers[j], numbers[j + 1] = numbers[j + 1], numbers[j]
                
                # Reset colors
                self.play(
                    array[j].animate.set_color(WHITE),
                    array[j + 1].animate.set_color(WHITE)
                )
        
        self.wait(2)`;
    } else if (lowerPrompt.includes('matrix') || lowerPrompt.includes('multiplication')) {
      return `from manim import *

class MatrixMultiplication(Scene):
    def construct(self):
        # Create matrices
        matrix_a = Matrix([["a", "b"], ["c", "d"]], bracket_h_buff=0.1)
        matrix_b = Matrix([["e", "f"], ["g", "h"]], bracket_h_buff=0.1)
        times = MathTex("\\times").scale(1.5)
        equals = MathTex("=").scale(1.5)
        
        # Position matrices
        matrix_a.shift(LEFT * 3)
        times.next_to(matrix_a, RIGHT, buff=0.5)
        matrix_b.next_to(times, RIGHT, buff=0.5)
        equals.next_to(matrix_b, RIGHT, buff=0.5)
        
        # Result matrix
        result = Matrix([
            ["ae+bg", "af+bh"],
            ["ce+dg", "cf+dh"]
        ], bracket_h_buff=0.1)
        result.next_to(equals, RIGHT, buff=0.5)
        
        # Animate construction
        self.play(Write(matrix_a))
        self.play(Write(times))
        self.play(Write(matrix_b))
        self.play(Write(equals))
        
        # Show calculation process
        self.play(Create(result))
        
        # Highlight multiplication process
        for i in range(2):
            for j in range(2):
                self.play(
                    matrix_a.get_rows()[i].animate.set_color(YELLOW),
                    matrix_b.get_columns()[j].animate.set_color(BLUE),
                    result.get_entries()[i * 2 + j].animate.set_color(GREEN)
                )
                self.wait(0.5)
                self.play(
                    matrix_a.get_rows()[i].animate.set_color(WHITE),
                    matrix_b.get_columns()[j].animate.set_color(WHITE),
                    result.get_entries()[i * 2 + j].animate.set_color(WHITE)
                )
        
        self.wait(2)`;
    } else {
      return `from manim import *

class MathAnimation(Scene):
    def construct(self):
        # Create title based on user prompt
        title = Text("${prompt}", font_size=36)
        title.to_edge(UP)
        
        # Create a mathematical expression
        equation = MathTex("f(x) = x^2 + 2x + 1")
        equation.scale(1.5)
        
        # Create a graph
        axes = Axes(
            x_range=[-4, 4, 1],
            y_range=[-1, 9, 1],
            x_length=8,
            y_length=6
        )
        
        # Define the function
        graph = axes.plot(lambda x: x**2 + 2*x + 1, color=BLUE)
        
        # Animate the scene
        self.play(Write(title))
        self.play(Write(equation))
        self.play(Create(axes))
        self.play(Create(graph))
        
        # Add some dynamic elements
        dot = Dot(axes.coords_to_point(0, 1), color=RED)
        self.play(Create(dot))
        
        # Move the dot along the curve
        self.play(
            MoveAlongPath(dot, graph),
            run_time=3,
            rate_func=smooth
        )
        
        self.wait(2)`;
    }
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    setHasChanges(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
  };

  const handleSubmitCode = async () => {
    if (!hasChanges) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/submit-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          code: code.trim(),
          originalPrompt: prompt
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setHasChanges(false);
        // Show success message or update UI
        console.log('Code submitted successfully:', data);
      } else {
        console.error('Code submission failed:', data);
        throw new Error('Code submission failed');
      }
    } catch (error) {
      console.error('Error submitting code:', error);
      // Show user-friendly error message
      alert('Failed to submit code. Please check if the backend server is running on port 3000.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Code Header - Fixed */}
      <div className="fade-in flex items-center justify-between p-4 border-b border-emerald-900/20 flex-shrink-0 bg-slate-900/20">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-gradient-to-br from-emerald-600/80 to-slate-700/60 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <FileCode className="w-3 h-3 text-emerald-200" />
          </div>
          <span className="text-ui text-slate-200 text-sm">main.py</span>
          {hasChanges && (
            <span className="text-xs text-emerald-400 bg-emerald-900/30 px-2 py-0.5 rounded-full">
              Modified
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/60 hover:bg-slate-700/70 rounded-lg transition-all duration-300 backdrop-blur-sm border border-slate-700/30 hover:border-emerald-700/30"
            title="Copy code"
          >
            <Copy className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-ui text-slate-300 text-xs">Copy</span>
          </button>
          
          <button
            onClick={handleSubmitCode}
            disabled={!hasChanges || isSubmitting}
            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-600 disabled:opacity-50 rounded-lg transition-all duration-300 backdrop-blur-sm border border-emerald-600/50 hover:border-emerald-500/60 disabled:border-slate-600/30 disabled:cursor-not-allowed"
            title="Submit code changes"
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5 text-white" />
            )}
            <span className="text-ui text-white text-xs">
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </span>
          </button>
        </div>
      </div>

      {/* Code Content - Single Scrollable Container */}
      <div className="fade-in delay-100 flex-1 min-h-0 bg-slate-950/60">
        <textarea
          value={code}
          onChange={handleCodeChange}
          className="w-full h-full p-4 bg-transparent text-mono text-sm text-slate-300 leading-relaxed resize-none focus:outline-none border-none scrollbar-code"
          style={{ fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, monospace' }}
          spellCheck={false}
        />
      </div>

      {/* Code Footer - Fixed */}
      <div className="fade-in delay-200 px-4 py-3 border-t border-emerald-900/20 bg-slate-900/20 flex-shrink-0">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="text-ui">Manim Community Edition</span>
          <span className="text-mono">{code.split('\n').length} lines</span>
        </div>
      </div>
    </div>
  );
};

export default ManimCodeDisplay;
import React, { useState } from 'react';
import { 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  FileText, 
  Video, 
  Code, 
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Book,
  Zap,
  Users
} from 'lucide-react';
import Header from '../components/Header';
import BackgroundElements from '../components/BackgroundElements';

interface FAQItem {
  question: string;
  answer: string;
}

const HelpPage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How do I create my first video?",
      answer: "Simply describe your mathematical concept in natural language on the home page. For example, 'Pythagorean theorem' or 'bubble sort algorithm'. Our AI will generate an animated video explanation using Manim CE."
    },
    {
      question: "What types of mathematical concepts can I animate?",
      answer: "You can create animations for geometry theorems, calculus concepts, linear algebra, algorithms, data structures, signal processing, statistics, and more. The AI understands a wide range of mathematical and computational topics."
    },
    {
      question: "Can I customize the generated animations?",
      answer: "Yes! After generating a video, you can chat with the AI to request modifications, add explanations, change colors, adjust timing, or focus on specific aspects of the concept."
    },
    {
      question: "How do I share my videos?",
      answer: "You can publish your videos to the community gallery for others to see, or keep them private in your personal gallery. Use the publish button after generating a video to share it with the community."
    },
    {
      question: "What is Manim CE?",
      answer: "Manim Community Edition is a powerful Python library for creating mathematical animations. Our AI generates Manim code automatically, so you don't need to know programming to create professional-quality mathematical visualizations."
    },
    {
      question: "Can I download the generated videos?",
      answer: "Yes, you can download your generated videos in high quality. You can also view and copy the underlying Manim code if you want to learn or make manual modifications."
    },
    {
      question: "Is there a limit to how many videos I can create?",
      answer: "Free accounts have a monthly limit on video generation. Pro accounts get unlimited video creation, priority processing, and additional features. Check your account settings to see your current usage."
    },
    {
      question: "How can I improve my prompts for better results?",
      answer: "Be specific about what you want to visualize. Instead of 'math', try 'visualize the derivative of x squared with tangent lines'. Use the enhance prompt feature to automatically improve your descriptions."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-gray-950 background-fade">
      <BackgroundElements />
      
      <div className="fade-in-down">
        <Header />
      </div>

      <main className="relative z-10 px-4 sm:px-6 py-8 page-scroll">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="fade-in-up text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-600/80 to-slate-700/60 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-emerald-500/20">
              <HelpCircle className="w-8 h-8 text-emerald-200" />
            </div>
            <h1 className="text-display text-3xl sm:text-4xl md:text-5xl font-light bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-200 bg-clip-text text-transparent mb-4">
              Help & Support
            </h1>
            <p className="text-body text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about creating mathematical animations with AI
            </p>
          </div>

          {/* Quick Links */}
          <div className="fade-in-up delay-100 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-950/40 backdrop-blur-sm rounded-xl border border-emerald-900/20 p-6 text-center">
              <div className="w-12 h-12 bg-emerald-700/60 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Video className="w-6 h-6 text-slate-100" />
              </div>
              <h3 className="text-slate-200 font-medium mb-2">Getting Started</h3>
              <p className="text-slate-400 text-sm mb-4">Learn how to create your first mathematical animation</p>
              <button className="text-emerald-300 text-sm flex items-center gap-1 mx-auto">
                <span>View Tutorial</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="bg-slate-950/40 backdrop-blur-sm rounded-xl border border-emerald-900/20 p-6 text-center">
              <div className="w-12 h-12 bg-emerald-700/60 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-slate-100" />
              </div>
              <h3 className="text-slate-200 font-medium mb-2">API Documentation</h3>
              <p className="text-slate-400 text-sm mb-4">Integrate ManimAI into your own applications</p>
              <button className="text-emerald-300 text-sm flex items-center gap-1 mx-auto">
                <span>View Docs</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="bg-slate-950/40 backdrop-blur-sm rounded-xl border border-emerald-900/20 p-6 text-center">
              <div className="w-12 h-12 bg-emerald-700/60 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-slate-100" />
              </div>
              <h3 className="text-slate-200 font-medium mb-2">Community</h3>
              <p className="text-slate-400 text-sm mb-4">Connect with other creators and share ideas</p>
              <button className="text-emerald-300 text-sm flex items-center gap-1 mx-auto">
                <span>Join Discord</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="fade-in-up delay-200 mb-12">
            <h2 className="text-display text-2xl font-light text-slate-200 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4 scrollbar-modal">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-slate-950/40 backdrop-blur-sm rounded-xl border border-emerald-900/20 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-900/20 transition-colors duration-300"
                  >
                    <span className="text-slate-200 font-medium pr-4">{faq.question}</span>
                    {openFAQ === index ? (
                      <ChevronDown className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  
                  {openFAQ === index && (
                    <div className="px-6 pb-4 border-t border-emerald-900/20">
                      <p className="text-slate-400 leading-relaxed pt-4">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="fade-in-up delay-300 bg-slate-950/40 backdrop-blur-sm rounded-xl border border-emerald-900/20 p-8 text-center">
            <h2 className="text-display text-2xl font-light text-slate-200 mb-4">
              Still Need Help?
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you create amazing mathematical animations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="flex items-center gap-3 px-6 py-3 bg-emerald-700/60 hover:bg-emerald-600/70 rounded-lg transition-colors duration-300 backdrop-blur-sm border border-emerald-600/50">
                <MessageCircle className="w-5 h-5 text-slate-100" />
                <span className="text-slate-100 font-medium">Live Chat</span>
              </button>
              
              <button className="flex items-center gap-3 px-6 py-3 bg-slate-800/60 hover:bg-slate-700/70 rounded-lg transition-colors duration-300 backdrop-blur-sm border border-slate-700/30">
                <Mail className="w-5 h-5 text-slate-200" />
                <span className="text-slate-200 font-medium">Email Support</span>
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-emerald-900/20">
              <p className="text-slate-500 text-sm">
                Average response time: <span className="text-emerald-400">2 hours</span>
              </p>
            </div>
          </div>

          {/* Resources Section */}
          <div className="fade-in-up delay-400 mt-12">
            <h2 className="text-display text-2xl font-light text-slate-200 mb-8 text-center">
              Additional Resources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950/40 backdrop-blur-sm rounded-xl border border-emerald-900/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Book className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-slate-200 font-medium">Learning Resources</h3>
                </div>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>• Video tutorials and walkthroughs</li>
                  <li>• Best practices for prompt writing</li>
                  <li>• Mathematical animation examples</li>
                  <li>• Manim CE documentation</li>
                </ul>
              </div>

              <div className="bg-slate-950/40 backdrop-blur-sm rounded-xl border border-emerald-900/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-slate-200 font-medium">Advanced Features</h3>
                </div>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>• Custom animation parameters</li>
                  <li>• Batch video generation</li>
                  <li>• API integration guide</li>
                  <li>• Export and sharing options</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpPage;
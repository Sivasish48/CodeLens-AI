import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal, Code2 } from "lucide-react";
import BackgroundAnimation from "@/components/ui/BackgroundAnimation"; // Import the separated file

export default function Page() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background */}
      <BackgroundAnimation />

      {/* Navigation */}
      <header className="relative z-20">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold">CodeLens AI</span>
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-20 container mx-auto px-6 pt-4 md:pt-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Elevate Your Code
              <br />
              with AI-Powered
              <br />
              Reviews.
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Get instant, intelligent code reviews. CodeLens AI analyzes your code for bugs, security issues, and
              performance improvements in seconds.
            </p>
          </div>

          {/* Search Input */}
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <Input
                type="text"
                placeholder="Paste your code or describe what you want to analyze..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                contentEditable="true"
                className="relative w-full bg-black/50 backdrop-blur-xl border-white/10 text-white placeholder:text-white/50 h-14 pl-6 pr-12 rounded-2xl"
              />
              <Button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white rounded-xl p-2 h-10 w-10 shadow-lg shadow-cyan-500/20"
                size="icon"
              >
                <SendHorizontal className="h-5 w-5" />
              </Button>
            </div>

            {/* Example chips */}
            <div className="flex flex-wrap gap-2 mt-6 justify-center">
              <Button
                variant="ghost"
                className="bg-white/5 hover:bg-white/10 text-white/70 rounded-full text-sm border border-white/10 hover:text-white hover:border-cyan-500/50 transition-colors"
              >
                <span className="w-5 h-5 mr-2">🔍</span>
                Review my React component for best practices
              </Button>
              <Button
                variant="ghost"
                className="bg-white/5 hover:bg-white/10 text-white/70 rounded-full text-sm border border-white/10 hover:text-white hover:border-cyan-500/50 transition-colors"
              >
                <span className="w-5 h-5 mr-2">🛡️</span>
                Check API endpoint for security issues
              </Button>
              <Button
                variant="ghost"
                className="bg-white/5 hover:bg-white/10 text-white/70 rounded-full text-sm border border-white/10 hover:text-white hover:border-cyan-500/50 transition-colors"
              >
                <span className="w-5 h-5 mr-2">⚡</span>
                Optimize database query performance
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

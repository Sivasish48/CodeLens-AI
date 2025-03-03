import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SendHorizontal, Code2, Loader2, Copy, Check } from "lucide-react";
import BackgroundAnimation from "@/components/ui/BackgroundAnimation";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import axios from "axios";

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [reviewResult, setReviewResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    adjustTextareaHeight(textareaRef.current);
  };

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement | null) => {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`;
    }
  };

  useEffect(() => {
    if (reviewResult && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [reviewResult]);

  const handleReviewCode = async () => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    setReviewResult(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/ai/review-code",
        { code: inputValue },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Raw API response:", response);
      setReviewResult(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data, null, 2)
      ); // Assuming the response is the direct review string
      setInputValue("");
    } catch (error) {
      console.error("API Error:", error);
      setReviewResult("⚠️ Error fetching review. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyResult = () => {
    if (reviewResult) {
      navigator.clipboard.writeText(reviewResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <BackgroundAnimation />

      <header className="relative z-20 sticky top-0 backdrop-blur-lg bg-black/30">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 transition-transform duration-300 group-hover:scale-110">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold transition-colors duration-300 group-hover:text-cyan-400">
              CodeLens AI
            </span>
          </a>
        </nav>
      </header>

      <main className="relative z-20 container mx-auto px-6 pt-4 md:pt-12 pb-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 animate-gradient">
              Elevate Your Code
              <br />
              with AI-Powered
              <br />
              Reviews.
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in-delayed">
              Get instant, intelligent code reviews. CodeLens AI analyzes your
              code for bugs, security issues, and performance improvements in
              seconds.
            </p>
          </div>

          <div className="max-w-2xl mx-auto animate-fade-in-delayed-more">
            <div className="relative group w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>

              <textarea
                ref={textareaRef}
                placeholder="Paste your code & analyze..."
                value={inputValue}
                onChange={handleInputChange}
                rows={1}
                className="relative w-full bg-black/50 backdrop-blur-xl border border-white/10 text-white placeholder:text-white/50 px-6 pr-14 py-3 rounded-2xl resize-none transition-all duration-300 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 overflow-y-auto"
                style={{
                  minHeight: "3.5rem",
                  maxHeight: "300px",
                }}
              />

              <Button
                onClick={handleReviewCode}
                disabled={isLoading || !inputValue.trim()}
                className="absolute bottom-2 right-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white rounded-xl p-2 h-10 w-10 shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105"
                size="icon"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <SendHorizontal className="h-5 w-5" />
                )}
              </Button>
            </div>

            {reviewResult && (
              <div
                ref={resultRef}
                className="mt-6 relative group animate-fade-up w-full"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />

                <div className="relative w-full bg-black/80 backdrop-blur-xl border border-cyan-500/30 text-white rounded-2xl p-6 overflow-visible">
                  <Button
                    onClick={handleCopyResult}
                    className="absolute top-3 right-3 bg-gray-800 hover:bg-gray-700 text-cyan-400 rounded-lg p-2 h-9 w-9 shadow-lg transition-all duration-300 hover:scale-105"
                    size="icon"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>

                  {/* Temporary simple container - replace with SyntaxHighlighter later */}
                  <div className="prose prose-invert max-w-full overflow-x-auto pt-4">
                    <pre className="whitespace-pre-wrap break-words font-mono text-sm">
                      {reviewResult}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-6 justify-center animate-fade-in-delayed-more">
              <Button
                variant="ghost"
                className="bg-white/5 hover:bg-white/10 text-white/70 rounded-full text-sm border border-white/10 hover:text-white hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <span className="w-5 h-5 mr-2">🔍</span>
                Review my React component for best practices
              </Button>
              <Button
                variant="ghost"
                className="bg-white/5 hover:bg-white/10 text-white/70 rounded-full text-sm border border-white/10 hover:text-white hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <span className="w-5 h-5 mr-2">🛡️</span>
                Check API endpoint for security issues
              </Button>
              <Button
                variant="ghost"
                className="bg-white/5 hover:bg-white/10 text-white/70 rounded-full text-sm border border-white/10 hover:text-white hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10"
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

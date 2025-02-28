import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { SendHorizontal, Code2, Loader2, Copy } from "lucide-react";
import BackgroundAnimation from "@/components/ui/BackgroundAnimation";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [reviewResult, setReviewResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const resultTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Function to adjust textarea height dynamically
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    adjustTextareaHeight(textareaRef.current);
  };

  // Function to adjust height dynamically
  const adjustTextareaHeight = (textarea: HTMLTextAreaElement | null) => {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Simulate backend API call for code review
  const handleReviewCode = async () => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    setReviewResult(null);

    // Simulate a backend API call with a delay
    setTimeout(() => {
      const fakeReviewResult = `Review Result:\n\n1. Code is well-structured.\n2. No securit\ny vulnerabilities \n found.\n3. Perform\nance could be improved by optimizing loops.\n4. Consider addi\nng error handling for edge casesfhfeheherherherherherherherherhrrhreherherherherheherherhrehrehreherherbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb/nbbbbbbbbbbb/nbbbbbbbbbbbbbbbbbbbbbbbb/nbbbbbb.\n\nCode Snippet:\n\n${inputValue}`;
      setReviewResult(fakeReviewResult);
      setIsLoading(false);

      // Adjust the height of the result textarea after content is loaded
      setTimeout(() => adjustTextareaHeight(resultTextareaRef.current), 0);
    }, 2000); // Simulate 2 seconds delay
  };

  // Function to copy review result to clipboard
  const handleCopyResult = () => {
    if (reviewResult) {
      navigator.clipboard.writeText(reviewResult);
    }
  };

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
            <div className="relative group w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

              {/* Multi-line expanding input field */}
              <textarea
                ref={textareaRef}
                placeholder="Paste your code & analyze..."
                value={inputValue}
                onChange={handleInputChange}
                rows={1}
                className="relative w-full bg-black/50 backdrop-blur-xl border-white/10 text-white placeholder:text-white/50 px-6 pr-14 py-3 rounded-2xl resize-none overflow-hidden focus:outline-none"
                style={{ minHeight: "3.5rem" }}
              />

              {/* Send Button */}
              <Button
                onClick={handleReviewCode}
                disabled={isLoading || !inputValue.trim()}
                className="absolute bottom-2 right-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white rounded-xl p-2 h-10 w-10 shadow-lg shadow-cyan-500/20"
                size="icon"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <SendHorizontal className="h-5 w-5" />
                )}
              </Button>
            </div>

            {/* Review Result Section */}
            {reviewResult && (
              <div className="mt-6 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative w-full bg-black/50 backdrop-blur-xl border-white/10 text-white rounded-2xl p-6">
                  {/* Copy Button */}
                  <Button
                    onClick={handleCopyResult}
                    className="absolute top-2 right-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white rounded-xl p-2 h-10 w-10 shadow-lg shadow-cyan-500/20"
                    size="icon"
                  >
                    <Copy className="h-5 w-5" />
                  </Button>

                  {/* Syntax Highlighting for Code */}
                  <SyntaxHighlighter
                    language="javascript"
                    style={atomOneDark}
                    customStyle={{
                      background: "transparent",
                      padding: 0,
                      margin: 0,
                      overflowX: "auto",
                    }}
                  >
                    {reviewResult}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}

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
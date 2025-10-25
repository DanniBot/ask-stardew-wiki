import { useState } from "react";
import { Search, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface SearchResult {
  title: string;
  snippet: string;
  url: string;
}

export const WikiSearch = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const { toast } = useToast();

  const handleFeedback = async (type: 'positive' | 'negative') => {
    if (!requestId) {
      toast({
        title: "Error",
        description: "No search request found to provide feedback for.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingFeedback(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_FEEDBACK_API_BASE_URL}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request_id: requestId,
          vote_type: type === 'positive' ? 'upvote' : 'downvote'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setFeedback(type);
      } else {
        throw new Error(data.message || 'Failed to submit feedback');
      }
    } catch (error) {
      toast({
        title: "Feedback Failed",
        description: "Couldn't submit your feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const handleExampleClick = (exampleQuery: string) => {
    setQuery(exampleQuery);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast({
        title: "Oops!",
        description: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setResults([]);
    setHasSearched(true);
    setFeedback(null);
    setRequestId(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_QUERY_API_BASE_URL}/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query_text: query,
          collection_name: "stardew_wiki_en_cf-baai-bge-base-en-v1-5",
          n_results: 8
        })
      });
      
      const data = await response.json();
      
      // Store the request_id for feedback
      if (data.request_id) {
        setRequestId(data.request_id);
      }
      
      if (data.results && data.results.snippets && data.results.metadatas) {
        const snippets = data.results.snippets[0] || [];
        const metadatas = data.results.metadatas[0] || [];
        
        const searchResults: SearchResult[] = snippets.map((snippet: string, index: number) => {
          const metadata = metadatas[index];
          if (!metadata) return null;
          
          // Format section title for URL (replace 's with %27s_)
          // Don't append "Introduction" to the URL
          const sectionTitle = metadata.section_title.replace(/'s/g, '%27s_');
          const url = metadata.section_title === 'Introduction' 
            ? metadata.page_url 
            : `${metadata.page_url}#${sectionTitle}`;
          
          return {
            title: `${metadata.page_title} | ${metadata.section_title}`,
            snippet: snippet,
            url: url
          };
        }).filter(Boolean);
        
        setResults(searchResults);
        
        toast({
          title: "Search Complete!",
          description: `Found ${searchResults.length} results for "${query}"`,
        });
      } else {
        setResults([]);
        toast({
          title: "No results",
          description: "Try a different search term!",
        });
      }
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Couldn't fetch results. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Ask the wiki..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 text-base border-4 border-primary bg-card shadow-lg"
          />
          <Button
            type="submit"
            disabled={isSearching}
            size="icon"
            className="h-12 w-12 border-4 border-primary/50 shadow-lg hover:scale-105 transition-transform"
          >
            {isSearching ? "..." : <Search className="h-5 w-5" />}
          </Button>
        </div>
      </form>

      {/* Search Examples */}
      {!hasSearched && (
        <div className="space-y-3 animate-in fade-in-50 duration-500">
          <p className="text-xs text-muted-foreground text-center font-pixel">Try these examples:</p>
          <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
            {[
              "How to maximize friendship with villagers?",
              "What's the best crop for spring?",
              "What's the best way to make money?",
              "How to complete the Community Center bundles?",
              "How do I catch legendary fish?",
              "Where can I find Lewis's purple shorts?"
            ].map((example, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleExampleClick(example)}
                className="text-[9px] sm:text-[10px] border-2 border-primary/30 bg-card/50 hover:bg-primary/10 hover:border-primary/50 transition-all font-pixel px-2 py-1 sm:px-3 sm:py-2 whitespace-nowrap"
              >
                {example}
              </Button>
            ))}
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-4 animate-in fade-in-50 duration-500">
          <h2 className="font-pixel text-sm text-primary">Search Results:</h2>
          <div className="flex flex-col gap-4">
            {results.map((result, index) => (
              <Card
                key={index}
                className="p-6 border-4 border-wood-light bg-card/90 backdrop-blur-sm hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer"
                onClick={() => window.open(result.url, '_blank')}
              >
                <h3 className="font-pixel text-xs text-primary mb-3 leading-relaxed flex items-center">
                  <span>{result.title}</span>
                  <a 
                    href={result.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ml-2 text-primary hover:text-primary/80"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M15 3h6v6"></path>
                      <path d="M10 14 21 3"></path>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    </svg>
                  </a>
                </h3>
                <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
                  {result.snippet}
                </p>
                <p className="text-xs text-muted-foreground">
                  {result.url}
                </p>
              </Card>
            ))}
          </div>
          
          {/* Feedback Section */}
          <div className="flex justify-center gap-4 mt-6">
            <p className="text-sm text-muted-foreground flex items-center">Was this helpful?</p>
            <div className="flex gap-2">
              <Button
                variant={feedback === 'positive' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFeedback('positive')}
                disabled={isSubmittingFeedback || feedback !== null}
                className={`h-8 w-8 p-0 ${feedback === 'positive' ? 'bg-green-500 hover:bg-green-600' : ''}`}
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button
                variant={feedback === 'negative' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFeedback('negative')}
                disabled={isSubmittingFeedback || feedback !== null}
                className={`h-8 w-8 p-0 ${feedback === 'negative' ? 'bg-red-500 hover:bg-red-600' : ''}`}
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {hasSearched && !isSearching && results.length === 0 && (
        <Card className="p-8 text-center border-4 border-wood-light bg-card/90">
          <p className="text-muted-foreground">
            No results found. Try a different search term!
          </p>
        </Card>
      )}
    </div>
  );
};

import { useState } from "react";
import { Search } from "lucide-react";
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
  const { toast } = useToast();

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

    try {
      // Using web search to query Stardew Valley wiki
      const searchQuery = `site:stardewvalleywiki.com ${query}`;
      
      // Simulated search results - in production, this would call a backend API
      // that uses the web search functionality
      const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(searchQuery)}&format=json`);
      
      // For demo purposes, creating mock results
      const mockResults: SearchResult[] = [
        {
          title: `${query} - Stardew Valley Wiki`,
          snippet: `Information about ${query} in Stardew Valley. This is a demo result showing how your search would appear.`,
          url: `https://stardewvalleywiki.com/${query.toLowerCase().replace(/\s+/g, '_')}`,
        },
      ];

      setResults(mockResults);
      
      toast({
        title: "Search Complete!",
        description: `Found results for "${query}"`,
      });
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
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search the wiki... (e.g., 'Blueberry', 'Fishing', 'Community Center')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pr-10 h-12 text-base border-4 border-primary bg-card shadow-lg"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <Button
            type="submit"
            disabled={isSearching}
            className="h-12 px-6 font-pixel text-xs border-4 border-primary/50 shadow-lg hover:scale-105 transition-transform"
          >
            {isSearching ? "..." : "Search"}
          </Button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="space-y-4 animate-in fade-in-50 duration-500">
          <h2 className="font-pixel text-sm text-primary">Search Results:</h2>
          {results.map((result, index) => (
            <Card
              key={index}
              className="p-6 border-4 border-wood-light bg-card/90 backdrop-blur-sm hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer"
              onClick={() => window.open(result.url, '_blank')}
            >
              <h3 className="font-pixel text-xs text-primary mb-3 leading-relaxed">
                {result.title}
              </h3>
              <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
                {result.snippet}
              </p>
              <p className="text-xs text-secondary font-semibold">
                Click to view on wiki →
              </p>
            </Card>
          ))}
        </div>
      )}

      {!isSearching && results.length === 0 && query && (
        <Card className="p-8 text-center border-4 border-wood-light bg-card/90">
          <p className="text-muted-foreground">
            No results found. Try a different search term!
          </p>
        </Card>
      )}
    </div>
  );
};

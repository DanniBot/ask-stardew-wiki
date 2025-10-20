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
      const response = await fetch(
        `https://stardewvalleywiki.com/mediawiki/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=10`
      );
      
      const data = await response.json();
      
      if (data.query && data.query.search) {
        const searchResults: SearchResult[] = data.query.search.map((item: any) => ({
          title: item.title,
          snippet: item.snippet.replace(/<[^>]*>/g, ''), // Remove HTML tags
          url: `https://stardewvalleywiki.com/${item.title.replace(/ /g, '_')}`
        }));
        
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
            placeholder="Search the wiki... (e.g., 'Blueberry', 'Fishing', 'Community Center')"
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

import { WikiSearch } from "@/components/WikiSearch";
import heroFarm from "@/assets/hero-farm.png";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden border-b-8 border-wood-dark">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url(${heroFarm})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative bg-gradient-to-b from-primary/20 to-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="font-pixel text-2xl md:text-4xl lg:text-5xl text-accent mb-6 leading-relaxed drop-shadow-lg">
              Ask
              <br />
              <span className="text-primary">Stardew Wiki</span>
            </h1>
            <p className="text-base md:text-lg text-foreground/90 max-w-2xl mx-auto font-body leading-relaxed">
      Finally, stop searching, start asking the wiki your questions! This tool understands your meaning -- going beyond keywords to find the most relevant wiki sections.
              <br /> 
              📌 Only gameplay related questions are supported. Wiki administration and community pages are not included in this search.
              <br /> 
              [ <Link to="/about">Learn more</Link> ] 
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <WikiSearch />
      </main>
    </div>
  );
};

export default Index;

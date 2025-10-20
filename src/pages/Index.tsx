import { WikiSearch } from "@/components/WikiSearch";
import heroFarm from "@/assets/hero-farm.png";

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
            <h1 className="font-pixel text-2xl md:text-4xl lg:text-5xl text-primary mb-6 leading-relaxed drop-shadow-lg">
              Stardew Valley
              <br />
              <span className="text-accent">Wiki Search</span>
            </h1>
            <p className="text-base md:text-lg text-foreground/90 max-w-2xl mx-auto font-body leading-relaxed">
              Your friendly guide to crops, characters, fishing, and everything else in the valley!
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <WikiSearch />
        
        {/* Helper Tips */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: "🌱", title: "Crops", desc: "Find growing tips" },
              { icon: "🎣", title: "Fishing", desc: "Catch info & locations" },
              { icon: "💝", title: "Characters", desc: "Gift preferences" },
            ].map((tip, i) => (
              <div
                key={i}
                className="text-center p-6 bg-card border-4 border-wood-light rounded-lg hover:shadow-lg transition-all hover:scale-105"
              >
                <div className="text-4xl mb-3">{tip.icon}</div>
                <h3 className="font-pixel text-xs text-primary mb-2">
                  {tip.title}
                </h3>
                <p className="text-sm text-muted-foreground">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t-4 border-wood-dark bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Not affiliated with ConcernedApe or Stardew Valley Wiki
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Search powered by community knowledge
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

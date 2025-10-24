import { Link } from "react-router-dom";
import heroFarm from "@/assets/hero-farm.png";

const About = () => {
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
              Learn how this advanced search engine works and why it's different from traditional wiki search and AI chatbots.
              <br />
              [ <Link to="/">Ask Stardew Wiki now</Link> ]
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h2 className="font-pixel text-2xl text-primary mb-6">🚜 How This Search Works</h2>
          
          <p className="mb-6">
            Welcome! Ask Stardew Wiki is designed to help you find precise information on the Stardew Valley Wiki faster.
          </p>

          <ul className="mb-6 space-y-2">
            <li><strong>What it DOES:</strong> It's a smarter search engine than the wiki's built-in search which relies on simple keyword matching. This tool understands the meaning and context of your query, finds the most conceptually relevant wiki sections, and then shows you the source, verbatim.</li>
            <li><strong>What it DOES NOT do:</strong> It is not a generative AI chatbot. It won't invent answers, write new sentences, give personal opinions, or summarize topics in its own words. Also, wiki administration and community pages are not included in this search.</li>
          </ul>

          <p className="mb-8">
            Think of it like a super-powered Ctrl+F that searches the most of wiki for you! You get the reliable information from the source, pointing to the exact sections of wiki pages without scrolling.
          </p>

          <h2 className="font-pixel text-2xl text-primary mb-6">🤔 Is This an AI?</h2>
          
          <p className="mb-6">
            <strong>No. This is a Search Engine based on Retrieval-Augmented Generation (RAG), without generative LLM integration.</strong> To be clear:
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-2 text-left">Wiki's search</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">This Tool ✅</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">An AI Chatbot</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Simple keyword matching in page titles and content</td>
                  <td className="border border-gray-300 px-4 py-2">Finds deeply relevant wiki sections by semantic comparison against the most wiki content</td>
                  <td className="border border-gray-300 px-4 py-2">Writes new, original text</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Provides links to the pages</td>
                  <td className="border border-gray-300 px-4 py-2">Provide sources & links to wiki sections</td>
                  <td className="border border-gray-300 px-4 py-2">May answer with incorrect or outdated or "hallucinate" facts</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Best for finding a specific page by name (e.g., "Starfruit")</td>
                  <td className="border border-gray-300 px-4 py-2">Best for asking questions to the wiki and finding the source (e.g., "How do I get iridium ore?", "What does Sebastian like?")</td>
                  <td className="border border-gray-300 px-4 py-2">Best for summary, explanations and calculations (e.g., "What's the profit margin for blueberries?")</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-lg font-medium mb-8">
          In short, Ask Stardew Wiki finds the needle in the haystack smartly, then hand you the needle -- not an AI-generated drawing of one.
          </p>

          <h2 className="font-pixel text-2xl text-primary mb-6">📋 Version Log & Roadmap</h2>
          
          <h3 className="font-pixel text-xl text-accent mb-4">Current Version: v1.0.0</h3>
          <ul className="mb-6 space-y-2">
            <li>✅ Semantic search engine integration</li>
            <li>✅ Direct links to wiki sections</li>
            <li>✅ Responsive design with Stardew Valley theming</li>
            <li>✅ About page with documentation</li>
            <li>✅ query-retrieval feedback gathering system</li>

          </ul>

          <h3 className="font-pixel text-xl text-accent mb-4">Planned Updates</h3>
          <ul className="mb-6 space-y-2">
            <li>🔄 <strong>v1.1.0:</strong> Implement cron job to regularly fetch the wiki updates and keep the vector database updated</li>
            <li>🔄 <strong>v2.0.0:</strong> Multi-language support for international wiki versions</li>
          </ul>

        </div>
      </main>
    </div>
  );
};

export default About;

const Footer = () => {
  return (
    <footer className="mt-16 py-8 border-t-4 border-wood-dark bg-primary/5">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">
          <a href="https://www.stardewvalley.net/" target="_blank" rel="noopener noreferrer">Stardew Valley © ConcernedApe</a> | <a href="https://stardewvalleywiki.com/" target="_blank" rel="noopener noreferrer">Stardew Valley Wiki</a> | <a href="dannibot.github.io/ask-stardew-wiki/" target="_blank" rel="noopener noreferrer">Ask Stardew Wiki v1.0.0 by Danni</a>
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Search powered by community knowledge ❤︎ Ask Stardew Wiki is not affiliated with ConcernedApe or the Official Stardew Valley Wiki.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

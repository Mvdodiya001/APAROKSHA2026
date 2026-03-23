import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-md relative z-10 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold tracking-tighter text-glow-primary uppercase">
              APAROKSHA
            </span>
            <p className="text-sm text-muted-foreground mt-2 font-mono">
              // The Ultimate Tech Fest
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground font-mono">
              <span>DESIGNED WITH</span>
              <Heart className="w-4 h-4 text-primary animate-pulse" />
              <span>FOR APAROKSHA</span>
            </div>
            <p className="text-xs text-muted-foreground/50 mt-2 font-mono">
              &copy; {new Date().getFullYear()} APAROKSHA. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

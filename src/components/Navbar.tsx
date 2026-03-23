import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Timeline", href: "#timeline" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-border/50 py-4 shadow-glow-primary/20"
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <a
            href="#"
            className="flex flex-col select-none group focus:outline-none"
          >
            <span className="text-2xl font-bold tracking-tighter text-glow-primary">
              APAROKSHA
            </span>
            <span className="text-[10px] tracking-[0.2em] text-primary/80 uppercase font-mono group-hover:text-primary transition-colors">
              //  Logo Placeholder
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground hover:text-glow-primary transition-all uppercase tracking-wider relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
            <a
              href="/brochure-placeholder.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-button px-6 py-2 border border-primary/50 text-foreground hover:border-primary transition-all group text-sm shrink-0"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>EVENT FLYER</span>
                <span className="font-mono text-primary group-hover:translate-x-1 transition-transform">
                  _&gt;
                </span>
              </span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground p-2 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={cn(
            "md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-lg border-b border-border/50 transition-all duration-300 overflow-hidden",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="p-6 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-foreground uppercase tracking-widest py-2 border-b border-border/30 hover:text-primary hover:pl-2 transition-all"
              >
                {link.name}
              </a>
            ))}
            <a
              href="/brochure-placeholder.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-4 cyber-button px-6 py-3 border border-primary/50 text-center uppercase text-sm tracking-widest"
            >
              Event Flyer
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

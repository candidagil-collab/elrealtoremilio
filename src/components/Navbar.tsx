import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ContactDialog from "@/components/landing/ContactDialog";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-6 transition-all duration-300">
      <div
        className={`container mx-auto flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300 ${
          isScrolled
            ? "bg-background border border-border shadow-md"
            : "bg-background/80 backdrop-blur-md border border-border/50 shadow-sm"
        }`}
      >
        {/* Logo */}
        <Link to="/">
          <img
            alt="Emilio Sanchez Real Estate"
            className="h-10 md:h-14 w-auto"
            src="/lovable-uploads/177b0c2e-8c2e-44b7-ad49-3f99ccc6043d.png"
          />
        </Link>

        {/* Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-body text-sm text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/properties" className="font-body text-sm text-foreground hover:text-primary transition-colors">
            Properties
          </Link>
          <a href="#proceso" className="font-body text-sm text-foreground hover:text-primary transition-colors">
            About
          </a>
          <Link to="/calculator" className="font-body text-sm text-foreground hover:text-primary transition-colors">
            Calculator
          </Link>
        </nav>

        {/* CTA Button */}
        <ContactDialog>
          <Button className="font-body text-sm px-5 py-2 h-auto rounded-full bg-foreground text-background hover:bg-foreground/90">
            Talk to an Agent
          </Button>
        </ContactDialog>
      </div>
    </header>
  );
};

export default Navbar;

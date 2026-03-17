import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ContactDialog from "@/components/landing/ContactDialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: t("navbar.home") },
    { to: "/properties", label: t("navbar.properties") },
    { to: "/neighborhoods", label: t("navbar.neighborhoods") },
    { to: "/calculator", label: t("navbar.calculator") },
    { to: "/about", label: t("navbar.about") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-6 transition-all duration-300">
      <div
        className={`container mx-auto flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300 ${
          isScrolled
            ? "bg-background border border-border shadow-md"
            : "bg-background/80 backdrop-blur-md border border-border/50 shadow-sm"
        }`}
      >
        <Link to="/">
          <img
            alt="Emilio Sanchez Real Estate"
            className="h-10 md:h-14 w-auto"
            src="/lovable-uploads/177b0c2e-8c2e-44b7-ad49-3f99ccc6043d.png"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="font-body text-sm text-foreground hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLanguage(language === "en" ? "es" : "en")}
            className="font-body text-xs font-semibold tracking-wide px-3 py-1.5 rounded-full border border-border hover:bg-secondary transition-colors text-foreground"
          >
            {language === "en" ? "ES" : "EN"}
          </button>

          <ContactDialog>
            <Button className="font-body text-sm px-5 py-2 h-auto rounded-full bg-foreground text-background hover:bg-foreground/90">
              {t("navbar.cta")}
            </Button>
          </ContactDialog>

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors text-foreground">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="font-body text-lg text-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

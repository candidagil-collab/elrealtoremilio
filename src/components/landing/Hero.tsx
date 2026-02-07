import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import logoEmilio from "@/assets/logo-emilio-sanchez.png";
import propertyPinePoint from "@/assets/property-pine-point.png";
import propertyGreinertDr from "@/assets/property-greinert-dr.png";
const properties = [{
  id: 1,
  image: propertyPinePoint,
  title: "116 Pine Point Cv",
  description: "Beautiful new construction home sitting on a full 1-acre lot in a peaceful community. This property offers space, privacy, and the comfort of living in an established neighborhood.",
  bedrooms: 4,
  bathrooms: "2"
}, {
  id: 2,
  image: propertyGreinertDr,
  title: "104 Greinert Dr",
  description: "104 Greinert Dr",
  bedrooms: 3,
  bathrooms: "2.5"
}, {
  id: 3,
  image: null,
  title: "Propiedad Destacada",
  description: "",
  bedrooms: 0,
  bathrooms: "0"
}];
const Hero = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return <section className="relative min-h-screen bg-background">
      {/* Header with Logo and Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-6 transition-all duration-300">
        <div className={`container mx-auto flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300 ${isScrolled ? "bg-background border border-border shadow-md" : "bg-background/80 backdrop-blur-md border border-border/50 shadow-sm"}`}>
          {/* Logo */}
          <img alt="Emilio Sanchez Real Estate" className="h-10 md:h-14 w-auto" src="/lovable-uploads/177b0c2e-8c2e-44b7-ad49-3f99ccc6043d.png" />

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#beneficios" className="font-body text-sm text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#testimonios" className="font-body text-sm text-foreground hover:text-primary transition-colors">
              Properties
            </a>
            <a href="#proceso" className="font-body text-sm text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#faq" className="font-body text-sm text-foreground hover:text-primary transition-colors">
              Blog
            </a>
          </nav>

          {/* CTA Button */}
          <Button className="font-body text-sm px-5 py-2 h-auto rounded-full bg-foreground text-background hover:bg-foreground/90">
            Talk to an Agent
          </Button>
        </div>
      </header>

      {/* Hero Content */}
      <div className="container pt-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 py-16 lg:py-24 min-h-[70vh] items-center">
          {/* Left Column - Large Headline */}
          <div className="lg:col-span-7 animate-fade-in">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1] tracking-tight text-black">
              Licensed Real Estate Agent Based in the Austin Area
            </h1>
          </div>

          {/* Right Column - Description */}
          <div className="lg:col-span-5 flex flex-col justify-center animate-fade-in" style={{
          animationDelay: "0.15s"
        }}>
            <p className="text-base md:text-lg font-body leading-relaxed max-w-md text-black">
              I guide you step by step through every stage of the buying process, so you can make informed decisions and avoid mistakes that could cost you thousands of dollars.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="w-full overflow-hidden py-8">
        <div className="flex gap-4 animate-fade-in" style={{
        animationDelay: "0.3s"
      }}>
          {/* Property Cards */}
          {properties.map(property => <div key={property.id} className="relative flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[32vw] aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer">
              {/* Property Image or Placeholder */}
              {property.image ? <img src={property.image} alt={property.title} className="absolute inset-0 w-full h-full object-cover" /> : <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50" />}
              
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Featured badge */}
              <div className="absolute top-4 left-4">
                <span className="font-body text-xs tracking-widest text-white/90 uppercase">
                  Featured Listing
                </span>
              </div>

              {/* Property Info - Bottom */}
              {property.image && property.description ? <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-display text-2xl md:text-3xl font-medium mb-2">
                    {property.title}
                  </h3>
                  <p className="font-body text-sm text-white/80 mb-3 line-clamp-2">
                    {property.description}
                  </p>
                  <p className="font-body text-sm text-white/90">
                    {property.bedrooms} Bedrooms / {property.bathrooms} Bathrooms
                  </p>
                </div> : <div className="absolute top-4 left-4">
                  <span className="font-body text-xs tracking-widest text-foreground/70 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    PROPIEDAD DESTACADA
                  </span>
                </div>}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
            </div>)}
        </div>
      </div>
    </section>;
};
export default Hero;
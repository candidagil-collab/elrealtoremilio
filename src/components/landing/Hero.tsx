import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import logoEmilio from "@/assets/logo-emilio-sanchez.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-background">
      {/* Header with Logo and Navigation */}
      <header className="container py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <img
            alt="Emilio Sanchez Real Estate"
            className="h-10 md:h-12 w-auto"
            src={logoEmilio}
          />

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#beneficios" className="font-body text-sm text-foreground hover:text-primary transition-colors">
              BENEFICIOS
            </a>
            <a href="#testimonios" className="font-body text-sm text-foreground hover:text-primary transition-colors">
              TESTIMONIOS
            </a>
            <a href="#proceso" className="font-body text-sm text-foreground hover:text-primary transition-colors">
              PROCESO
            </a>
          </nav>

          {/* CTA Button */}
          <Button className="font-body text-sm px-6 py-2.5 h-auto rounded-full bg-primary hover:bg-primary/90 group">
            AGENDA LLAMADA
            <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </div>
      </header>

      {/* Hero Content */}
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 py-16 lg:py-24 min-h-[70vh] items-center">
          {/* Left Column - Large Headline */}
          <div className="lg:col-span-7 animate-fade-in">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1] tracking-tight text-foreground">
              Agente de Real Estate en Austin Texas
            </h1>
          </div>

          {/* Right Column - Description */}
          <div className="lg:col-span-5 flex flex-col justify-center animate-fade-in" style={{ animationDelay: "0.15s" }}>
            <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed max-w-md">
              Te acompaño paso a paso en cada etapa del proceso de compra, para que tomes decisiones informadas y evites errores que pueden costarte miles de dólares.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="w-full overflow-hidden py-8">
        <div className="flex gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          {/* Property Cards */}
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[32vw] aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 group cursor-pointer"
            >
              {/* Placeholder gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
              
              {/* Featured badge */}
              <div className="absolute top-4 left-4">
                <span className="font-body text-xs tracking-widest text-foreground/70 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  PROPIEDAD DESTACADA
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
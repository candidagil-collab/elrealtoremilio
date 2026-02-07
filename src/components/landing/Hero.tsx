import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import logoEmilio from "@/assets/logo-emilio-sanchez.png";
const Hero = () => {
  return <section className="relative min-h-screen bg-background">
      {/* Header with Logo */}
      <header className="container py-6">
        <img alt="Emilio Sanchez Real Estate" className="h-12 md:h-16 w-auto" src="/lovable-uploads/c0d4878b-2270-4a18-a632-4568682854a7.png" />
      </header>

      {/* Hero Content */}
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-12 lg:py-20">
          {/* Left Column - Text */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-foreground">
                Compra tu primera casa con total claridad,{" "}
                <span className="text-primary">sin cometer errores costosos</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-xl">
                Te acompaño paso a paso en cada etapa del proceso de compra, para que
                tomes decisiones informadas y evites sorpresas que pueden costarte
                miles de dólares.
              </p>
            </div>

            {/* CTA Button */}
            <div className="space-y-4">
              <Button size="lg" className="font-body text-base md:text-lg px-8 py-6 h-auto rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90">
                Agenda una llamada y entiende tu proceso de compra
              </Button>

              {/* Trust Microcopy */}
              <div className="flex flex-wrap gap-4 md:gap-6 text-sm text-muted-foreground font-body">
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Sin compromiso
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  100% confidencial
                </span>
                <span className="flex items-center gap-2 text-2xl text-secondary-foreground bg-transparent">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Claridad desde la primera llamada
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Image Placeholder */}
          <div className="relative animate-slide-in-right" style={{
          animationDelay: "0.2s"
        }}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/10 to-primary/5">
              {/* Placeholder for professional image */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <p className="text-primary/70 font-body text-sm">
                    Foto profesional de consultoría
                  </p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/5 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;
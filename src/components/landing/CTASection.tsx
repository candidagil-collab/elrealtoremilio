import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  variant?: "primary" | "secondary";
}

const CTASection = ({ variant = "primary" }: CTASectionProps) => {
  const isPrimary = variant === "primary";

  return (
    <section
      className={`py-16 md:py-20 ${
        isPrimary ? "bg-primary" : "bg-secondary"
      }`}
    >
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2
            className={`font-display text-3xl md:text-4xl font-semibold mb-6 ${
              isPrimary ? "text-primary-foreground" : "text-foreground"
            }`}
          >
            {isPrimary
              ? "Quiero entender cómo comprar bien mi casa"
              : "Comprar tu primera casa no debería sentirse confuso"}
          </h2>
          <p
            className={`font-body text-lg mb-8 ${
              isPrimary
                ? "text-primary-foreground/90"
                : "text-muted-foreground"
            }`}
          >
            {isPrimary
              ? "Agenda tu llamada gratuita y obtén claridad sobre tu proceso de compra desde el primer minuto."
              : "Hazlo con claridad desde el inicio. Agenda tu llamada y da el primer paso con confianza."}
          </p>
          <Button
            size="lg"
            className={`font-body text-base md:text-lg px-8 py-6 h-auto rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group ${
              isPrimary
                ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            Agenda tu llamada gratuita
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface CTASectionProps {
  variant?: "primary" | "secondary";
}

const CTASection = ({ variant = "primary" }: CTASectionProps) => {
  const { ref, isVisible } = useScrollReveal();
  const isPrimary = variant === "primary";

  return (
    <section
      className={`py-16 md:py-20 ${isPrimary ? "bg-primary" : "bg-secondary"}`}
    >
      <div ref={ref} className={`container scroll-reveal ${isVisible ? "visible" : ""}`}>
        <div className="text-center max-w-3xl mx-auto">
          <h2
            className={`font-display text-3xl md:text-4xl font-semibold mb-6 ${
              isPrimary ? "text-primary-foreground" : "text-foreground"
            }`}
          >
            {isPrimary
              ? "I want to understand how to buy my home the right way"
              : "Buying your first home shouldn't feel confusing"}
          </h2>
          <p
            className={`font-body text-lg mb-8 ${
              isPrimary ? "text-primary-foreground/90" : "text-muted-foreground"
            }`}
          >
            {isPrimary
              ? "Schedule your free call and get clarity on your home buying process from minute one."
              : "Do it with clarity from the start. Schedule your call and take the first step with confidence."}
          </p>
          <Button
            size="lg"
            className={`font-body text-base md:text-lg px-8 py-6 h-auto rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group ${
              isPrimary
                ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            Schedule your free call
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

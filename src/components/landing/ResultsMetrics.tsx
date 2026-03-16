import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Users, Star, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ResultsMetrics = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLanguage();

  const metrics = [
    { icon: Users, value: "+50", label: t("results.families") },
    { icon: Star, value: "100%", label: t("results.satisfaction") },
    { icon: TrendingUp, value: "+100", label: t("results.transactions") },
  ];

  return (
    <section className="py-16 md:py-20 bg-primary">
      <div ref={ref} className={`container scroll-reveal ${isVisible ? "visible" : ""}`}>
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary-foreground mb-2">{t("results.title")}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {metrics.map((metric, i) => (
            <div key={i} className="text-center">
              <metric.icon className="w-10 h-10 text-primary-foreground/80 mx-auto mb-4" />
              <p className="font-display text-5xl md:text-6xl font-bold text-primary-foreground mb-2">{metric.value}</p>
              <p className="font-body text-primary-foreground/80 text-sm md:text-base">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsMetrics;

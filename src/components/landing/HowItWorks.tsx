import { Calendar, MessageSquare, CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLanguage();

  const steps = [
    { number: "01", icon: Calendar, title: t("howItWorks.step1Title"), description: t("howItWorks.step1Desc") },
    { number: "02", icon: MessageSquare, title: t("howItWorks.step2Title"), description: t("howItWorks.step2Desc") },
    { number: "03", icon: CheckCircle2, title: t("howItWorks.step3Title"), description: t("howItWorks.step3Desc") },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div ref={ref} className={`container scroll-reveal ${isVisible ? "visible" : ""}`}>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">{t("howItWorks.title")}</h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">{t("howItWorks.subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group scroll-reveal-child" style={{ transitionDelay: `${index * 0.2}s` }}>
              {index < steps.length - 1 && <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-primary/20" />}
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <span className="font-display text-3xl font-bold text-primary">{step.number}</span>
              </div>
              <div className="flex justify-center mb-4"><step.icon className="w-8 h-8 text-primary" /></div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="font-body text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

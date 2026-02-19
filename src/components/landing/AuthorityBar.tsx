import { Star, Users, Shield } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLanguage } from "@/contexts/LanguageContext";

const AuthorityBar = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLanguage();

  const credentials = [
    { icon: Star, title: t("authorityBar.realTestimonialsTitle"), description: t("authorityBar.realTestimonialsDesc") },
    { icon: Users, title: t("authorityBar.provenExperienceTitle"), description: t("authorityBar.provenExperienceDesc") },
    { icon: Shield, title: t("authorityBar.structuredMethodTitle"), description: t("authorityBar.structuredMethodDesc") },
  ];

  return (
    <section className="bg-primary py-8 md:py-10">
      <div ref={ref} className={`container scroll-reveal ${isVisible ? "visible" : ""}`}>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {credentials.map((item, index) => (
            <div key={index} className="flex items-center gap-4 text-primary-foreground scroll-reveal-child" style={{ transitionDelay: `${index * 0.15}s` }}>
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg">{item.title}</h3>
                <p className="font-body text-sm text-primary-foreground/80">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorityBar;

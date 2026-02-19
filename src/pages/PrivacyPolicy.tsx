import Navbar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  const collectItems = t("privacy.collectItems") as string[];
  const useItems = t("privacy.useItems") as string[];
  const rightsItems = t("privacy.rightsItems") as string[];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <span className="inline-block font-body text-sm tracking-widest uppercase text-primary mb-4">{t("privacy.label")}</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">{t("privacy.title")}</h1>
          <p className="font-body text-sm text-muted-foreground mb-12">{t("privacy.lastUpdated")}</p>

          <div className="space-y-10 font-body text-base text-muted-foreground leading-relaxed">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">{t("privacy.introTitle")}</h2>
              <p>{t("privacy.introDesc")}</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">{t("privacy.collectTitle")}</h2>
              <p className="mb-3">{t("privacy.collectDesc")}</p>
              <ul className="list-disc list-inside space-y-1">
                {collectItems.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">{t("privacy.useTitle")}</h2>
              <p className="mb-3">{t("privacy.useDesc")}</p>
              <ul className="list-disc list-inside space-y-1">
                {useItems.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">{t("privacy.shareTitle")}</h2>
              <p>{t("privacy.shareDesc")}</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">{t("privacy.securityTitle")}</h2>
              <p>{t("privacy.securityDesc")}</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">{t("privacy.rightsTitle")}</h2>
              <p className="mb-3">{t("privacy.rightsDesc")}</p>
              <ul className="list-disc list-inside space-y-1">
                {rightsItems.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">{t("privacy.contactTitle")}</h2>
              <p className="mb-4">{t("privacy.contactDesc")}</p>
              <div className="flex flex-col gap-3">
                <a href="tel:+13054902669" className="inline-flex items-center gap-2 text-primary hover:underline">
                  <Phone className="w-4 h-4" /> +1 305 490 2669
                </a>
                <a href="mailto:elrealtoremilio@gmail.com" className="inline-flex items-center gap-2 text-primary hover:underline">
                  <Mail className="w-4 h-4" /> elrealtoremilio@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

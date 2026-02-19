import Navbar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Mail } from "lucide-react";

const TermsConditions = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <span className="inline-block font-body text-sm tracking-widest uppercase text-primary mb-4">{t("terms.label")}</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">{t("terms.title")}</h1>
          <p className="font-body text-sm text-muted-foreground mb-12">{t("terms.lastUpdated")}</p>

          <div className="space-y-10 font-body text-base text-muted-foreground leading-relaxed">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">{t("terms.introTitle")}</h2>
              <p>{t("terms.introDesc")}</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">{t("terms.useTitle")}</h2>
              <p>{t("terms.useDesc")}</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">{t("terms.listingsTitle")}</h2>
              <p>{t("terms.listingsDesc")}</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">{t("terms.liabilityTitle")}</h2>
              <p>{t("terms.liabilityDesc")}</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">{t("terms.ipTitle")}</h2>
              <p>{t("terms.ipDesc")}</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">{t("terms.changesTitle")}</h2>
              <p>{t("terms.changesDesc")}</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">{t("terms.contactTitle")}</h2>
              <p className="mb-4">{t("terms.contactDesc")}</p>
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

export default TermsConditions;

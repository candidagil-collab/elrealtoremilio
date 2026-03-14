import Navbar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Mail } from "lucide-react";

const CookiePolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <span className="inline-block font-body text-sm tracking-widest uppercase text-primary mb-4">
            {t("cookies.pageLabel")}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
            {t("cookies.pageTitle")}
          </h1>
          <p className="font-body text-sm text-muted-foreground mb-12">
            {t("cookies.pageLastUpdated")}
          </p>

          <div className="space-y-10 font-body text-base text-muted-foreground leading-relaxed">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                {t("cookies.whatTitle")}
              </h2>
              <p>{t("cookies.whatDesc")}</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                {t("cookies.typesTitle")}
              </h2>

              <div className="space-y-6 mt-4">
                <div className="border border-border rounded-xl p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {t("cookies.necessaryLongTitle")}
                  </h3>
                  <p>{t("cookies.necessaryLongDesc")}</p>
                </div>

                <div className="border border-border rounded-xl p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {t("cookies.analyticsLongTitle")}
                  </h3>
                  <p>{t("cookies.analyticsLongDesc")}</p>
                </div>

                <div className="border border-border rounded-xl p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {t("cookies.marketingLongTitle")}
                  </h3>
                  <p>{t("cookies.marketingLongDesc")}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                {t("cookies.complianceTitle")}
              </h2>

              <div className="space-y-6 mt-4">
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {t("cookies.usaTitle")}
                  </h3>
                  <p>{t("cookies.usaDesc")}</p>
                </div>

                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {t("cookies.euTitle")}
                  </h3>
                  <p>{t("cookies.euDesc")}</p>
                </div>

                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {t("cookies.latamTitle")}
                  </h3>
                  <p>{t("cookies.latamDesc")}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                {t("cookies.manageTitle")}
              </h2>
              <p>{t("cookies.manageDesc")}</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                {t("cookies.contactTitle")}
              </h2>
              <p className="mb-4">{t("cookies.contactDesc")}</p>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+13054902669"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <Phone className="w-4 h-4" /> +1 305 490 2669
                </a>
                <a
                  href="mailto:elrealtoremilio@gmail.com"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
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

export default CookiePolicy;

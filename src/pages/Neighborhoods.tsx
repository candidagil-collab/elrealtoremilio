import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { neighborhoods } from "@/data/neighborhoods";
import { MapPin, TrendingUp } from "lucide-react";

const Neighborhoods = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <span className="inline-block font-body text-sm tracking-widest uppercase text-primary mb-4">
            {t("neighborhoods.label")}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            {t("neighborhoods.title")}
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t("neighborhoods.subtitle")}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-20 md:pb-28 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {neighborhoods.map((n) => (
              <Link
                key={n.slug}
                to={`/neighborhoods/${n.slug}`}
                className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={n.heroImage}
                    alt={n.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <h2 className="font-display text-xl font-bold text-foreground">
                      {n.name}, TX
                    </h2>
                  </div>
                  <p className="font-body text-sm text-muted-foreground mb-4">
                    {t(`neighborhoods.${n.slug.replace("-", "")}.tagline` as string)}
                  </p>
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="font-body text-xs text-muted-foreground block">{t("neighborhoods.medianPrice")}</span>
                      <span className="font-display text-lg font-bold text-foreground">
                        ${n.medianPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="font-body text-sm font-semibold text-primary">{n.growth}</span>
                      <span className="font-body text-xs text-muted-foreground">{t("neighborhoods.yoy")}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Neighborhoods;

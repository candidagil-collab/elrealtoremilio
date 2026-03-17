import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";
import ContactDialog from "@/components/landing/ContactDialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { neighborhoods } from "@/data/neighborhoods";
import { properties } from "@/data/properties";
import { MapPin, Users, TrendingUp, Clock, GraduationCap, CheckCircle, ArrowLeft, Bed, Bath } from "lucide-react";

const NeighborhoodDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();

  const neighborhood = neighborhoods.find((n) => n.slug === slug);

  if (!neighborhood) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Neighborhood not found</h1>
          <Link to="/neighborhoods" className="font-body text-primary hover:underline">← Back to neighborhoods</Link>
        </div>
      </div>
    );
  }

  const cityListings = properties.filter((p) =>
    p.location?.toLowerCase().includes(neighborhood.city.toLowerCase())
  );

  const key = neighborhood.slug.replace("-", "") as string;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={neighborhood.heroImage}
          alt={neighborhood.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-5xl">
            <Link to="/neighborhoods" className="inline-flex items-center gap-2 font-body text-sm text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {t("neighborhoods.backToAll")}
            </Link>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              {neighborhood.name}, Texas
            </h1>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t(`neighborhoods.${key}.lifestyleTitle`)}
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            {t(`neighborhoods.${key}.lifestyleDesc`)}
          </p>
        </div>
      </section>

      {/* Market Stats */}
      <section className="py-16 md:py-24 px-4 bg-secondary">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
            {t("neighborhoods.marketData")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <span className="font-display text-2xl font-bold text-foreground block">
                ${neighborhood.medianPrice.toLocaleString()}
              </span>
              <span className="font-body text-sm text-muted-foreground">{t("neighborhoods.medianPrice")}</span>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <span className="font-display text-2xl font-bold text-foreground block">{neighborhood.population}</span>
              <span className="font-body text-sm text-muted-foreground">{t("neighborhoods.population")}</span>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <span className="font-display text-2xl font-bold text-foreground block">{neighborhood.daysOnMarket}</span>
              <span className="font-body text-sm text-muted-foreground">{t("neighborhoods.daysOnMarket")}</span>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <span className="font-display text-2xl font-bold text-primary block">{neighborhood.growth}</span>
              <span className="font-body text-sm text-muted-foreground">{t("neighborhoods.yoyGrowth")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            {t("neighborhoods.highlightsTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {neighborhood.highlights.map((hKey, i) => (
              <div key={i} className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-body text-foreground">{t(hKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schools */}
      <section className="py-16 md:py-24 px-4 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
            {t("neighborhoods.schoolsTitle")}
          </h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 p-4 border-b border-border bg-muted/50">
              <span className="font-body text-sm font-semibold text-muted-foreground">{t("neighborhoods.schoolName")}</span>
              <span className="font-body text-sm font-semibold text-muted-foreground">{t("neighborhoods.schoolType")}</span>
              <span className="font-body text-sm font-semibold text-muted-foreground text-right">{t("neighborhoods.schoolRating")}</span>
            </div>
            {neighborhood.schools.map((school, i) => (
              <div key={i} className="grid grid-cols-3 p-4 border-b border-border last:border-0">
                <span className="font-body text-foreground flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  {school.name}
                </span>
                <span className="font-body text-muted-foreground">{school.type}</span>
                <span className="font-display font-bold text-foreground text-right">{school.rating}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Listings */}
      {cityListings.length > 0 && (
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
              {t("neighborhoods.activeListings")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cityListings.map((p) => (
                <Link
                  key={p.id}
                  to={`/property/${p.slug}`}
                  className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">{p.title}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground font-body text-sm mb-3">
                      <MapPin className="w-3.5 h-3.5" />
                      {p.location}
                    </div>
                    <div className="flex items-center gap-4">
                      {p.price && (
                        <span className="font-display text-lg font-bold text-foreground">
                          ${p.price.toLocaleString()}
                        </span>
                      )}
                      {p.rentPrice && (
                        <span className="font-display text-lg font-bold text-foreground">
                          ${p.rentPrice.toLocaleString()}/mo
                        </span>
                      )}
                      {p.bedrooms && (
                        <span className="font-body text-sm text-muted-foreground flex items-center gap-1">
                          <Bed className="w-3.5 h-3.5" /> {p.bedrooms}
                        </span>
                      )}
                      {p.bathrooms && (
                        <span className="font-body text-sm text-muted-foreground flex items-center gap-1">
                          <Bath className="w-3.5 h-3.5" /> {p.bathrooms}
                        </span>
                      )}
                    </div>
                    {p.status && (
                      <span className={`inline-block mt-3 font-body text-xs font-semibold px-3 py-1 rounded-full ${
                        p.status === "For Sale" ? "bg-primary/10 text-primary" :
                        p.status === "For Rent" ? "bg-accent/10 text-accent-foreground" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {p.status}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 md:py-28 px-4 bg-primary">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            {t("neighborhoods.ctaTitle")}
          </h2>
          <p className="font-body text-primary-foreground/80 text-lg mb-8 leading-relaxed">
            {t("neighborhoods.ctaDesc")}
          </p>
          <ContactDialog>
            <Button size="lg" className="rounded-full bg-background text-foreground hover:bg-background/90 font-body text-base px-8 py-6">
              {t("neighborhoods.ctaButton")}
            </Button>
          </ContactDialog>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NeighborhoodDetail;

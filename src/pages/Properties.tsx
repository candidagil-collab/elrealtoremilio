import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { properties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BedDouble, Bath, MapPin, Ruler, ArrowRight } from "lucide-react";
import ContactDialog from "@/components/landing/ContactDialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import SchemaMarkup from "@/components/SchemaMarkup";

const statusColors: Record<string, string> = {
  "For Sale": "bg-green-600 text-white",
  "For Rent": "bg-blue-600 text-white",
  "Sold": "bg-red-600 text-white",
  "Not For Sale": "bg-muted text-muted-foreground",
};

const Properties = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SchemaMarkup type="RealEstateAgent" />
      <section className="pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-4">{t("properties.title")}</h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">{t("properties.subtitle")}</p>
          </div>
          <div className="space-y-20">
            {properties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-primary">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary-foreground mb-4">{t("properties.ctaTitle")}</h2>
          <p className="font-body text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">{t("properties.ctaDesc")}</p>
          <ContactDialog>
            <Button size="lg" className="font-body text-base px-8 py-6 h-auto rounded-lg bg-primary-foreground text-primary hover:bg-primary-foreground/90 group">
              {t("properties.ctaButton")}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </ContactDialog>
        </div>
      </section>
      <Footer />
    </div>
  );
};

interface PropertyCardProps {
  property: typeof properties[number];
  index: number;
}

const PropertyCard = ({ property, index }: PropertyCardProps) => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLanguage();
  const isEven = index % 2 === 0;

  return (
    <Link to={`/property/${property.slug}`} className="block group">
      <div ref={ref} className={`scroll-reveal ${isVisible ? "visible" : ""} grid md:grid-cols-2 gap-8 md:gap-12 items-center`}>
        <div className={`${isEven ? "" : "md:order-2"}`}>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <img src={property.image} alt={property.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            {property.status && (
              <div className="absolute top-4 left-4">
                <Badge className={`font-body text-xs px-3 py-1 ${statusColors[property.status] || ""}`}>
                  {property.status}
                </Badge>
              </div>
            )}
            {property.price && (
              <div className="absolute bottom-4 left-4">
                <span className="font-display text-2xl font-bold text-white drop-shadow-lg">
                  ${property.price.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className={`${isEven ? "" : "md:order-1"}`}>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">{property.title}</h2>
          {property.location && (
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <MapPin className="w-4 h-4" />
              <span className="font-body text-sm">{property.location}</span>
            </div>
          )}
          <p className="font-body text-muted-foreground leading-relaxed mb-6">{property.description}</p>
          <div className="flex flex-wrap gap-6 mb-6">
            {property.bedrooms && (
              <div className="flex items-center gap-2 text-foreground">
                <BedDouble className="w-5 h-5 text-primary" />
                <span className="font-body font-medium">{property.bedrooms} {t("properties.bedrooms")}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-2 text-foreground">
                <Bath className="w-5 h-5 text-primary" />
                <span className="font-body font-medium">{property.bathrooms} {t("properties.bathrooms")}</span>
              </div>
            )}
            {property.size && (
              <div className="flex items-center gap-2 text-foreground">
                <Ruler className="w-5 h-5 text-primary" />
                <span className="font-body font-medium">{property.size}</span>
              </div>
            )}
          </div>
          {property.highlights && property.highlights.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {property.highlights.map((highlight, i) => (
                <Badge key={i} variant="secondary" className="font-body text-xs px-3 py-1">{highlight}</Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Properties;

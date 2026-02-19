import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { properties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BedDouble, Bath, MapPin, Ruler, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ContactDialog from "@/components/landing/ContactDialog";

const Properties = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <ContactDialog>
            <Button className="font-body text-sm px-5 py-2 h-auto rounded-full bg-foreground text-background hover:bg-foreground/90">
              Talk to an Agent
            </Button>
          </ContactDialog>
        </div>
      </header>

      {/* Page Title */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-4">
              Featured Properties
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our curated selection of homes and land in the Austin area
            </p>
          </div>

          {/* Properties List */}
          <div className="space-y-20">
            {properties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-primary">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary-foreground mb-4">
            Interested in any of these properties?
          </h2>
          <p className="font-body text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Let's schedule a call to discuss your options and find the perfect home for you.
          </p>
          <ContactDialog>
            <Button size="lg" className="font-body text-base px-8 py-6 h-auto rounded-lg bg-primary-foreground text-primary hover:bg-primary-foreground/90 group">
              Talk to an Agent
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </ContactDialog>
        </div>
      </section>
    </div>
  );
};

interface PropertyCardProps {
  property: typeof properties[number];
  index: number;
}

const PropertyCard = ({ property, index }: PropertyCardProps) => {
  const { ref, isVisible } = useScrollReveal();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isVisible ? "visible" : ""} grid md:grid-cols-2 gap-8 md:gap-12 items-center`}
    >
      {/* Image */}
      <div className={`${isEven ? "" : "md:order-2"}`}>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group">
          <img
            src={property.image}
            alt={property.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {property.status && (
            <div className="absolute top-4 left-4">
              <Badge
                className={`font-body text-xs px-3 py-1 ${
                  property.status === "Available"
                    ? "bg-green-600 text-white"
                    : property.status === "For Rent"
                    ? "bg-blue-600 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {property.status}
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Details */}
      <div className={`${isEven ? "" : "md:order-1"}`}>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
          {property.title}
        </h2>

        {property.location && (
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <MapPin className="w-4 h-4" />
            <span className="font-body text-sm">{property.location}</span>
          </div>
        )}

        <p className="font-body text-muted-foreground leading-relaxed mb-6">
          {property.description}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-6 mb-6">
          {property.bedrooms && (
            <div className="flex items-center gap-2 text-foreground">
              <BedDouble className="w-5 h-5 text-primary" />
              <span className="font-body font-medium">{property.bedrooms} Bedrooms</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-2 text-foreground">
              <Bath className="w-5 h-5 text-primary" />
              <span className="font-body font-medium">{property.bathrooms} Bathrooms</span>
            </div>
          )}
          {property.size && (
            <div className="flex items-center gap-2 text-foreground">
              <Ruler className="w-5 h-5 text-primary" />
              <span className="font-body font-medium">{property.size}</span>
            </div>
          )}
        </div>

        {/* Highlights */}
        {property.highlights && property.highlights.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {property.highlights.map((highlight, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="font-body text-xs px-3 py-1"
              >
                {highlight}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;

import { useParams, Link } from "react-router-dom";
import { getPropertyBySlug } from "@/data/properties";
import Navbar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BedDouble, Bath, MapPin, Ruler, DollarSign, Calendar, Home, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import PropertySchemaMarkup from "@/components/PropertySchemaMarkup";

const statusColors: Record<string, string> = {
  "For Sale": "bg-green-600 text-white",
  "For Rent": "bg-blue-600 text-white",
  "Sold": "bg-red-600 text-white",
  "Not For Sale": "bg-muted text-muted-foreground",
};

const PropertyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const property = getPropertyBySlug(slug || "");
  const { toast } = useToast();
  const { t } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useState(() => {
    if (!api) return;
    api.on("select", onSelect);
    onSelect();
  });

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-32 pb-16 text-center">
          <h1 className="font-display text-4xl font-semibold text-foreground mb-4">Property Not Found</h1>
          <Link to="/properties">
            <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast({ title: t("contactDialog.validationError"), description: "Please enter your name and phone number.", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: name.trim(),
        phone: phone.trim(),
        message: `Interested in property: ${property.title} (${property.location})`,
      });
      if (error) throw error;
      toast({ title: t("contactDialog.successTitle"), description: t("contactDialog.successDesc") });
      setName("");
      setPhone("");
    } catch {
      toast({ title: t("contactDialog.errorTitle"), description: t("contactDialog.errorDesc"), variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const formatPrice = (price: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PropertySchemaMarkup property={property} />

      <section className="pt-28 pb-8 md:pt-32">
        <div className="container">
          <Link to="/properties" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> {t("properties.title")}
          </Link>
        </div>
      </section>

      {/* Image Carousel */}
      <section className="pb-8">
        <div className="container">
          <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
            <CarouselContent>
              {property.images.map((img, i) => (
                <CarouselItem key={i}>
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                    <img src={img} alt={`${property.title} - Photo ${i + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {property.images.length > 1 && (
              <>
                <CarouselPrevious className="left-4 h-12 w-12 bg-background/80 hover:bg-background border-0 shadow-lg" />
                <CarouselNext className="right-4 h-12 w-12 bg-background/80 hover:bg-background border-0 shadow-lg" />
              </>
            )}
          </Carousel>
          {property.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {property.images.map((img, i) => (
                <button key={i} onClick={() => api?.scrollTo(i)} className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${current === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Property Details + Lead Form */}
      <section className="pb-16 md:pb-24">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Details */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {property.status && (
                    <Badge className={`font-body text-xs px-3 py-1 ${statusColors[property.status] || ""}`}>{property.status}</Badge>
                  )}
                  {property.propertyType && (
                    <Badge variant="secondary" className="font-body text-xs px-3 py-1">{property.propertyType}</Badge>
                  )}
                </div>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-2">{property.title}</h1>
                {property.location && (
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="font-body">{property.location}</span>
                  </div>
                )}
                {property.price && (
                  <p className="font-display text-3xl md:text-4xl font-bold text-primary">{formatPrice(property.price)}</p>
                )}
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {property.bedrooms && (
                  <div className="bg-card border border-border rounded-xl p-4 text-center">
                    <BedDouble className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="font-display text-2xl font-bold text-foreground">{property.bedrooms}</p>
                    <p className="font-body text-xs text-muted-foreground">{t("properties.bedrooms")}</p>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="bg-card border border-border rounded-xl p-4 text-center">
                    <Bath className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="font-display text-2xl font-bold text-foreground">{property.bathrooms}</p>
                    <p className="font-body text-xs text-muted-foreground">{t("properties.bathrooms")}</p>
                  </div>
                )}
                {property.sqft && (
                  <div className="bg-card border border-border rounded-xl p-4 text-center">
                    <Ruler className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="font-display text-2xl font-bold text-foreground">{property.sqft.toLocaleString()}</p>
                    <p className="font-body text-xs text-muted-foreground">Sqft</p>
                  </div>
                )}
                {property.lotAcres && (
                  <div className="bg-card border border-border rounded-xl p-4 text-center">
                    <Home className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="font-display text-2xl font-bold text-foreground">{property.lotAcres}</p>
                    <p className="font-body text-xs text-muted-foreground">Acres</p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Description</h2>
                <p className="font-body text-muted-foreground leading-relaxed">{property.fullDescription || property.description}</p>
              </div>

              {/* Highlights */}
              {property.highlights && property.highlights.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Highlights</h2>
                  <div className="flex flex-wrap gap-2">
                    {property.highlights.map((h, i) => (
                      <Badge key={i} variant="secondary" className="font-body text-sm px-4 py-2">{h}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Interior Details */}
              {property.interior && (
                <div>
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Interior</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(property.interior).map(([key, value]) => (
                      <div key={key} className="border-b border-border pb-3">
                        <p className="font-body text-xs font-semibold text-primary uppercase tracking-wide mb-1">{key}</p>
                        <p className="font-body text-sm text-foreground">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Exterior Details */}
              {property.exterior && (
                <div>
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Exterior</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(property.exterior).map(([key, value]) => (
                      <div key={key} className="border-b border-border pb-3">
                        <p className="font-body text-xs font-semibold text-primary uppercase tracking-wide mb-1">{key}</p>
                        <p className="font-body text-sm text-foreground">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Extra Info */}
              {(property.yearBuilt || property.maintenanceFee) && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.yearBuilt && (
                    <div className="bg-card border border-border rounded-xl p-4">
                      <Calendar className="w-5 h-5 text-primary mb-2" />
                      <p className="font-body text-xs text-muted-foreground">Year Built</p>
                      <p className="font-display text-lg font-bold text-foreground">{property.yearBuilt}</p>
                    </div>
                  )}
                  {property.maintenanceFee && (
                    <div className="bg-card border border-border rounded-xl p-4">
                      <DollarSign className="w-5 h-5 text-primary mb-2" />
                      <p className="font-body text-xs text-muted-foreground">Maintenance Fee</p>
                      <p className="font-display text-lg font-bold text-foreground">{property.maintenanceFee}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Lead Capture Form - Sticky */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-card border border-border rounded-2xl p-8 shadow-lg">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">Interested in this property?</h3>
                <p className="font-body text-sm text-muted-foreground mb-6">Leave your name and phone number and I'll call you with more information.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder={t("contactDialog.namePlaceholder")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    placeholder={t("contactDialog.phonePlaceholder")}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    required
                  />
                  <Button type="submit" className="w-full font-body" size="lg" disabled={sending}>
                    {sending ? t("contactDialog.sending") : "Call Me Back"}
                  </Button>
                </form>
                <p className="font-body text-xs text-muted-foreground text-center mt-4">
                  Or call directly: <a href="tel:+13054902669" className="text-primary font-semibold hover:underline">+1 (305) 490-2669</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropertyDetail;

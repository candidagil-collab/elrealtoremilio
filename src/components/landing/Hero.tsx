import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { properties } from "@/data/properties";
import { useLanguage } from "@/contexts/LanguageContext";

const statusColors: Record<string, string> = {
  "For Sale": "bg-green-600 text-white",
  "For Rent": "bg-blue-600 text-white",
  "Sold": "bg-red-600 text-white",
  "Not For Sale": "bg-muted text-muted-foreground",
};

const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => { setCurrent(api.selectedScrollSnap()); });
  }, [api]);

  const scrollTo = useCallback((index: number) => { api?.scrollTo(index); }, [api]);

  return (
    <section className="relative min-h-screen bg-background">
      <Navbar />
      <div className="container pt-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 py-16 lg:py-24 min-h-[70vh] items-center">
          <div className="lg:col-span-7 animate-fade-in">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1] tracking-tight text-foreground">
              {t("hero.headline")}
            </h1>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-center animate-fade-in" style={{ animationDelay: "0.15s" }}>
            <p className="text-base md:text-lg font-body leading-relaxed max-w-md text-foreground">
              {t("hero.description")}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full pb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {properties.map(property => (
              <CarouselItem key={property.id} className="pl-4 basis-[90vw] md:basis-[60vw] lg:basis-[50vw]">
                <Link to={`/property/${property.slug}`} className="block">
                  <div className="relative aspect-[16/10] md:aspect-[16/9] rounded-xl overflow-hidden group cursor-pointer">
                    {property.image ? (
                      <img src={property.image} alt={property.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute top-6 left-6">
                      {property.status && (
                        <Badge className={`font-body text-xs md:text-sm px-3 py-1 ${statusColors[property.status] || "bg-muted text-muted-foreground"}`}>
                          {property.status}
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                      <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium mb-3">{property.title}</h3>
                      <p className="font-body text-sm md:text-base text-white/80 mb-4 line-clamp-2 max-w-xl">{property.description}</p>
                      <div className="flex items-center gap-4">
                        {(property.price || property.rentPrice) && (
                          <span className="font-display text-xl md:text-2xl font-bold text-white">
                            {property.price ? `$${property.price.toLocaleString()}` : `$${property.rentPrice?.toLocaleString()}/mo`}
                          </span>
                        )}
                        {property.bedrooms && property.bathrooms && (
                          <span className="font-body text-sm md:text-base text-white/90">
                            {property.bedrooms} {t("hero.bedrooms")} / {property.bathrooms} {t("hero.bathroom")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10">
            <CarouselNext className="relative right-0 translate-x-0 translate-y-0 h-12 w-12 rounded-full bg-background/90 hover:bg-background border-0 shadow-lg" />
          </div>
          <div className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <CarouselPrevious className="relative left-0 translate-x-0 translate-y-0 h-12 w-12 rounded-full bg-background/90 hover:bg-background border-0 shadow-lg" />
          </div>
        </Carousel>
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`${t("hero.goToProperty")} ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import propertyElgin from "@/assets/property-elgin.jpeg";
import propertyGreinertDr from "@/assets/property-greinert-dr.jpeg";
import propertySynergyDr from "@/assets/property-synergy-dr.jpeg";
import propertyMichaelLn from "@/assets/property-michael-ln.jpeg";
import propertyKailynneCt from "@/assets/property-kailynne-ct.jpeg";
const properties = [{
  id: 1,
  image: propertyElgin,
  title: "116 Pine Point Cv",
  description: "Beautiful stone and wood home with 10k Flex Cash incentive. Features elegant craftsmanship, spacious garage, and a lush green yard in a peaceful setting.",
  bedrooms: 3,
  bathrooms: "2"
}, {
  id: 2,
  image: propertyGreinertDr,
  title: "104 Greinert Dr",
  description: "Brand-new home for rent! Located just 2 minutes from Walmart and H-E-B, less than 10 minutes from the Samsung plant in Taylor, and under 3 minutes from the elementary and middle school.",
  bedrooms: 3,
  bathrooms: "2.5"
}, {
  id: 3,
  image: propertySynergyDr,
  title: "3.9 Acres Synergy Dr",
  description: "Experience the allure of Texas countryside living with this remarkable 3.91-acre parcel nestled in the heart of Bastrop.",
  bedrooms: null,
  bathrooms: null
}, {
  id: 4,
  image: propertyMichaelLn,
  title: "105 Michael Ln",
  description: "105 Michael Ln (currently not for sale) is located in Frame Switch subdivision in Williamson County.",
  bedrooms: null,
  bathrooms: null
}, {
  id: 5,
  image: propertyKailynneCt,
  title: "103 Kailynne Ct",
  description: "103 Kailynne Ct (currently not for sale) is located in Country Meadows Estates subdivision in Milam County.",
  bedrooms: null,
  bathrooms: null
}];
const Hero = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!api) return;
    
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  return <section className="relative min-h-screen bg-background">
      {/* Header with Logo and Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-6 transition-all duration-300">
        <div className={`container mx-auto flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300 ${isScrolled ? "bg-background border border-border shadow-md" : "bg-background/80 backdrop-blur-md border border-border/50 shadow-sm"}`}>
          {/* Logo */}
          <img alt="Emilio Sanchez Real Estate" className="h-10 md:h-14 w-auto" src="/lovable-uploads/177b0c2e-8c2e-44b7-ad49-3f99ccc6043d.png" />

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#beneficios" className="font-body text-sm text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#testimonios" className="font-body text-sm text-foreground hover:text-primary transition-colors">
              Properties
            </a>
            <a href="#proceso" className="font-body text-sm text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#faq" className="font-body text-sm text-foreground hover:text-primary transition-colors">
              Blog
            </a>
          </nav>

          {/* CTA Button */}
          <Button className="font-body text-sm px-5 py-2 h-auto rounded-full bg-foreground text-background hover:bg-foreground/90">
            Talk to an Agent
          </Button>
        </div>
      </header>

      {/* Hero Content */}
      <div className="container pt-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 py-16 lg:py-24 min-h-[70vh] items-center">
          {/* Left Column - Large Headline */}
          <div className="lg:col-span-7 animate-fade-in">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1] tracking-tight text-foreground">
              Licensed Real Estate Agent Based in the Austin Area
            </h1>
          </div>

          {/* Right Column - Description */}
          <div className="lg:col-span-5 flex flex-col justify-center animate-fade-in" style={{
          animationDelay: "0.15s"
        }}>
            <p className="text-base md:text-lg font-body leading-relaxed max-w-md text-foreground">
              I guide you step by step through every stage of the buying process, so you can make informed decisions and avoid mistakes that could cost you thousands of dollars.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="w-full pb-8 animate-fade-in" style={{
      animationDelay: "0.3s"
    }}>
        <Carousel 
          setApi={setApi}
          opts={{
            align: "start",
            loop: true
          }} 
          plugins={[Autoplay({
            delay: 4000,
            stopOnInteraction: false,
            stopOnMouseEnter: true
          })]} 
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {properties.map(property => <CarouselItem key={property.id} className="pl-4 basis-[90vw] md:basis-[60vw] lg:basis-[50vw]">
                <div className="relative aspect-[16/10] md:aspect-[16/9] rounded-xl overflow-hidden group cursor-pointer">
                  {/* Property Image */}
                  {property.image ? <img src={property.image} alt={property.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" /> : <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50" />}

                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Featured badge */}
                  <div className="absolute top-6 left-6">
                    <span className="font-body text-xs md:text-sm tracking-widest text-white/90 uppercase">
                      Featured Listing
                    </span>
                  </div>

                  {/* Property Info - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                    <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium mb-3">
                      {property.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-white/80 mb-4 line-clamp-2 max-w-xl">
                      {property.description}
                    </p>
                    {property.bedrooms && property.bathrooms && <p className="font-body text-sm md:text-base text-white/90">
                        {property.bedrooms} Bedrooms / {property.bathrooms} Bathroom
                      </p>}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 rounded-none opacity-0" />
                </div>
              </CarouselItem>)}
          </CarouselContent>
          
          {/* Navigation Arrows */}
          <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10">
            <CarouselNext className="relative right-0 translate-x-0 translate-y-0 h-12 w-12 rounded-full bg-background/90 hover:bg-background border-0 shadow-lg" />
          </div>
          <div className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <CarouselPrevious className="relative left-0 translate-x-0 translate-y-0 h-12 w-12 rounded-full bg-background/90 hover:bg-background border-0 shadow-lg" />
          </div>
        </Carousel>
        
        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current 
                  ? "w-8 bg-primary" 
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Ir a propiedad ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>;
};
export default Hero;
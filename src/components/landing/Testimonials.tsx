import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLanguage } from "@/contexts/LanguageContext";

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLanguage();

  const testimonials = t("testimonials.items") as Array<{ name: string; context: string; quote: string }>;

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div ref={ref} className={`container scroll-reveal ${isVisible ? "visible" : ""}`}>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">{t("testimonials.title")}</h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">{t("testimonials.subtitle")}</p>
        </div>
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 shadow-lg bg-card hover:shadow-xl transition-shadow duration-300 h-full">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="mb-6"><Quote className="w-10 h-10 text-primary/20" /></div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-primary text-primary" />))}
                    </div>
                    <p className="font-body text-foreground leading-relaxed mb-6 italic flex-grow">"{testimonial.quote}"</p>
                    <div className="border-t pt-4 mt-auto">
                      <p className="font-display font-semibold text-foreground">{testimonial.name}</p>
                      <p className="font-body text-sm text-muted-foreground">{testimonial.context}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;

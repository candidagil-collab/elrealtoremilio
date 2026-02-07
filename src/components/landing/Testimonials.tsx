import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Axel C.",
      context: "First home in Jarrell",
      quote:
        "Emilio guided us through every step of the process. Thanks to his advice, we avoided mistakes that would have cost us thousands of dollars. Highly recommended!",
      rating: 5,
    },
    {
      name: "Roel G.",
      context: "First-time buyer in Texas",
      quote:
        "The clarity Emilio gave us from the first call was incredible. We knew exactly what to expect at each stage, and that gave us great peace of mind.",
      rating: 5,
    },
    {
      name: "Pedro G.",
      context: "First-time buyer in Hutto",
      quote:
        "Professional, patient, and very knowledgeable about the market. Emilio made a process that seemed complicated simple and stress-free.",
      rating: 5,
    },
    {
      name: "Betania G.",
      context: "First-time buyer in Taylor",
      quote:
        "Excellent Realtor, I highly recommend him! His help was fundamental in the process. His professionalism, ethics, and commitment were key to achieving our dream of buying our home.",
      rating: 5,
    },
    {
      name: "Antonio M.",
      context: "Second home in Del Valle",
      quote:
        "Excellent person and a great realtor. Always taking care of the client, a very professional person. Thank you for everything!",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
            What our clients say
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Real families who bought their home with clarity and confidence
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <Card className="border-0 shadow-lg bg-card hover:shadow-xl transition-shadow duration-300 h-full">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="mb-6">
                      <Quote className="w-10 h-10 text-primary/20" />
                    </div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    <p className="font-body text-foreground leading-relaxed mb-6 italic flex-grow">
                      "{testimonial.quote}"
                    </p>
                    <div className="border-t pt-4 mt-auto">
                      <p className="font-display font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="font-body text-sm text-muted-foreground">
                        {testimonial.context}
                      </p>
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

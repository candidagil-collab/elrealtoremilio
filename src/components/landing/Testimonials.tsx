import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Axel C.",
      context: "Primera casa en Florida",
      quote:
        "Emilio nos guió en cada paso del proceso. Gracias a su asesoría evitamos errores que nos hubieran costado miles de dólares. ¡Altamente recomendado!",
      rating: 5,
    },
    {
      name: "Roel G.",
      context: "Comprador primerizo en Texas",
      quote:
        "La claridad que Emilio nos dio desde la primera llamada fue increíble. Sabíamos exactamente qué esperar en cada etapa y eso nos dio mucha tranquilidad.",
      rating: 5,
    },
    {
      name: "Pedro G.",
      context: "Inversión residencial",
      quote:
        "Profesional, paciente y muy conocedor del mercado. Emilio hizo que un proceso que parecía complicado fuera simple y sin estrés.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Familias reales que compraron su casa con claridad y confianza
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg bg-card hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-8">
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
                <p className="font-body text-foreground leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-display font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    {testimonial.context}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

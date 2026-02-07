import { Card, CardContent } from "@/components/ui/card";
import { Brain, DollarSign, Home } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: Brain,
      title: "Sabes exactamente qué sigue",
      description:
        "En cada etapa del proceso de compra tendrás claridad total sobre los siguientes pasos, documentos y decisiones importantes.",
    },
    {
      icon: DollarSign,
      title: "Evitas errores que cuestan miles",
      description:
        "Te guío para identificar problemas antes de que se conviertan en gastos inesperados que afecten tu inversión.",
    },
    {
      icon: Home,
      title: "Compras con tranquilidad, no con miedo",
      description:
        "Toma decisiones informadas con la confianza de que estás haciendo lo correcto para ti y tu familia.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
            ¿Por qué trabajar conmigo?
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Mi enfoque está en darte claridad y seguridad en cada paso del proceso
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="mb-6 w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;

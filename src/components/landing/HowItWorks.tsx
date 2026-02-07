import { Calendar, MessageSquare, CheckCircle2 } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: Calendar,
      title: "Agenda la llamada",
      description:
        "Elige el horario que mejor te funcione. Es gratis, sin compromiso y dura aproximadamente 30 minutos.",
    },
    {
      number: "02",
      icon: MessageSquare,
      title: "Entiende todo tu proceso",
      description:
        "En nuestra llamada analizamos tu situación actual y te explico paso a paso lo que necesitas saber para comprar bien.",
    },
    {
      number: "03",
      icon: CheckCircle2,
      title: "Avanza con claridad",
      description:
        "Con un plan claro en mente, podrás tomar decisiones informadas y avanzar con total seguridad hacia tu nueva casa.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Tres pasos simples para comenzar tu camino hacia tu primera casa
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-primary/20" />
              )}

              {/* Step number badge */}
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <span className="font-display text-3xl font-bold text-primary">
                  {step.number}
                </span>
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <step.icon className="w-8 h-8 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

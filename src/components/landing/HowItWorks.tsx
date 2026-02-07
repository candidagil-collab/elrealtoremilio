import { Calendar, MessageSquare, CheckCircle2 } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: Calendar,
      title: "Schedule the call",
      description:
        "Choose the time that works best for you. It's free, no obligation, and takes approximately 30 minutes.",
    },
    {
      number: "02",
      icon: MessageSquare,
      title: "Understand your entire process",
      description:
        "In our call, we analyze your current situation and I explain step by step what you need to know to buy smart.",
    },
    {
      number: "03",
      icon: CheckCircle2,
      title: "Move forward with clarity",
      description:
        "With a clear plan in mind, you'll be able to make informed decisions and move forward with complete confidence toward your new home.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
            How does it work?
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to start your journey toward your first home
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

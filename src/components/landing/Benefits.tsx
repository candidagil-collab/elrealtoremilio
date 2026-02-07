import { Card, CardContent } from "@/components/ui/card";
import { Brain, DollarSign, Home } from "lucide-react";
const Benefits = () => {
  const benefits = [{
    icon: Brain,
    title: "Know exactly what's next",
    description: "At every stage of the buying process, you'll have total clarity on the next steps, documents, and important decisions."
  }, {
    icon: DollarSign,
    title: "Avoid costly mistakes",
    description: "I guide you to identify problems before they become unexpected expenses that affect your investment."
  }, {
    icon: Home,
    title: "Buy with confidence, not fear",
    description: "Make informed decisions with the confidence that you're doing the right thing for you and your family."
  }];
  return <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl font-semibold mb-4 text-primary md:text-5xl">
            Why work with me?
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            My focus is on giving you clarity and confidence at every step of the process
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card group" style={{
          animationDelay: `${index * 0.1}s`
        }}>
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
            </Card>)}
        </div>
      </div>
    </section>;
};
export default Benefits;
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const FAQ = () => {
  const { ref, isVisible } = useScrollReveal();

  const faqs = [
    {
      question: "Is the call free?",
      answer: "Yes, the initial call is completely free and with no obligation. It's an opportunity to get to know each other, understand your current situation, and explain how I can help you in your home buying process.",
    },
    {
      question: "What if I'm not ready to buy yet?",
      answer: "Perfect! In fact, it's the best time to have this conversation. I'll help you understand what steps you need to take to be ready, how long it might take, and what you can start preparing now.",
    },
    {
      question: "Do you only work with certain types of properties?",
      answer: "I primarily work with families looking for their first home or family house. My focus is on residential properties that fit your needs and budget, always prioritizing your long-term well-being.",
    },
    {
      question: "What happens after the call?",
      answer: "After our call, you'll have complete clarity on the next steps in your process. If you decide to work with me, I'll accompany you at every stage. If you prefer to take another path, at least you'll have valuable information to move forward with confidence.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div ref={ref} className={`container scroll-reveal ${isVisible ? "visible" : ""}`}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-body text-lg text-muted-foreground">
              Get your questions answered before taking the next step
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-lg px-6 bg-card shadow-sm hover:shadow-md transition-shadow duration-300 scroll-reveal-child"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <AccordionTrigger className="font-display text-lg font-medium text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

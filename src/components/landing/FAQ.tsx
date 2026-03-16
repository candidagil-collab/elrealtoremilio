import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLanguage } from "@/contexts/LanguageContext";
import SchemaMarkup from "@/components/SchemaMarkup";

const FAQ = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLanguage();

  const faqs = t("faq.items") as Array<{ question: string; answer: string }>;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <SchemaMarkup type="FAQPage" data={faqSchema} />
      <div ref={ref} className={`container scroll-reveal ${isVisible ? "visible" : ""}`}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">{t("faq.title")}</h2>
            <p className="font-body text-lg text-muted-foreground">{t("faq.subtitle")}</p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6 bg-card shadow-sm hover:shadow-md transition-shadow duration-300 scroll-reveal-child" style={{ transitionDelay: `${index * 0.1}s` }}>
                <AccordionTrigger className="font-display text-lg font-medium text-foreground hover:no-underline py-5">{faq.question}</AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground leading-relaxed pb-5">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

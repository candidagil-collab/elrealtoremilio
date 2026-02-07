import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "¿La llamada tiene algún costo?",
      answer:
        "No, la llamada inicial es completamente gratuita y sin compromiso. Es una oportunidad para conocernos, entender tu situación actual y explicarte cómo puedo ayudarte en tu proceso de compra.",
    },
    {
      question: "¿Y si todavía no estoy listo para comprar?",
      answer:
        "¡Perfecto! De hecho, es el mejor momento para tener esta conversación. Te ayudaré a entender qué pasos necesitas dar para estar listo, cuánto tiempo podría tomar y qué puedes ir preparando desde ahora.",
    },
    {
      question: "¿Solo trabajas con cierto tipo de propiedades?",
      answer:
        "Trabajo principalmente con familias que buscan su primera vivienda o casa familiar. Mi enfoque está en propiedades residenciales que se ajusten a tus necesidades y presupuesto, siempre priorizando tu bienestar a largo plazo.",
    },
    {
      question: "¿Qué pasa después de la llamada?",
      answer:
        "Después de nuestra llamada, tendrás total claridad sobre los siguientes pasos de tu proceso. Si decides trabajar conmigo, te acompañaré en cada etapa. Si prefieres tomar otro camino, al menos tendrás información valiosa para avanzar con confianza.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Preguntas frecuentes
            </h2>
            <p className="font-body text-lg text-muted-foreground">
              Resuelve tus dudas antes de dar el siguiente paso
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-lg px-6 bg-card shadow-sm hover:shadow-md transition-shadow duration-300"
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

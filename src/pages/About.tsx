import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";
import ContactDialog from "@/components/landing/ContactDialog";
import { Button } from "@/components/ui/button";
import {
  Home,
  MapPin,
  TrendingUp,
  Shield,
  Phone,
  ClipboardList,
  Search,
  Handshake,
  CheckCircle,
  MessageSquare,
  Wrench,
  BarChart3,
  Users,
  Eye,
} from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Compra de vivienda principal",
    description:
      "Te guío paso a paso si eres primer comprador o si estás cambiando de casa.",
  },
  {
    icon: MapPin,
    title: "Compra de terrenos",
    description:
      "Te ayudo a evaluar ubicación, potencial y viabilidad antes de tomar una decisión.",
  },
  {
    icon: TrendingUp,
    title: "Inversión inmobiliaria",
    description:
      "Analizamos números, proyección y estrategia para que tu compra tenga sentido financiero.",
  },
  {
    icon: Shield,
    title: "Acompañamiento completo",
    description:
      "Desde la preaprobación hasta el cierre, incluyendo negociación, inspección y revisión de contrato.",
  },
];

const steps = [
  {
    icon: Phone,
    title: "Llamada inicial",
    description: "Conversamos sobre tus metas, presupuesto y tiempos.",
  },
  {
    icon: ClipboardList,
    title: "Plan estratégico",
    description: "Definimos zonas, rango de precio y pasos financieros.",
  },
  {
    icon: Search,
    title: "Búsqueda y comparación",
    description: "Evaluamos opciones con criterio, no con emoción.",
  },
  {
    icon: Handshake,
    title: "Oferta y negociación",
    description:
      "Te represento para proteger tus intereses y condiciones.",
  },
  {
    icon: CheckCircle,
    title: "Cierre y seguimiento",
    description: "Te acompaño hasta el día del cierre y más allá.",
  },
];

const strengths = [
  { icon: MessageSquare, text: "Comunicación clara en español" },
  { icon: Wrench, text: "Experiencia en construcción que agrega una ventaja técnica" },
  { icon: BarChart3, text: "Enfoque en decisiones basadas en números" },
  { icon: Users, text: "Acompañamiento real durante todo el proceso" },
  { icon: Eye, text: "Compromiso con la transparencia y la organización" },
];

const About = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4">
        <div className="container mx-auto max-w-3xl text-center scroll-reveal">
          <span className="inline-block font-body text-sm tracking-widest uppercase text-primary mb-4">
            Sobre Emilio
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Emilio Sanchez
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed">
            Realtor y constructor en el área de Austin. Trabajo con primeros
            compradores, familias e inversionistas que quieren tomar decisiones
            inteligentes, entender cada paso del proceso y proteger su inversión
            desde el primer día.
          </p>
        </div>
      </section>

      {/* Mi Historia */}
      <section className="py-16 md:py-24 px-4 bg-secondary">
        <div className="container mx-auto max-w-3xl scroll-reveal">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
            Mi Historia
          </h2>
          <div className="space-y-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              Comprar una propiedad es una de las decisiones financieras más
              importantes en la vida de una persona. Mi objetivo es que lo hagas
              con información clara, expectativas realistas y una estrategia bien
              definida.
            </p>
            <p>
              Además de ser realtor, tengo experiencia en construcción, lo que me
              permite evaluar detalles estructurales y aspectos técnicos que
              muchas veces pasan desapercibidos. No solo te ayudo a encontrar una
              propiedad, te ayudo a entenderla.
            </p>
            <p>
              Trabajo principalmente en el área de Austin y sus alrededores,
              acompañando a compradores hispanos que buscan orientación clara en
              español y un proceso organizado de principio a fin.
            </p>
          </div>
        </div>
      </section>

      {/* Cómo Puedo Ayudarte */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cómo Puedo Ayudarte
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="scroll-reveal bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <service.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mi Proceso */}
      <section className="py-16 md:py-24 px-4 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Mi Proceso de Trabajo
            </h2>
          </div>
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="scroll-reveal flex items-start gap-6 relative py-8"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Vertical line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-6 top-[4.5rem] bottom-0 w-px bg-border" />
                )}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center z-10">
                  <step.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="font-body text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por Qué Trabajar Conmigo */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Por Qué Trabajar Conmigo
            </h2>
          </div>
          <ul className="space-y-5">
            {strengths.map((item, i) => (
              <li
                key={i}
                className="scroll-reveal flex items-center gap-4"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-body text-foreground text-base md:text-lg">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-4 bg-primary">
        <div className="container mx-auto max-w-2xl text-center scroll-reveal">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            ¿Listo para dar el siguiente paso?
          </h2>
          <p className="font-body text-primary-foreground/80 text-lg mb-8 leading-relaxed">
            Si estás pensando en comprar casa o terreno en el área de Austin,
            agenda una llamada y diseñemos tu plan de compra con claridad y
            estrategia.
          </p>
          <ContactDialog>
            <Button
              size="lg"
              className="rounded-full bg-background text-foreground hover:bg-background/90 font-body text-base px-8 py-6"
            >
              Agenda tu llamada hoy
            </Button>
          </ContactDialog>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

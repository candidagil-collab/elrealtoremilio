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
    title: "Primary Home Purchase",
    description:
      "I guide you step by step whether you're a first-time buyer or looking to upgrade.",
  },
  {
    icon: MapPin,
    title: "Land Purchase",
    description:
      "I help you evaluate location, potential, and viability before making a decision.",
  },
  {
    icon: TrendingUp,
    title: "Real Estate Investment",
    description:
      "We analyze numbers, projections, and strategy so your purchase makes financial sense.",
  },
  {
    icon: Shield,
    title: "Full-Service Support",
    description:
      "From pre-approval to closing, including negotiation, inspection, and contract review.",
  },
];

const steps = [
  {
    icon: Phone,
    title: "Initial Call",
    description: "We discuss your goals, budget, and timeline.",
  },
  {
    icon: ClipboardList,
    title: "Strategic Plan",
    description: "We define areas, price range, and financial steps.",
  },
  {
    icon: Search,
    title: "Search & Compare",
    description: "We evaluate options with criteria, not emotion.",
  },
  {
    icon: Handshake,
    title: "Offer & Negotiation",
    description:
      "I represent you to protect your interests and conditions.",
  },
  {
    icon: CheckCircle,
    title: "Closing & Follow-Up",
    description: "I walk with you through closing day and beyond.",
  },
];

const strengths = [
  { icon: MessageSquare, text: "Clear communication in English and Spanish" },
  { icon: Wrench, text: "Construction experience that adds a technical edge" },
  { icon: BarChart3, text: "Decisions driven by numbers, not emotion" },
  { icon: Users, text: "Real support throughout the entire process" },
  { icon: Eye, text: "Commitment to transparency and organization" },
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
            About Emilio
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Emilio Sanchez
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed">
            Realtor and builder in the Austin area. I work with first-time buyers,
            families, and investors who want to make smart decisions, understand
            every step of the process, and protect their investment from day one.
          </p>
        </div>
      </section>

      {/* Mi Historia */}
      <section className="py-16 md:py-24 px-4 bg-secondary">
        <div className="container mx-auto max-w-3xl scroll-reveal">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
            My Story
          </h2>
          <div className="space-y-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              Buying a property is one of the most important financial decisions
              in a person's life. My goal is to help you do it with clear
              information, realistic expectations, and a well-defined strategy.
            </p>
            <p>
              In addition to being a realtor, I have experience in construction,
              which allows me to evaluate structural details and technical aspects
              that often go unnoticed. I don't just help you find a property — I
              help you understand it.
            </p>
            <p>
              I work primarily in the Austin area and surrounding communities,
              guiding buyers who are looking for clear guidance and an organized
              process from start to finish.
            </p>
          </div>
        </div>
      </section>

      {/* Cómo Puedo Ayudarte */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How I Can Help You
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
              My Work Process
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
              Why Work With Me
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
            Ready to Take the Next Step?
          </h2>
          <p className="font-body text-primary-foreground/80 text-lg mb-8 leading-relaxed">
            If you're thinking about buying a home or land in the Austin area,
            schedule a call and let's build your buying plan with clarity and
            strategy.
          </p>
          <ContactDialog>
            <Button
              size="lg"
              className="rounded-full bg-background text-foreground hover:bg-background/90 font-body text-base px-8 py-6"
            >
              Schedule Your Call Today
            </Button>
          </ContactDialog>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";
import ContactDialog from "@/components/landing/ContactDialog";
import { Button } from "@/components/ui/button";
import { Home, MapPin, TrendingUp, Shield, Phone, ClipboardList, Search, Handshake, CheckCircle, MessageSquare, Wrench, BarChart3, Users, Eye, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SchemaMarkup from "@/components/SchemaMarkup";

const serviceIcons = [Home, MapPin, TrendingUp, Shield];
const stepIcons = [Phone, ClipboardList, Search, Handshake, CheckCircle];
const strengthIcons = [MessageSquare, Wrench, BarChart3, Users, Eye];

const About = () => {
  const { t } = useLanguage();

  useEffect(() => {
    const elements = document.querySelectorAll(".scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }); },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const services = t("about.services") as Array<{ title: string; description: string }>;
  const steps = t("about.steps") as Array<{ title: string; description: string }>;
  const strengths = t("about.strengths") as string[];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4">
        <div className="container mx-auto max-w-3xl text-center scroll-reveal">
          <span className="inline-block font-body text-sm tracking-widest uppercase text-primary mb-4">{t("about.label")}</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">{t("about.title")}</h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed">{t("about.intro")}</p>
        </div>
      </section>

      {/* My Story */}
      <section className="py-16 md:py-24 px-4 bg-secondary">
        <div className="container mx-auto max-w-3xl scroll-reveal">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">{t("about.storyTitle")}</h2>
          <div className="space-y-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>{t("about.storyP1")}</p>
            <p>{t("about.storyP2")}</p>
            <p>{t("about.storyP3")}</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{t("about.servicesTitle")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => {
              const Icon = serviceIcons[i];
              return (
                <div key={i} className="scroll-reveal bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow" style={{ transitionDelay: `${i * 100}ms` }}>
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="font-body text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 px-4 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{t("about.processTitle")}</h2>
          </div>
          <div className="space-y-0">
            {steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={i} className="scroll-reveal flex items-start gap-6 relative py-8" style={{ transitionDelay: `${i * 100}ms` }}>
                  {i < steps.length - 1 && <div className="absolute left-6 top-[4.5rem] bottom-0 w-px bg-border" />}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center z-10">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="font-body text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Work With Me */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{t("about.whyTitle")}</h2>
          </div>
          <ul className="space-y-5">
            {strengths.map((text, i) => {
              const Icon = strengthIcons[i];
              return (
                <li key={i} className="scroll-reveal flex items-center gap-4" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-body text-foreground text-base md:text-lg">{text}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 md:py-24 px-4 bg-secondary">
        <div className="container mx-auto max-w-3xl text-center scroll-reveal">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{t("about.contactTitle")}</h2>
          <p className="font-body text-muted-foreground text-lg mb-8">{t("about.contactDesc")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="tel:+13054902669" className="inline-flex items-center gap-3 bg-card border border-border rounded-2xl px-6 py-4 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <span className="block font-body text-sm text-muted-foreground">{t("about.contactPhone")}</span>
                <span className="font-body font-semibold text-foreground">+1 305 490 2669</span>
              </div>
            </a>
            <a href="mailto:elrealtoremilio@gmail.com" className="inline-flex items-center gap-3 bg-card border border-border rounded-2xl px-6 py-4 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <span className="block font-body text-sm text-muted-foreground">{t("about.contactEmail")}</span>
                <span className="font-body font-semibold text-foreground">elrealtoremilio@gmail.com</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-4 bg-primary">
        <div className="container mx-auto max-w-2xl text-center scroll-reveal">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">{t("about.ctaTitle")}</h2>
          <p className="font-body text-primary-foreground/80 text-lg mb-8 leading-relaxed">{t("about.ctaDesc")}</p>
          <ContactDialog>
            <Button size="lg" className="rounded-full bg-background text-foreground hover:bg-background/90 font-body text-base px-8 py-6">
              {t("about.ctaButton")}
            </Button>
          </ContactDialog>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

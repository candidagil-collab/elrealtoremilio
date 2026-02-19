import { Link } from "react-router-dom";
import logoWhite from "@/assets/logo-emilio-sanchez-white.png";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLanguage } from "@/contexts/LanguageContext";
import ContactDialog from "@/components/landing/ContactDialog";

const Footer = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary py-12 md:py-16">
      <div ref={ref} className={`container scroll-reveal ${isVisible ? "visible" : ""}`}>
        <div className="flex flex-col items-center text-center">
          <img src={logoWhite} alt="Emilio Sanchez Real Estate" className="h-12 md:h-16 w-auto mb-8" />
          <nav className="flex flex-wrap justify-center gap-6 mb-8">
            <Link to="/privacy" className="font-body text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t("footer.privacy")}</Link>
            <Link to="/terms" className="font-body text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t("footer.terms")}</Link>
            <ContactDialog>
              <button className="font-body text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t("footer.contact")}</button>
            </ContactDialog>
          </nav>
          <p className="font-body text-sm text-primary-foreground/60">
            © {currentYear} Emilio Sanchez Real Estate. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

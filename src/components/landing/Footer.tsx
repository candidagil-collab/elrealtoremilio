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
            <Link to="/cookies" className="font-body text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t("cookies.policyLink")}</Link>
            <ContactDialog>
              <button className="font-body text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t("footer.contact")}</button>
            </ContactDialog>
          </nav>

          {/* Affiliation Logos */}
          <div className="mb-8">
            <p className="font-body text-xs text-primary-foreground/50 uppercase tracking-widest mb-4">{t("footer.affiliations")}</p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="flex flex-col items-center gap-1">
                <span className="font-display text-lg font-bold text-primary-foreground/70">NAR</span>
                <span className="font-body text-[10px] text-primary-foreground/50">National Association<br/>of REALTORS®</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="font-display text-lg font-bold text-primary-foreground/70">TAR</span>
                <span className="font-body text-[10px] text-primary-foreground/50">Texas<br/>REALTORS®</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="font-display text-lg font-bold text-primary-foreground/70">ABoR</span>
                <span className="font-body text-[10px] text-primary-foreground/50">Austin Board<br/>of REALTORS®</span>
              </div>
            </div>
          </div>

          <p className="font-body text-sm text-primary-foreground/60">
            © {currentYear} Emilio Sanchez Real Estate. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

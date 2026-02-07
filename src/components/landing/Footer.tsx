import logoWhite from "@/assets/logo-emilio-sanchez-white.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary py-12 md:py-16">
      <div className="container">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <img
            src={logoWhite}
            alt="Emilio Sanchez Real Estate"
            className="h-12 md:h-16 w-auto mb-8"
          />

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6 mb-8">
            <a
              href="#"
              className="font-body text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Aviso de privacidad
            </a>
            <a
              href="#"
              className="font-body text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Términos y condiciones
            </a>
            <a
              href="#"
              className="font-body text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Contacto
            </a>
          </nav>

          {/* Copyright */}
          <p className="font-body text-sm text-primary-foreground/60">
            © {currentYear} Emilio Sanchez Real Estate. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

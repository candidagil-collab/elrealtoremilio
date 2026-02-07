import { Star, Users, Shield } from "lucide-react";

const AuthorityBar = () => {
  const credentials = [
    {
      icon: Star,
      title: "Testimonios reales",
      description: "Familias satisfechas que compraron con claridad",
    },
    {
      icon: Users,
      title: "Experiencia comprobada",
      description: "Años guiando procesos de compra en USA",
    },
    {
      icon: Shield,
      title: "Método estructurado",
      description: "Sin improvisaciones ni sorpresas",
    },
  ];

  return (
    <section className="bg-primary py-8 md:py-10">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {credentials.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 text-primary-foreground"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-primary-foreground/80">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorityBar;

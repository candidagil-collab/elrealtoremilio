import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLanguage } from "@/contexts/LanguageContext";

const subscribeSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
});

const NewsletterSignup = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = subscribeSchema.safeParse({ name, email });
    if (!result.success) {
      toast({ title: t("contactDialog.validationError"), description: result.error.errors[0].message, variant: "destructive" });
      return;
    }
    setIsLoading(true);
    const { error } = await supabase.from('newsletter_subscribers').insert({ name: result.data.name, email: result.data.email });
    if (error) {
      if (error.code === '23505') {
        toast({ title: t("newsletter.alreadyTitle"), description: t("newsletter.alreadyDesc") });
      } else {
        toast({ title: t("newsletter.errorTitle"), description: t("newsletter.errorDesc"), variant: "destructive" });
      }
      setIsLoading(false);
      return;
    }
    toast({ title: t("newsletter.successTitle"), description: t("newsletter.successDesc") });
    setName("");
    setEmail("");
    setIsLoading(false);
  };

  return (
    <section className="py-16 md:py-24 bg-primary">
      <div ref={ref} className={`container scroll-reveal ${isVisible ? "visible" : ""}`}>
        <div className="text-center max-w-3xl mx-auto">
          <p className="font-body text-sm tracking-widest text-primary-foreground/70 mb-4 uppercase">{t("newsletter.label")}</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground mb-8">{t("newsletter.title")}</h2>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-2xl mx-auto mb-4">
            <Input type="text" placeholder={t("newsletter.namePlaceholder")} value={name} onChange={(e) => setName(e.target.value)} className="h-12 bg-primary-foreground text-foreground border-transparent rounded-lg px-4 md:flex-1 placeholder:text-muted-foreground" maxLength={100} />
            <Input type="email" placeholder={t("newsletter.emailPlaceholder")} value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 bg-primary-foreground text-foreground border-transparent rounded-lg px-4 md:flex-1 placeholder:text-muted-foreground" maxLength={255} />
            <Button type="submit" disabled={isLoading} className="h-12 px-6 bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full font-medium">
              {isLoading ? t("newsletter.subscribing") : t("newsletter.subscribe")}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          <p className="font-body text-sm text-primary-foreground/70">{t("newsletter.noSpam")}</p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;

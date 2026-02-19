import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(20),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

interface ContactDialogProps {
  children: React.ReactNode;
}

const ContactDialog = ({ children }: ContactDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse({ name, phone, message });
    if (!result.success) {
      toast({ title: t("contactDialog.validationError"), description: result.error.errors[0].message, variant: "destructive" });
      return;
    }
    setIsLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({ name: result.data.name, phone: result.data.phone, message: result.data.message });
    if (error) {
      toast({ title: t("contactDialog.errorTitle"), description: t("contactDialog.errorDesc"), variant: "destructive" });
      setIsLoading(false);
      return;
    }
    toast({ title: t("contactDialog.successTitle"), description: t("contactDialog.successDesc") });
    setName("");
    setPhone("");
    setMessage("");
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{t("contactDialog.title")}</DialogTitle>
          <DialogDescription className="font-body text-muted-foreground">{t("contactDialog.description")}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <Input placeholder={t("contactDialog.namePlaceholder")} value={name} onChange={(e) => setName(e.target.value)} className="font-body" disabled={isLoading} />
          <Input type="tel" placeholder={t("contactDialog.phonePlaceholder")} value={phone} onChange={(e) => setPhone(e.target.value)} className="font-body" disabled={isLoading} />
          <Textarea placeholder={t("contactDialog.messagePlaceholder")} value={message} onChange={(e) => setMessage(e.target.value)} className="font-body min-h-[120px]" disabled={isLoading} />
          <Button type="submit" disabled={isLoading} className="w-full font-body rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            {isLoading ? t("contactDialog.sending") : t("contactDialog.send")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;

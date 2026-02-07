import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const subscribeSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
});

const NewsletterSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = subscribeSchema.safeParse({ name, email });
    
    if (!result.success) {
      toast({
        title: "Validation Error",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call - replace with actual newsletter service integration
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Successfully subscribed!",
      description: "You'll be notified when we have new listings.",
    });
    
    setName("");
    setEmail("");
    setIsLoading(false);
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <p className="font-body text-sm tracking-widest text-muted-foreground mb-4 uppercase">
            Need something different?
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-8">
            Get Notified When We Have New House On Our List
          </h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-2xl mx-auto mb-4">
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 bg-background border-border rounded-lg px-4 md:flex-1"
              maxLength={100}
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-background border-border rounded-lg px-4 md:flex-1"
              maxLength={255}
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="h-12 px-6 bg-foreground text-background hover:bg-foreground/90 rounded-full font-medium"
            >
              {isLoading ? "Subscribing..." : "SUBSCRIBE"}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          
          <p className="font-body text-sm text-muted-foreground">
            No spam. Only house updates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;

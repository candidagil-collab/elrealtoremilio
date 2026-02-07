import Hero from "@/components/landing/Hero";
import AuthorityBar from "@/components/landing/AuthorityBar";
import Benefits from "@/components/landing/Benefits";
import CTASection from "@/components/landing/CTASection";
import NewsletterSignup from "@/components/landing/NewsletterSignup";
import VideoShowcase from "@/components/landing/VideoShowcase";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import HowItWorks from "@/components/landing/HowItWorks";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Authority Bar */}
      <AuthorityBar />

      {/* 3. Benefits Section */}
      <Benefits />

      {/* 4. CTA Intermedio */}
      <CTASection variant="primary" />

      {/* 5. Video Showcase */}
      <VideoShowcase />

      {/* 6. Testimonials */}
      <Testimonials />

      {/* 7. FAQ */}
      <FAQ />

      {/* 8. How It Works */}
      <HowItWorks />

      {/* 9. Final CTA */}
      <CTASection variant="secondary" />

      {/* 10. Newsletter Signup */}
      <NewsletterSignup />
      
      {/* 11. Footer */}
      <Footer />
    </main>
  );
};

export default Index;

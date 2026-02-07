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

      {/* 5. Newsletter Signup */}
      <NewsletterSignup />

      {/* 6. Video Showcase */}
      <VideoShowcase />

      {/* 6. Testimonials */}
      <Testimonials />

      {/* 6. FAQ */}
      <FAQ />

      {/* 7. How It Works */}
      <HowItWorks />

      {/* 8. Final CTA + Footer */}
      <CTASection variant="secondary" />
      <Footer />
    </main>
  );
};

export default Index;

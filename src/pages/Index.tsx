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
import ResultsMetrics from "@/components/landing/ResultsMetrics";
import SchemaMarkup from "@/components/SchemaMarkup";

const Index = () => {
  return (
    <main className="min-h-screen">
      <SchemaMarkup type="RealEstateAgent" />

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Authority Bar */}
      <AuthorityBar />

      {/* 3. Results Metrics */}
      <ResultsMetrics />

      {/* 4. Benefits Section */}
      <Benefits />

      {/* 5. CTA Intermedio */}
      <CTASection variant="primary" />

      {/* 6. Video Showcase */}
      <VideoShowcase />

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. FAQ */}
      <FAQ />

      {/* 9. How It Works */}
      <HowItWorks />

      {/* 10. Final CTA */}
      <CTASection variant="secondary" />

      {/* 11. Newsletter Signup */}
      <NewsletterSignup />
      
      {/* 12. Footer */}
      <Footer />
    </main>
  );
};

export default Index;

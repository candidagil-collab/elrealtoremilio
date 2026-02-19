import huttoVideo from "@/assets/hutto-aerial-video.mp4";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const VideoShowcase = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div ref={ref} className={`container scroll-reveal ${isVisible ? "visible" : ""}`}>
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Discover Hutto, Texas
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            A growing community with beautiful homes, excellent schools, and a welcoming atmosphere
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
          <video
            className="w-full h-auto aspect-video object-cover"
            autoPlay
            muted
            loop
            playsInline
            controls
          >
            <source src={huttoVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;

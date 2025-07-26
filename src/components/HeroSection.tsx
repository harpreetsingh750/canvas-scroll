import { useEffect, useRef } from 'react';

const HeroSection = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.2;
        const zoom = 1 + scrolled * 0.0003;
        
        imageRef.current.style.transform = `translateY(${parallax}px) scale(${zoom})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
      {/* White padding at top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-white z-10"></div>
      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        <img
          ref={imageRef}
          src="/lovable-uploads/f45eba49-c3a3-4721-a597-50182fe756e4.png"
          alt="Featured Artwork"
          className="w-full h-full object-cover object-center transition-transform duration-75"
        />
        <div className="absolute inset-0 bg-charcoal/30"></div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-charcoal/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="hero-text mb-8 smooth-reveal">
            Contemporary Art
            <br />
            <span className="italic font-normal">& Sculpture</span>
          </h1>
          <p className="text-xl md:text-2xl font-light mb-12 max-w-2xl mx-auto opacity-90 smooth-reveal">
            Handcrafted pieces that explore the intersection of form, texture, and emotion
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center smooth-reveal">
            <a
              href="/work"
              className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 transition-all duration-300 text-sm tracking-wide uppercase"
            >
              View Work
            </a>
            <a
              href="/shop"
              className="px-8 py-3 bg-gold/90 text-charcoal border border-gold hover:bg-gold transition-all duration-300 text-sm tracking-wide uppercase font-medium"
            >
              Shop Collection
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70">
        <div className="animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L6 13M12 19L18 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
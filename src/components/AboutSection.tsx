import AnimatedUnderlineHeading from '@/components/AnimatedUnderlineHeading';
const AboutSection = () => {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text Content */}
            <div className="smooth-reveal">
              <AnimatedUnderlineHeading
                text="Creating with intention & soul"
                level="h2"
                className="text-4xl md:text-5xl font-playfair font-light mb-8"
              />
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                  Each piece begins as a conversation between material and vision, 
                  where traditional techniques meet contemporary expression. My work 
                  explores the delicate balance between control and surrender.
                </p>
                <p>
                  Working primarily in mixed media, sculpture, and photography, 
                  I'm drawn to textures that tell stories and forms that invite 
                  contemplation. Every creation is an exploration of what it means 
                  to find beauty in the imperfect.
                </p>
              </div>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="/info"
                  className="px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 text-sm tracking-wide uppercase text-center"
                >
                  Read More
                </a>
                <a
                  href="https://instagram.com/artist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border border-border hover:bg-accent transition-colors duration-300 text-sm tracking-wide uppercase text-center"
                >
                  Follow Journey
                </a>
              </div>
            </div>

            {/* Image/Visual Element */}
            <div className="smooth-reveal">
              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-muted to-accent/20 rounded-sm overflow-hidden">
                  {/* Placeholder for artist photo */}
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-accent/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="text-sm">Artist Portrait</p>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/20 rounded-full -z-10"></div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-accent/30 rounded-full -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
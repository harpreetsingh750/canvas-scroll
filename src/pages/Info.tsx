import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Instagram, ExternalLink } from 'lucide-react';

const Info = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="section-padding py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-playfair text-4xl md:text-6xl font-light mb-12 text-center">
              About the Artist
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Artist Photo */}
              <div className="order-2 lg:order-1">
                <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted">
                  <img
                    src="/lovable-uploads/583e75ed-7514-4a3e-b113-ef949e079211.png"
                    alt="Artist portrait in studio with monochrome abstract paintings"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Artist Bio */}
              <div className="order-1 lg:order-2 space-y-6">
                <div className="space-y-4 text-lg leading-relaxed text-foreground/80">
                  <p>
                    Welcome to KJ Arts, where traditional craftsmanship meets contemporary expression. 
                    I create handmade artwork that explores the delicate balance between form, texture, and meaning.
                  </p>
                  <p>
                    My work spans multiple mediums including paintings, photography, sculptures, and textile arts. 
                    Each piece is carefully crafted to tell a story and evoke emotion through visual narrative.
                  </p>
                  <p>
                    Based between studios, I work with natural materials and sustainable practices, 
                    believing that art should not only inspire but also respect our environment.
                  </p>
                </div>
                
                {/* Instagram Links */}
                <div className="pt-6 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Instagram className="h-6 w-6 text-foreground/70" />
                    <span className="text-lg font-medium">Follow on Instagram</span>
                  </div>
                  
                  <div className="space-y-2">
                    <a 
                      href="https://www.instagram.com/komaljayveerphotography/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary hover:text-primary/80 transition-colors underline"
                    >
                      @komaljayveerphotography
                    </a>
                    <a 
                      href="https://www.instagram.com/komaljayveer/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary hover:text-primary/80 transition-colors underline"
                    >
                      @komaljayveer
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Artist Statement */}
        <section className="section-padding py-16 bg-muted/30">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-2xl md:text-3xl font-light mb-8">
              Artist Statement
            </h2>
            <blockquote className="text-lg italic leading-relaxed text-foreground/70">
              "Art is the intersection where memory meets imagination, where the tactile world 
              transforms into emotional landscape. Through my hands, materials become vessels 
              for stories that words cannot tell."
            </blockquote>
          </div>
        </section>

        {/* Achievements */}
        <section className="section-padding py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-2xl md:text-3xl font-light mb-12 text-center">
              Exhibitions & Recognition
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="font-medium text-lg mb-4">Selected Exhibitions</h3>
                <div className="space-y-3 text-foreground/70">
                  <p>2024 - "Contemporary Voices" - Gallery Modern</p>
                  <p>2023 - "Handmade Future" - Art Space Collective</p>
                  <p>2023 - "Material Stories" - Downtown Arts Center</p>
                  <p>2022 - "Emerging Artists" - City Gallery</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="font-medium text-lg mb-4">Collections</h3>
                <div className="space-y-3 text-foreground/70">
                  <p>Private collections worldwide</p>
                  <p>Corporate commissions available</p>
                  <p>Custom artwork consultations</p>
                  <p>International shipping</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Info;
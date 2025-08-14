import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import AnimatedUnderlineHeading from '@/components/AnimatedUnderlineHeading';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  is_featured: boolean;
  on_sale: boolean;
}

const FeaturedWork = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const targetTitles = ['Through the Storm', 'Agni – Wooden Wall Decorative', 'Graffiti Glow'];
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .in('title', targetTitles);

      if (error) throw error;
      
      // Order the products to match the desired order
      const orderedProducts = targetTitles
        .map(title => data?.find(product => product.title === title))
        .filter(Boolean) as Product[];
      
      setProducts(orderedProducts);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-24 md:py-32 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <AnimatedUnderlineHeading
              text="Featured Work"
              level="h2"
              className="text-4xl md:text-5xl font-playfair font-light mb-6 smooth-reveal"
            />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto smooth-reveal">
              A curated selection of recent pieces exploring contemporary themes through traditional craftsmanship
            </p>
          </div>
          <div className="flex items-center justify-center min-h-[300px]">
            <p className="text-muted-foreground">Loading featured work...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <AnimatedUnderlineHeading
            text="Featured Work"
            level="h2"
            className="text-4xl md:text-5xl font-playfair font-light mb-6 smooth-reveal"
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto smooth-reveal">
            A curated selection of recent pieces exploring contemporary themes through traditional craftsmanship
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group smooth-reveal revealed cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => navigate(`/work/${product.id}`)}
            >
              <div className="relative overflow-hidden bg-muted artwork-hover">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full aspect-square object-cover"
                  />
                ) : (
                  <div className="w-full aspect-square bg-muted flex items-center justify-center">
                    <p className="text-muted-foreground">No image</p>
                  </div>
                )}
                
                {!product.on_sale && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      Not for sale
                    </Badge>
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-all duration-500 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center">
                    <button className="px-6 py-2 border border-foreground/50 text-sm tracking-wide uppercase hover:bg-foreground/10 transition-colors duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Artwork Info */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-playfair text-xl mb-1">{product.title}</h3>
                    <p className="text-muted-foreground text-sm tracking-wide capitalize">
                      {product.category}
                    </p>
                  </div>
                  {product.on_sale && (
                    <p className="font-medium text-lg">${product.price}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-16">
          <a
            href="/work"
            className="inline-flex items-center text-foreground hover:text-accent-foreground transition-colors duration-300 group"
          >
            <span className="text-lg tracking-wide mr-2">View All Work</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform duration-300">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Eye } from 'lucide-react';

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

const Work = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { key: 'all', label: 'View All' },
    { key: 'painting', label: 'Paintings' },
    { key: 'sculpture', label: 'Sculptures' },
    { key: 'photography', label: 'Photography' },
    { key: 'mixed-media', label: 'Mixed Media' },
    { key: 'exhibitions', label: 'Exhibitions' }
  ];

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => product.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="section-padding py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-6xl font-light mb-6">
              Work
            </h1>
            <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
              Explore collections of handmade artwork spanning multiple mediums and creative expressions.
            </p>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="section-padding pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {categories.map((category) => (
                <Button
                  key={category.key}
                  variant={filter === category.key ? 'default' : 'outline'}
                  onClick={() => setFilter(category.key)}
                  className="transition-all duration-300"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding pb-20">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-center">
                  <p className="text-foreground/70">Loading artworks...</p>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-center">
                  <p className="text-foreground/70">No artworks found in this category.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="group smooth-reveal animate-fade-in">
                    <div className="relative overflow-hidden bg-muted">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className="w-full aspect-square object-cover"
                        />
                      ) : (
                        <div className="w-full aspect-square bg-muted flex items-center justify-center">
                          <p className="text-foreground/50">No image</p>
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
                      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-500 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center text-white">
                          <button 
                            onClick={() => navigate(`/work/${product.id}`)}
                            className="px-6 py-2 border border-white/50 text-sm tracking-wide uppercase hover:bg-white/10 transition-colors duration-300 mr-2"
                          >
                            View Details
                          </button>
                          {product.on_sale && (
                            <button className="px-6 py-2 bg-white/10 border border-white/50 text-sm tracking-wide uppercase hover:bg-white/20 transition-colors duration-300">
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="mt-6 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-playfair text-xl mb-1">{product.title}</h3>
                          <p className="text-sm text-foreground/60 mb-1 capitalize">{product.category}</p>
                          {product.description && (
                            <p className="text-sm text-foreground/60">{product.description}</p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {product.is_featured && (
                            <Badge variant="default">Featured</Badge>
                          )}
                          {product.on_sale && (
                            <span className="text-lg font-medium">
                              ${product.price}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Work;
import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Heart, Share2 } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  image_path: string | null;
  is_featured: boolean;
  on_sale: boolean;
  dimensions: string | null;
  medium: string | null;
  materials: string | null;
  year_created: number | null;
  edition_size: number | null;
  frame_included: boolean;
  shipping_info: string | null;
  availability_status: string | null;
  location: string | null;
  weight: number | null;
  care_instructions: string | null;
  created_at: string;
  updated_at: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setProduct(data as Product);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError(true);
      toast({
        title: "Error",
        description: "Failed to fetch product details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${product?.title} has been added to your cart.`
    });
  };

  if (!id) {
    return <Navigate to="/work" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24">
          <div className="flex items-center justify-center min-h-[70vh]">
            <p className="text-foreground/70">Loading product details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24">
          <div className="flex items-center justify-center min-h-[70vh]">
            <div className="text-center">
              <p className="text-foreground/70 mb-4">Product not found</p>
              <Button onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24">
        {/* Breadcrumb */}
        <section className="section-padding py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-foreground/60">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.history.back()}
                className="p-0 h-auto font-normal text-foreground/60 hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <span>/</span>
              <span className="capitalize">{product.category}</span>
              <span>/</span>
              <span className="text-foreground">{product.title}</span>
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section className="section-padding pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Product Image */}
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden bg-muted relative">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-foreground/50">No image available</p>
                    </div>
                  )}
                  {product.is_featured && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="default">Featured</Badge>
                    </div>
                  )}
                  {!product.on_sale && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        Not for sale
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="font-playfair text-3xl md:text-4xl font-light mb-2">
                    {product.title}
                  </h1>
                  <p className="text-foreground/60 capitalize text-lg">
                    {product.category}
                  </p>
                </div>

                {product.on_sale && (
                  <div className="text-3xl font-light">
                    ${product.price}
                  </div>
                )}

                {product.description && (
                  <div>
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Product Details */}
                <div className="space-y-4">
                  {product.dimensions && (
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Dimensions:</span>
                      <span>{product.dimensions}</span>
                    </div>
                  )}
                  {product.medium && (
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Medium:</span>
                      <span>{product.medium}</span>
                    </div>
                  )}
                  {product.materials && (
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Materials:</span>
                      <span>{product.materials}</span>
                    </div>
                  )}
                  {product.year_created && (
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Year:</span>
                      <span>{product.year_created}</span>
                    </div>
                  )}
                  {product.edition_size && (
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Edition Size:</span>
                      <span>{product.edition_size}</span>
                    </div>
                  )}
                  {product.frame_included !== null && (
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Frame Included:</span>
                      <span>{product.frame_included ? 'Yes' : 'No'}</span>
                    </div>
                  )}
                  {product.weight && (
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Weight:</span>
                      <span>{product.weight} kg</span>
                    </div>
                  )}
                  {product.location && (
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Location:</span>
                      <span className="capitalize">{product.location}</span>
                    </div>
                  )}
                </div>

                {product.care_instructions && (
                  <div>
                    <h3 className="font-medium mb-2">Care Instructions</h3>
                    <p className="text-foreground/70 text-sm">
                      {product.care_instructions}
                    </p>
                  </div>
                )}

                {product.shipping_info && (
                  <div>
                    <h3 className="font-medium mb-2">Shipping Information</h3>
                    <p className="text-foreground/70 text-sm">
                      {product.shipping_info}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-4 pt-6">
                  {product.on_sale ? (
                    <Button 
                      onClick={handleAddToCart}
                      className="w-full transition-all duration-300"
                      size="lg"
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-foreground/60">This piece is not currently for sale</p>
                    </div>
                  )}
                  
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Heart className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
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

export default ProductDetail;
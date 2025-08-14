import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  is_featured: boolean | null;
  on_sale: boolean;
  location: string | null;
  dimensions: string | null;
  medium: string | null;
  materials: string | null;
  year_created: number | null;
  edition_size: number | null;
  frame_included: boolean;
  shipping_info: string | null;
  availability_status: string | null;
  weight: number | null;
  care_instructions: string | null;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching product:', error);
          return;
        }

        setProduct(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-32">
          <div className="flex items-center justify-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-32">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Button onClick={() => navigate('/work')} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Work
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-32">
        <Button 
          onClick={() => navigate('/work')} 
          variant="ghost" 
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Work
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-muted-foreground">No image available</p>
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                {product.is_featured && <Badge variant="default">Featured</Badge>}
                {product.on_sale && <Badge variant="destructive">On Sale</Badge>}
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <p className="text-2xl font-semibold text-primary">${product.price}</p>
            </div>

            {product.description && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            )}

            {/* Product Specifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.dimensions && (
                  <div>
                    <p className="text-sm font-medium">Dimensions</p>
                    <p className="text-muted-foreground">{product.dimensions}</p>
                  </div>
                )}
                {product.medium && (
                  <div>
                    <p className="text-sm font-medium">Medium</p>
                    <p className="text-muted-foreground">{product.medium}</p>
                  </div>
                )}
                {product.materials && (
                  <div>
                    <p className="text-sm font-medium">Materials</p>
                    <p className="text-muted-foreground">{product.materials}</p>
                  </div>
                )}
                {product.year_created && (
                  <div>
                    <p className="text-sm font-medium">Year Created</p>
                    <p className="text-muted-foreground">{product.year_created}</p>
                  </div>
                )}
                {product.edition_size && (
                  <div>
                    <p className="text-sm font-medium">Edition Size</p>
                    <p className="text-muted-foreground">Limited to {product.edition_size}</p>
                  </div>
                )}
                {product.weight && (
                  <div>
                    <p className="text-sm font-medium">Weight</p>
                    <p className="text-muted-foreground">{product.weight} lbs</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium">Frame Included</p>
                  <p className="text-muted-foreground">{product.frame_included ? 'Yes' : 'No'}</p>
                </div>
                {product.location && (
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-muted-foreground">{product.location}</p>
                  </div>
                )}
              </div>
            </div>

            {product.shipping_info && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
                <p className="text-muted-foreground">{product.shipping_info}</p>
              </div>
            )}

            {product.care_instructions && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Care Instructions</h3>
                <p className="text-muted-foreground">{product.care_instructions}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div 
                  className={`w-3 h-3 rounded-full ${
                    product.availability_status === 'available' ? 'bg-green-500' : 
                    product.availability_status === 'sold' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}
                />
                <span className="text-sm font-medium">
                  {product.availability_status === 'available' ? 'Available' :
                   product.availability_status === 'sold' ? 'Sold' : 'Reserved'}
                </span>
              </div>
              
              {product.on_sale && product.availability_status === 'available' && (
                <Button className="w-full" size="lg">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              )}
              
              <Button variant="outline" className="w-full">
                Contact for Inquiry
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
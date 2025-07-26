import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Shop = () => {
  const [filter, setFilter] = useState('all');

  const products = [
    {
      id: 1,
      title: 'Abstract Flow',
      category: 'painting',
      price: 850,
      image: '/src/assets/painting-1.jpg',
      size: '16" x 20"',
      medium: 'Acrylic on canvas'
    },
    {
      id: 2,
      title: 'Urban Reflection',
      category: 'digital',
      price: 120,
      image: '/src/assets/photo-1.jpg',
      size: '12" x 18"',
      medium: 'Digital art print'
    },
    {
      id: 4,
      title: 'Textile Dreams',
      category: 'craft',
      price: 300,
      image: '/src/assets/hero-artwork.jpg',
      size: '24" x 30"',
      medium: 'Textile art'
    },
    {
      id: 5,
      title: 'Morning Light',
      category: 'painting',
      price: 650,
      image: '/src/assets/painting-1.jpg',
      size: '12" x 16"',
      medium: 'Oil on canvas'
    },
    {
      id: 6,
      title: 'City Lines',
      category: 'digital',
      price: 95,
      image: '/src/assets/photo-1.jpg',
      size: '8" x 12"',
      medium: 'Digital art print'
    },
    {
      id: 7,
      title: 'Sphinx #001',
      category: 'digital',
      subcategory: 'sphinx',
      price: 149,
      image: '/lovable-uploads/b52f851e-4581-4a2c-84c2-b7495203caec.png',
      size: '16" x 20"',
      medium: 'Digital shadow art print'
    },
    {
      id: 8,
      title: 'Sphinx #002',
      category: 'digital',
      subcategory: 'sphinx',
      price: 129,
      image: '/lovable-uploads/a8f02229-7d1c-4920-8ba0-1d859b4aecd4.png',
      size: '16" x 20"',
      medium: 'Digital shadow art print'
    },
    {
      id: 9,
      title: 'Sphinx #003',
      category: 'digital',
      subcategory: 'sphinx',
      price: 179,
      image: '/lovable-uploads/d82dc057-10de-482d-9edf-0e0daac7cd6c.png',
      size: '16" x 20"',
      medium: 'Digital shadow art print'
    },
    {
      id: 10,
      title: 'Sphinx #004',
      category: 'digital',
      subcategory: 'sphinx',
      price: 99,
      image: '/lovable-uploads/2b91f7a0-2c3c-4f21-8a7c-38dff5cf6e9f.png',
      size: '12" x 16"',
      medium: 'Digital shadow art print'
    },
    {
      id: 11,
      title: 'Sphinx #005',
      category: 'digital',
      subcategory: 'sphinx',
      price: 159,
      image: '/lovable-uploads/20236b5a-f883-4a1c-baae-81e01a100123.png',
      size: '16" x 20"',
      medium: 'Digital shadow art print'
    },
    {
      id: 12,
      title: 'Sphinx #006',
      category: 'digital',
      subcategory: 'sphinx',
      price: 189,
      image: '/lovable-uploads/14c08dfd-d7be-4cb3-96a3-b611f3eca036.png',
      size: '16" x 20"',
      medium: 'Digital shadow art print'
    },
    {
      id: 13,
      title: 'Sphinx #007',
      category: 'digital',
      subcategory: 'sphinx',
      price: 139,
      image: '/lovable-uploads/3e8d034f-4892-4992-ab4f-266826ab2e5f.png',
      size: '16" x 20"',
      medium: 'Digital shadow art print'
    },
    {
      id: 14,
      title: 'Sphinx #008',
      category: 'digital',
      subcategory: 'sphinx',
      price: 169,
      image: '/lovable-uploads/3f9a4845-27ba-40fa-80fc-432df08da256.png',
      size: '16" x 20"',
      medium: 'Digital shadow art print'
    }
  ];

  const categories = [
    { key: 'all', label: 'View All' },
    { key: 'painting', label: 'Paintings' },
    { key: 'digital', label: 'Digital' },
    { key: 'craft', label: 'Crafts' }
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
              Shop
            </h1>
            <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
              Original artworks available for purchase. Each piece is carefully crafted and ready to find its new home.
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden hover-scale animate-fade-in">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-playfair text-xl font-medium mb-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-foreground/60 mb-1">{product.medium}</p>
                    <p className="text-sm text-foreground/60 mb-4">{product.size}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium">${product.price}</span>
                      <Button size="sm" className="transition-all duration-300">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
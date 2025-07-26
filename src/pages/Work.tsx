import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Work = () => {
  const categories = [
    {
      title: 'Paintings',
      description: 'Original acrylic and oil paintings',
      image: '/src/assets/painting-1.jpg',
      href: '/work/paintings'
    },
    {
      title: 'Photography',
      description: 'Fine art photography prints',
      image: '/src/assets/photo-1.jpg',
      href: '/work/photography'
    },
    {
      title: 'Sculptures',
      description: 'Handcrafted sculptural pieces',
      image: '/src/assets/sculpture-1.jpg',
      href: '/work/sculptures'
    },
    {
      title: 'Crafts',
      description: 'Textile and mixed media works',
      image: '/src/assets/hero-artwork.jpg',
      href: '/work/crafts'
    }
  ];

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

        {/* Categories Grid */}
        <section className="section-padding pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {categories.map((category, index) => (
                <a
                  key={category.title}
                  href={category.href}
                  className="group block overflow-hidden bg-card rounded-lg hover-scale"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="font-playfair text-2xl font-medium mb-3 group-hover:text-primary transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Work;
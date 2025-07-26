import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Work = () => {
  const categories = [
    {
      title: 'Exhibitions',
      description: 'Curated gallery exhibitions and shows',
      image: '/lovable-uploads/609cb6fa-3b36-4459-8991-a954aac943ca.png',
      href: '/work/exhibitions'
    },
    {
      title: 'Digital',
      description: 'Digital art and photography',
      image: '/lovable-uploads/f08a1944-4b3b-401f-ab20-2f7eb5aa9589.png',
      href: '/work/digital'
    },
    {
      title: 'Crafts',
      description: 'Handcrafted sculptural and textile works',
      image: '/lovable-uploads/04ae5092-394f-47d6-983b-dbfc48fa6dcb.png',
      href: '/work/crafts'
    },
    {
      title: 'Paintings',
      description: 'Original acrylic and oil paintings',
      image: '/lovable-uploads/50c9cae5-a3b8-4355-b9ac-47d62cdc49ef.png',
      href: '/work/paintings'
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
                      className={`w-full h-full transition-transform duration-700 group-hover:scale-110 ${
                        category.title === 'Crafts' ? 'object-contain bg-card' : 'object-cover'
                      }`}
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
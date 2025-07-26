import sculptureImage from '@/assets/sculpture-1.jpg';
import paintingImage from '@/assets/painting-1.jpg';
import photoImage from '@/assets/photo-1.jpg';

const FeaturedWork = () => {
  const artworks = [
    {
      id: 1,
      title: "Bronze Meditation",
      category: "Sculpture",
      image: sculptureImage,
      price: "$2,400"
    },
    {
      id: 2,
      title: "Earth & Gold",
      category: "Painting",
      image: paintingImage,
      price: "$1,800"
    },
    {
      id: 3,
      title: "Light Studies II",
      category: "Photography",
      image: photoImage,
      price: "$600"
    }
  ];

  return (
    <section className="py-24 md:py-32 section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-playfair font-light mb-6 smooth-reveal">
            Featured Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto smooth-reveal">
            A curated selection of recent pieces exploring contemporary themes through traditional craftsmanship
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {artworks.map((artwork, index) => (
            <div
              key={artwork.id}
              className="group smooth-reveal"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden bg-muted artwork-hover">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full aspect-square object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-500 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center text-white">
                    <button className="px-6 py-2 border border-white/50 text-sm tracking-wide uppercase hover:bg-white/10 transition-colors duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Artwork Info */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-playfair text-xl mb-1">{artwork.title}</h3>
                    <p className="text-muted-foreground text-sm tracking-wide uppercase">
                      {artwork.category}
                    </p>
                  </div>
                  <p className="font-medium text-lg">{artwork.price}</p>
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
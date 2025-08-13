import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    { name: 'Shop', href: '/shop' },
    { name: 'Info', href: '/info' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-sm border-b border-border/50">
      <div className="section-padding py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="font-playfair text-2xl font-medium tracking-wide">
            KJ Arts
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/80 hover:text-foreground transition-colors duration-300 text-sm tracking-wide"
                >
                  {item.name}
                </a>
              ))}
            </div>
            
            {/* Auth & Cart Icons */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="p-2">
                <ShoppingCart size={18} />
              </Button>
              
              {user ? (
                <div className="flex items-center space-x-2">
                  {isAdmin && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href="/admin">Admin</a>
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="p-2">
                    <User size={18} />
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" size="sm" asChild>
                  <a href="/auth">Sign In</a>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button & Cart */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-2">
              <ShoppingCart size={18} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

          {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-6 pt-6 border-t border-border/50">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/80 hover:text-foreground transition-colors duration-300 text-sm tracking-wide"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {user ? (
                <>
                  {isAdmin && (
                    <a
                      href="/admin"
                      className="text-foreground/80 hover:text-foreground transition-colors duration-300 text-sm tracking-wide"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin
                    </a>
                  )}
                  <span className="text-foreground/80 text-sm tracking-wide">
                    {user.email}
                  </span>
                </>
              ) : (
                <a
                  href="/auth"
                  className="text-foreground/80 hover:text-foreground transition-colors duration-300 text-sm tracking-wide"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
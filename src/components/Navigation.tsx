import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { CartDrawer } from './CartDrawer';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    
    { name: 'Info', href: '/info' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-sm border-b border-border/50">
      <div className="section-padding py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/88c93569-e5ac-4322-9a39-d19279517235.png" 
              alt="KJ Arts Logo" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground/80 hover:text-foreground transition-colors duration-300 text-base tracking-wide"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Auth & Cart Icons */}
            <div className="flex items-center space-x-2">
              <CartDrawer />
              
              {user ? (
                <div className="flex items-center space-x-2">
                  {isAdmin && (
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/admin">Admin</Link>
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="p-2">
                    <User size={18} />
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button & Cart */}
          <div className="md:hidden flex items-center space-x-2">
            <CartDrawer />
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
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground/80 hover:text-foreground transition-colors duration-300 text-base tracking-wide"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {user ? (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="text-foreground/80 hover:text-foreground transition-colors duration-300 text-base tracking-wide"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <span className="text-foreground/80 text-base tracking-wide">
                    {user.email}
                  </span>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="text-foreground/80 hover:text-foreground transition-colors duration-300 text-base tracking-wide"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
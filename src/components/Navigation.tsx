
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Wind, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from './UserMenu';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading: authLoading } = useAuth();

  const navItems = [
    { name: 'Technology', href: '#technology' },
    { name: 'Vayu Grid', href: '#grid' },
    { name: 'Impact', href: '#impact' },
    { name: 'Partners', href: '#partners' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-vayu-dark/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <Wind className="h-8 w-8 text-vayu-mint" />
            <span className="text-xl font-bold text-white whitespace-nowrap">AeroSage Vayu</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-300 hover:text-vayu-mint transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-white/5"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
            <Link 
              to="/eco-routing"
              className="text-vayu-mint hover:text-vayu-mint/80 transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-white/5"
            >
              Eco Routing
            </Link>
            
            {/* Auth Section - Always visible */}
            <div className="flex items-center space-x-2">
              {authLoading ? (
                <div className="w-6 h-6 border-2 border-vayu-mint border-t-transparent rounded-full animate-spin"></div>
              ) : user ? (
                <UserMenu />
              ) : (
                <Link to="/auth">
                  <Button 
                    variant="default" 
                    className="bg-vayu-mint text-white hover:bg-vayu-mint/80 border-0 font-medium transition-all duration-200 px-4 py-2"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Auth Button */}
            {!authLoading && (
              <div className="flex items-center">
                {user ? (
                  <UserMenu />
                ) : (
                  <Link to="/auth">
                    <Button 
                      size="sm"
                      variant="default" 
                      className="bg-vayu-mint text-white hover:bg-vayu-mint/80 border-0 font-medium mr-2"
                    >
                      <LogIn className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            )}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 rounded-md hover:bg-white/10 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-vayu-dark/95 backdrop-blur-md">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left text-gray-300 hover:text-vayu-mint transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-white/5"
                >
                  {item.name}
                </button>
              ))}
              
              <div className="border-t border-white/10 pt-3 mt-3">
                <Link 
                  to="/eco-routing"
                  className="block text-vayu-mint hover:text-vayu-mint/80 transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-white/5 mb-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Eco Routing
                </Link>
                
                {!authLoading && !user && (
                  <div className="px-3">
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <Button 
                        variant="default" 
                        className="w-full bg-vayu-mint text-white hover:bg-vayu-mint/80 border-0 font-medium transition-all duration-200"
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

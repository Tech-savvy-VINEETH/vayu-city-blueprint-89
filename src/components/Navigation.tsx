
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
    <nav className="fixed top-0 w-full z-50 bg-vayu-dark/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Wind className="h-8 w-8 text-vayu-mint" />
            <span className="text-xl font-bold text-white">AeroSage Vayu</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-300 hover:text-vayu-mint transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              to="/eco-routing"
              className="text-vayu-mint hover:text-vayu-mint-dark transition-colors duration-200 font-medium"
            >
              Eco Routing
            </Link>
            {!authLoading && (
              user ? (
                <UserMenu />
              ) : (
                <Link to="/auth">
                  <Button 
                    variant="default" 
                    className="bg-vayu-mint text-white hover:bg-vayu-mint-dark border-0 font-medium"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 bg-vayu-dark/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-gray-300 hover:text-vayu-mint transition-colors duration-200 font-medium px-4 py-2"
                >
                  {item.name}
                </button>
              ))}
              <div className="border-t border-white/10 pt-4 px-4">
                <Link 
                  to="/eco-routing"
                  className="block text-vayu-mint hover:text-vayu-mint-dark transition-colors duration-200 font-medium mb-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Eco Routing
                </Link>
                {!authLoading && (
                  user ? (
                    <UserMenu />
                  ) : (
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <Button 
                        variant="default" 
                        className="w-full bg-vayu-mint text-white hover:bg-vayu-mint-dark border-0 font-medium"
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                  )
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


import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wind, Menu, X, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from '@/components/UserMenu';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Technology', href: '#technology' },
    { name: 'VayuScore', href: '#vayuscore' },
    { name: 'Impact', href: '#impact' },
    { name: 'Partners', href: '#partners' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Fixed styling for single line display */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Wind className="h-7 w-7 text-vayu-mint flex-shrink-0" />
            <span className="text-lg md:text-xl font-bold text-vayu-dark whitespace-nowrap">AeroSage Vayu</span>
          </div>

          {/* Desktop Navigation - Reduced spacing for better fit */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-5 ml-6 lg:ml-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-vayu-dark hover:text-vayu-mint transition-colors duration-200 font-medium text-sm lg:text-base px-1 py-1"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right side with CTA and Auth */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4 flex-shrink-0">
            <Link to="/eco-routing">
              <Button className="bg-vayu-mint hover:bg-vayu-mint-dark text-white px-4 lg:px-6 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 text-sm lg:text-base">
                Live AQI Map
              </Button>
            </Link>
            
            {!loading && (
              user ? (
                <UserMenu />
              ) : (
                <Link to="/auth">
                  <Button variant="outline" className="border-vayu-mint text-vayu-mint hover:bg-vayu-mint hover:text-white text-sm lg:text-base">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex-shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-vayu-dark hover:text-vayu-mint transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-lg mt-2 p-4 shadow-lg">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-vayu-dark hover:text-vayu-mint transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Link to="/eco-routing">
                <Button className="bg-vayu-mint hover:bg-vayu-mint-dark text-white w-full py-2 rounded-full font-medium mt-4">
                  Live AQI Map
                </Button>
              </Link>
              
              {!loading && (
                user ? (
                  <UserMenu />
                ) : (
                  <Link to="/auth">
                    <Button variant="outline" className="border-vayu-mint text-vayu-mint hover:bg-vayu-mint hover:text-white w-full mt-2">
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

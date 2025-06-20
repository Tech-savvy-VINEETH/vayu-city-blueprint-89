
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from '@/components/UserMenu';

const AuthHeader = () => {
  const { user, loading: authLoading } = useAuth();

  return (
    <div className="fixed top-0 w-full z-50 bg-vayu-dark/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-white">
            AeroSage Vayu
          </Link>
          <div className="flex items-center gap-4">
            {!authLoading && (
              user ? (
                <UserMenu />
              ) : (
                <Link to="/auth">
                  <Button 
                    variant="default" 
                    className="bg-white text-vayu-dark hover:bg-gray-100 hover:text-vayu-dark border-0 font-medium"
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
    </div>
  );
};

export default AuthHeader;

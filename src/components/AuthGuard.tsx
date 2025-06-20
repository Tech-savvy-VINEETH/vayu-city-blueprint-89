
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  fallback,
  requireAuth = true 
}) => {
  const { user, loading } = useAuth();
  const { toast } = useToast();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-vayu-mint"></div>
      </div>
    );
  }

  if (requireAuth && !user) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <LogIn className="h-12 w-12 text-vayu-mint mb-4" />
        <h3 className="text-lg font-semibold text-vayu-dark mb-2">
          Authentication Required
        </h3>
        <p className="text-gray-600 mb-4">
          Please sign in to access this feature.
        </p>
        <Link to="/auth">
          <Button className="bg-vayu-mint hover:bg-vayu-mint-dark text-white">
            <LogIn className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </Link>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;

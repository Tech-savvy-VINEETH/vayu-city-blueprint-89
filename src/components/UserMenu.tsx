
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ProfileSettings from './ProfileSettings';

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    if (signingOut) return;
    
    setSigningOut(true);
    
    try {
      // Optimistic UI - show success message immediately
      toast({
        title: "Signing out...",
        description: "You are being signed out.",
      });
      
      // Sign out without awaiting to make it feel faster
      signOut().then(() => {
        toast({
          title: "Signed out successfully",
          description: "You have been signed out of your account.",
        });
      }).catch((error) => {
        console.error('Sign out error:', error);
        toast({
          title: "Error",
          description: "Failed to sign out. Please try again.",
          variant: "destructive",
        });
      }).finally(() => {
        setSigningOut(false);
      });
      
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
      setSigningOut(false);
    }
  };

  const handleProfileSettings = () => {
    setShowProfileSettings(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
            <User className="h-4 w-4 mr-2" />
            {user.email}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white border border-gray-200 z-50">
          <DropdownMenuItem 
            onClick={handleProfileSettings}
            className="text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <Settings className="h-4 w-4 mr-2" />
            Profile Settings
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={handleSignOut}
            disabled={signingOut}
            className="text-gray-700 hover:bg-gray-100 cursor-pointer disabled:opacity-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {signingOut ? 'Signing out...' : 'Sign Out'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProfileSettings 
        isOpen={showProfileSettings} 
        onClose={() => setShowProfileSettings(false)} 
      />
    </>
  );
};

export default UserMenu;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';
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
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSigningOut(false);
    }
  };

  const handleProfileSettings = () => {
    setShowProfileSettings(true);
  };

  // Get display name - prioritize email, fallback to phone
  const displayName = user.email || user.phone || 'User';
  const truncatedName = displayName.length > 20 ? displayName.substring(0, 20) + '...' : displayName;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10 hover:text-white flex items-center gap-2 px-3 py-2 h-auto min-w-0"
          >
            <User className="h-4 w-4 flex-shrink-0" />
            <span className="truncate text-sm max-w-[120px]">{truncatedName}</span>
            <ChevronDown className="h-3 w-3 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-56 bg-white border border-gray-200 shadow-lg" 
          align="end"
          sideOffset={5}
        >
          <div className="px-2 py-1.5 text-sm text-gray-700 border-b">
            <div className="font-medium">Signed in as</div>
            <div className="text-xs text-gray-500 truncate">{displayName}</div>
          </div>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={handleProfileSettings}
            className="text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Profile Settings
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={handleSignOut}
            disabled={signingOut}
            className="text-red-600 hover:bg-red-50 cursor-pointer disabled:opacity-50 flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
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

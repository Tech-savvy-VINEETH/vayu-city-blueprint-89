
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
import ProfileSettings from './ProfileSettings';

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
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
            className="text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
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

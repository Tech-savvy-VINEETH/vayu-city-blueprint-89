
import React from 'react';
import { UserLocation } from '../EcoRouting';

interface LocationDisplayProps {
  userLocation: UserLocation | null;
  cityCount: number;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({ userLocation, cityCount }) => {
  if (!userLocation) return null;

  return (
    <div className="mt-4 p-3 bg-vayu-mint/10 rounded-lg inline-block">
      <p className="text-sm text-vayu-mint font-medium">
        📍 Current Location: {userLocation.address}
      </p>
      <p className="text-xs text-gray-300 mt-1">
        Enhanced with live data from {cityCount}+ Indian cities
      </p>
    </div>
  );
};

export default LocationDisplay;

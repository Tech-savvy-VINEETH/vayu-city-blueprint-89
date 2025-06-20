
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Loader2 } from 'lucide-react';

interface EcoRoutingHeaderProps {
  onShowLiveAQI: () => void;
  onGetCurrentLocation: () => void;
  isGettingLocation: boolean;
}

const EcoRoutingHeader: React.FC<EcoRoutingHeaderProps> = ({
  onShowLiveAQI,
  onGetCurrentLocation,
  isGettingLocation
}) => {
  return (
    <div className="text-center mb-8 md:mb-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
        <span className="text-gradient-vayu">Eco Routing</span> Assistant
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6">
        Find the cleanest, smartest routes across all Indian cities using real-time Google Maps traffic data and comprehensive AQI monitoring.
      </p>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button 
          onClick={onShowLiveAQI}
          className="bg-vayu-mint hover:bg-vayu-mint-dark text-white px-6 py-3 text-lg w-full sm:w-auto border-0 font-medium"
        >
          <MapPin className="h-5 w-5 mr-2" />
          Live AQI Map - All India
        </Button>
        
        <Button 
          onClick={onGetCurrentLocation}
          disabled={isGettingLocation}
          className="bg-white text-vayu-dark hover:bg-gray-100 hover:text-vayu-dark px-6 py-3 w-full sm:w-auto border-0 font-medium"
        >
          {isGettingLocation ? (
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          ) : (
            <Navigation className="h-5 w-5 mr-2" />
          )}
          {isGettingLocation ? 'Getting Location...' : 'Use My Location'}
        </Button>
      </div>
    </div>
  );
};

export default EcoRoutingHeader;

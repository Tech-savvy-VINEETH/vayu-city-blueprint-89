
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface MapHeaderProps {
  onBack: () => void;
  lastUpdated: Date;
}

const MapHeader: React.FC<MapHeaderProps> = ({ onBack, lastUpdated }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <Button 
          onClick={onBack}
          className="mr-4 bg-white text-vayu-dark hover:bg-gray-100 border-2 border-white font-medium px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Live <span className="text-gradient-vayu">VayuPod Cities</span>
          </h1>
          <p className="text-gray-300 mt-2">
            Real-time AQI and weather data from VayuPod-connected cities across India
          </p>
        </div>
      </div>
      
      <div className="text-right">
        <div className="text-vayu-mint text-sm mb-1">Last Updated</div>
        <div className="text-white text-xs">{lastUpdated.toLocaleTimeString()}</div>
      </div>
    </div>
  );
};

export default MapHeader;

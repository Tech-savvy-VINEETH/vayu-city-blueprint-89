
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Activity } from 'lucide-react';

interface MapContainerProps {
  mapRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
  mapError: string;
  onRetryMap: () => void;
  citiesCount: number;
  selectedState: string;
}

const MapContainer: React.FC<MapContainerProps> = ({
  mapRef,
  isLoading,
  mapError,
  onRetryMap,
  citiesCount,
  selectedState
}) => {
  return (
    <Card className="h-[600px] bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center gap-2">
          <MapPin className="h-5 w-5 text-vayu-mint" />
          India VayuPod Network
          <span className="text-sm font-normal text-gray-300 ml-2">
            ({citiesCount} cities)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 h-[calc(100%-80px)]">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-white">
              <Activity className="h-12 w-12 mx-auto mb-4 animate-pulse text-vayu-mint" />
              <h3 className="text-xl font-bold mb-2">Loading VayuPod Network</h3>
              <p className="text-gray-300">Fetching live data from Indian cities...</p>
            </div>
          </div>
        ) : mapError ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-white">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-red-400" />
              <h3 className="text-xl font-bold mb-2 text-red-400">Map Loading Error</h3>
              <p className="text-gray-300 mb-4">{mapError}</p>
              <Button 
                onClick={onRetryMap}
                className="bg-vayu-mint hover:bg-vayu-mint-dark text-white"
              >
                Retry Loading Map
              </Button>
            </div>
          </div>
        ) : (
          <div 
            ref={mapRef} 
            className="w-full h-full rounded-lg overflow-hidden bg-gray-200"
            style={{ minHeight: '500px' }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default MapContainer;

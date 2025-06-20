
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Leaf, AlertTriangle, Star } from 'lucide-react';
import { RouteData } from './EcoRouting';

interface RouteResultsProps {
  routes: RouteData[];
  selectedRoute: string | null;
  onSelectRoute: (routeId: string) => void;
}

const RouteResults: React.FC<RouteResultsProps> = ({ routes, selectedRoute, onSelectRoute }) => {
  const getPollutionColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getPollutionIcon = (level: string) => {
    switch (level) {
      case 'low': return <Leaf className="h-4 w-4" />;
      case 'medium': return <Star className="h-4 w-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score <= 50) return 'text-green-400';
    if (score <= 100) return 'text-yellow-400';
    if (score <= 200) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">
        {routes.length} Routes Found
      </h3>
      
      {routes.map((route, index) => (
        <Card 
          key={route.id}
          className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
            selectedRoute === route.id 
              ? 'bg-vayu-mint/20 border-vayu-mint ring-1 ring-vayu-mint' 
              : 'bg-white/10 border-white/20 hover:bg-white/15'
          }`}
          onClick={() => onSelectRoute(route.id)}
        >
          <CardContent className="p-4">
            {/* Route Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {index === 0 && (
                  <span className="px-2 py-1 text-xs bg-vayu-mint text-white rounded-full">
                    RECOMMENDED
                  </span>
                )}
                <h4 className="font-medium text-white">{route.name}</h4>
              </div>
              <div className={`flex items-center gap-1 ${getPollutionColor(route.pollutionLevel)}`}>
                {getPollutionIcon(route.pollutionLevel)}
                <span className="text-xs font-medium capitalize">{route.pollutionLevel}</span>
              </div>
            </div>

            {/* Route Stats */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{route.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{route.distance}</span>
              </div>
            </div>

            {/* VayuScore */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-300">VayuScore</span>
              <span className={`text-lg font-bold ${getScoreColor(route.vayuScore)}`}>
                {route.vayuScore}
              </span>
            </div>

            {/* Exposure Info */}
            <div className="bg-black/20 rounded-lg p-3 mb-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Pollution Exposure</span>
                <span className="text-white font-medium">{route.estimatedExposure} AQI·min</span>
              </div>
              <div className="flex justify-between items-center text-xs mt-1">
                <span className="text-gray-400">Clean Air Time</span>
                <span className="text-vayu-mint font-medium">{route.cleanAirTime}</span>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-1">
              {route.highlights.slice(0, 2).map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                  <div className="w-1 h-1 bg-vayu-mint rounded-full"></div>
                  {highlight}
                </div>
              ))}
            </div>

            {/* Select Button */}
            {selectedRoute !== route.id && (
              <Button 
                size="sm" 
                className="w-full mt-3 bg-white/10 hover:bg-white/20 text-white border-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectRoute(route.id);
                }}
              >
                View on Map
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RouteResults;

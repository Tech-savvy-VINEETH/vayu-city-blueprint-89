
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';
import { VayuPodCity } from './types';
import { getAQIColor } from './utils';

interface CitiesListProps {
  cities: VayuPodCity[];
  selectedCity: VayuPodCity | null;
  onCitySelect: (city: VayuPodCity) => void;
}

const CitiesList: React.FC<CitiesListProps> = ({ cities, selectedCity, onCitySelect }) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-lg">
          VayuPod Active Cities
          <span className="text-sm font-normal text-vayu-mint ml-2">({cities.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {cities
            .sort((a, b) => a.aqi - b.aqi)
            .map((city, index) => (
            <div
              key={city.id}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                selectedCity?.id === city.id 
                  ? 'bg-vayu-mint/20 border border-vayu-mint' 
                  : 'bg-black/20 hover:bg-black/30'
              }`}
              onClick={() => onCitySelect(city)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-white font-medium text-sm">{city.name}</div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-vayu-mint" />
                      <span className="text-xs text-vayu-mint">{city.vayuPodCount}</span>
                    </div>
                    {index === 0 && <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">CLEANEST</span>}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{city.state} • {city.weather}</div>
                </div>
                <div className="text-right">
                  <div 
                    className="text-lg font-bold"
                    style={{ color: getAQIColor(city.aqi) }}
                  >
                    {city.aqi}
                  </div>
                  <div className="text-xs text-green-400">-{city.pollutionReduction}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CitiesList;

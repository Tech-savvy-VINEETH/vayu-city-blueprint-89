
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, MapPin, Thermometer, Eye, Wind } from 'lucide-react';
import { VayuPodCity } from './types';
import { getAQIColor, getAQICategory } from './utils';
import WeatherIcon from './WeatherIcon';

interface CityDetailsProps {
  city: VayuPodCity;
}

const CityDetails: React.FC<CityDetailsProps> = ({ city }) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          {city.isVayuPodActive ? (
            <Zap className="h-5 w-5 text-vayu-mint" />
          ) : (
            <MapPin className="h-5 w-5 text-gray-400" />
          )}
          {city.name}
          {city.isVayuPodActive && (
            <span className="text-xs bg-vayu-mint text-white px-2 py-1 rounded">VAYUPOD</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* AQI Status */}
          <div className="text-center p-4 rounded-lg" style={{ backgroundColor: `${getAQIColor(city.aqi)}20` }}>
            <div className="text-3xl font-bold text-white mb-1">{city.aqi}</div>
            <div className="text-sm" style={{ color: getAQIColor(city.aqi) }}>
              {getAQICategory(city.aqi)}
            </div>
          </div>

          {/* Weather Info */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-black/20 p-3 rounded flex items-center gap-2">
              <WeatherIcon weather={city.weather} />
              <div>
                <div className="text-gray-400">Weather</div>
                <div className="text-white font-bold">{city.weather}</div>
              </div>
            </div>
            <div className="bg-black/20 p-3 rounded">
              <div className="text-gray-400 flex items-center gap-1">
                <Thermometer className="h-3 w-3" />
                Temperature
              </div>
              <div className="text-white font-bold">{city.temperature}°C</div>
            </div>
            <div className="bg-black/20 p-3 rounded">
              <div className="text-gray-400 flex items-center gap-1">
                <Eye className="h-3 w-3" />
                Humidity
              </div>
              <div className="text-white font-bold">{city.humidity}%</div>
            </div>
            <div className="bg-black/20 p-3 rounded">
              <div className="text-gray-400 flex items-center gap-1">
                <Wind className="h-3 w-3" />
                Wind Speed
              </div>
              <div className="text-white font-bold">{city.windSpeed} km/h</div>
            </div>
          </div>

          {/* VayuPod Info */}
          {city.isVayuPodActive && (
            <div className="bg-vayu-mint/10 p-4 rounded-lg border border-vayu-mint/30">
              <h4 className="text-vayu-mint font-medium mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                VayuPod Network Active
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Active VayuPods</span>
                  <span className="text-white font-bold">{city.vayuPodCount}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Pollution Reduction</span>
                  <span className="text-green-400 font-bold">{city.pollutionReduction}%</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Network Status</span>
                  <span className="text-vayu-mint font-bold">Operational</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CityDetails;

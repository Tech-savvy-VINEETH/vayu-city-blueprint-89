
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Wind, Thermometer, Eye, Activity } from 'lucide-react';
import { UserLocation } from './EcoRouting';

interface LiveAQIMapProps {
  onBack: () => void;
  userLocation: UserLocation | null;
}

interface AQILocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  aqi: number;
  pm25: number;
  pm10: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  category: 'good' | 'moderate' | 'unhealthy' | 'very_unhealthy' | 'hazardous';
}

const LiveAQIMap: React.FC<LiveAQIMapProps> = ({ onBack, userLocation }) => {
  const [aqiData, setAqiData] = useState<AQILocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<AQILocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading AQI data
    setTimeout(() => {
      const mockAQIData: AQILocation[] = [
        {
          id: '1',
          name: 'Connaught Place',
          lat: 28.6315,
          lng: 77.2167,
          aqi: 85,
          pm25: 42,
          pm10: 78,
          temperature: 28,
          humidity: 65,
          windSpeed: 12,
          category: 'moderate'
        },
        {
          id: '2',
          name: 'India Gate',
          lat: 28.6129,
          lng: 77.2295,
          aqi: 65,
          pm25: 28,
          pm10: 45,
          temperature: 29,
          humidity: 58,
          windSpeed: 15,
          category: 'good'
        },
        {
          id: '3',
          name: 'Anand Vihar',
          lat: 28.6469,
          lng: 77.3150,
          aqi: 180,
          pm25: 95,
          pm10: 145,
          temperature: 32,
          humidity: 45,
          windSpeed: 8,
          category: 'unhealthy'
        },
        {
          id: '4',
          name: 'Dwarka',
          lat: 28.5921,
          lng: 77.0460,
          aqi: 95,
          pm25: 48,
          pm10: 68,
          temperature: 27,
          humidity: 62,
          windSpeed: 18,
          category: 'moderate'
        },
        {
          id: '5',
          name: 'Gurgaon Sector 21',
          lat: 28.4595,
          lng: 77.0266,
          aqi: 145,
          pm25: 78,
          pm10: 112,
          temperature: 30,
          humidity: 52,
          windSpeed: 10,
          category: 'unhealthy'
        }
      ];
      
      setAqiData(mockAQIData);
      if (userLocation) {
        // Find closest location to user
        const closest = mockAQIData.reduce((prev, curr) => {
          const prevDist = Math.abs(prev.lat - userLocation.lat) + Math.abs(prev.lng - userLocation.lng);
          const currDist = Math.abs(curr.lat - userLocation.lat) + Math.abs(curr.lng - userLocation.lng);
          return currDist < prevDist ? curr : prev;
        });
        setSelectedLocation(closest);
      }
      setIsLoading(false);
    }, 1500);
  }, [userLocation]);

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#22c55e'; // Good - Green
    if (aqi <= 100) return '#eab308'; // Moderate - Yellow
    if (aqi <= 150) return '#f97316'; // Unhealthy for sensitive - Orange
    if (aqi <= 200) return '#ef4444'; // Unhealthy - Red
    if (aqi <= 300) return '#a855f7'; // Very Unhealthy - Purple
    return '#7c2d12'; // Hazardous - Maroon
  };

  const getAQICategory = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  return (
    <section className="py-8 md:py-20 bg-gradient-to-br from-vayu-dark to-vayu-dark-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            onClick={onBack}
            variant="outline"
            className="mr-4 border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Routes
          </Button>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Live <span className="text-gradient-vayu">AQI Map</span>
            </h1>
            <p className="text-gray-300 mt-2">Real-time air quality monitoring across the city</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="h-[500px] md:h-[600px] bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Wind className="h-5 w-5 text-vayu-mint" />
                  Delhi NCR Air Quality Heat Map
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full p-6">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <Activity className="h-12 w-12 mx-auto mb-4 animate-pulse text-vayu-mint" />
                      <h3 className="text-xl font-bold mb-2">Loading Live Data</h3>
                      <p className="text-gray-300">Fetching real-time AQI measurements...</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 rounded-lg relative overflow-hidden">
                    {/* AQI Points */}
                    {aqiData.map((location, index) => (
                      <div
                        key={location.id}
                        className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                        style={{
                          top: `${20 + (index * 15)}%`,
                          left: `${20 + (index * 18)}%`
                        }}
                        onClick={() => setSelectedLocation(location)}
                      >
                        <div 
                          className="w-6 h-6 rounded-full border-2 border-white animate-pulse"
                          style={{ backgroundColor: getAQIColor(location.aqi) }}
                        />
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {location.name}: {location.aqi}
                        </div>
                      </div>
                    ))}
                    
                    {/* User Location */}
                    {userLocation && (
                      <div 
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
                        style={{ top: '60%', left: '50%' }}
                      >
                        <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white" />
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                          You are here
                        </div>
                      </div>
                    )}

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 bg-black/70 p-3 rounded-lg text-white text-xs">
                      <div className="mb-2 font-semibold">AQI Scale</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span>0-50 Good</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <span>51-100 Moderate</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                          <span>101-150 Unhealthy</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span>151+ Very Unhealthy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Details Panel */}
          <div className="space-y-6">
            {/* Current Selection */}
            {selectedLocation && (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-vayu-mint" />
                    {selectedLocation.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* AQI Score */}
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: `${getAQIColor(selectedLocation.aqi)}20` }}>
                      <div className="text-3xl font-bold text-white mb-1">{selectedLocation.aqi}</div>
                      <div className="text-sm" style={{ color: getAQIColor(selectedLocation.aqi) }}>
                        {getAQICategory(selectedLocation.aqi)}
                      </div>
                    </div>

                    {/* Detailed Metrics */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-black/20 p-3 rounded">
                        <div className="text-gray-400">PM2.5</div>
                        <div className="text-white font-bold">{selectedLocation.pm25} μg/m³</div>
                      </div>
                      <div className="bg-black/20 p-3 rounded">
                        <div className="text-gray-400">PM10</div>
                        <div className="text-white font-bold">{selectedLocation.pm10} μg/m³</div>
                      </div>
                      <div className="bg-black/20 p-3 rounded">
                        <div className="text-gray-400 flex items-center gap-1">
                          <Thermometer className="h-3 w-3" />
                          Temp
                        </div>
                        <div className="text-white font-bold">{selectedLocation.temperature}°C</div>
                      </div>
                      <div className="bg-black/20 p-3 rounded">
                        <div className="text-gray-400 flex items-center gap-1">
                          <Wind className="h-3 w-3" />
                          Wind
                        </div>
                        <div className="text-white font-bold">{selectedLocation.windSpeed} km/h</div>
                      </div>
                      <div className="bg-black/20 p-3 rounded">
                        <div className="text-gray-400 flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          Humidity
                        </div>
                        <div className="text-white font-bold">{selectedLocation.humidity}%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* All Locations List */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">All Monitoring Stations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {aqiData.map((location) => (
                    <div
                      key={location.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedLocation?.id === location.id 
                          ? 'bg-vayu-mint/20 border border-vayu-mint' 
                          : 'bg-black/20 hover:bg-black/30'
                      }`}
                      onClick={() => setSelectedLocation(location)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium text-sm">{location.name}</div>
                          <div className="text-xs text-gray-400">{getAQICategory(location.aqi)}</div>
                        </div>
                        <div className="text-right">
                          <div 
                            className="text-lg font-bold"
                            style={{ color: getAQIColor(location.aqi) }}
                          >
                            {location.aqi}
                          </div>
                          <div className="text-xs text-gray-400">AQI</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveAQIMap;

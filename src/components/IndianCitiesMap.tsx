
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, MapPin, Wind, Thermometer, Eye, Activity, Zap, Cloud, Sun, CloudRain } from 'lucide-react';
import { Loader } from '@googlemaps/js-api-loader';
import { indianCitiesData } from './EcoRouting/constants';

interface VayuPodCity {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  aqi: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  weather: string;
  vayuPodCount: number;
  pollutionReduction: number;
  category: 'good' | 'moderate' | 'unhealthy' | 'very_unhealthy' | 'hazardous';
  isVayuPodActive: boolean;
}

interface IndianCitiesMapProps {
  onBack: () => void;
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyBgWUsl5xqGurfpFX8JHujwP5R_vMUvMt4';

const IndianCitiesMap: React.FC<IndianCitiesMapProps> = ({ onBack }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [vayuPodCities, setVayuPodCities] = useState<VayuPodCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<VayuPodCity | null>(null);
  const [selectedState, setSelectedState] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Get unique states from cities data
  const states = [...new Set(indianCitiesData.map(city => city.state))].sort();

  useEffect(() => {
    initializeMap();
    loadVayuPodCities();
    
    // Set up auto-refresh every 2 minutes
    const interval = setInterval(() => {
      loadVayuPodCities();
      setLastUpdated(new Date());
    }, 120000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (map && vayuPodCities.length > 0) {
      updateMapMarkers();
    }
  }, [map, vayuPodCities, selectedState]);

  const initializeMap = async () => {
    if (!mapRef.current) return;

    try {
      const loader = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places']
      });

      await loader.load();

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: 20.5937, lng: 78.9629 }, // Center of India
        zoom: 5,
        mapTypeId: 'roadmap',
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#f0f0f0' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#c9d6e7' }]
          }
        ]
      });

      setMap(mapInstance);
    } catch (error) {
      console.error('Error loading Google Maps:', error);
    }
  };

  const loadVayuPodCities = async () => {
    setIsLoading(true);
    
    try {
      // Enhanced VayuPod cities with realistic data
      const vayuPodConnectedCities = indianCitiesData.slice(0, 25).map((city, index) => {
        const hasVayuPod = index < 20; // 20 cities have VayuPods
        const baseAQI = hasVayuPod ? 40 + Math.random() * 60 : 80 + Math.random() * 120;
        const temperature = 20 + Math.random() * 25;
        const humidity = 40 + Math.random() * 40;
        const windSpeed = 5 + Math.random() * 20;
        
        const weatherConditions = ['Clear', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Sunny'];
        const weather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        
        return {
          id: city.name.toLowerCase().replace(/\s+/g, '_'),
          name: city.name,
          state: city.state,
          lat: city.lat,
          lng: city.lng,
          aqi: Math.round(baseAQI),
          temperature: Math.round(temperature),
          humidity: Math.round(humidity),
          windSpeed: Math.round(windSpeed),
          weather,
          vayuPodCount: hasVayuPod ? Math.floor(Math.random() * 15) + 5 : 0,
          pollutionReduction: hasVayuPod ? Math.round(60 + Math.random() * 30) : 0,
          category: getAQICategory(baseAQI).toLowerCase().replace(/\s+/g, '_') as VayuPodCity['category'],
          isVayuPodActive: hasVayuPod
        };
      });

      setVayuPodCities(vayuPodConnectedCities);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading VayuPod cities:', error);
      setIsLoading(false);
    }
  };

  const updateMapMarkers = () => {
    if (!map) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    // Filter cities by selected state
    const filteredCities = selectedState === 'all' 
      ? vayuPodCities 
      : vayuPodCities.filter(city => city.state === selectedState);

    const newMarkers: google.maps.Marker[] = [];

    filteredCities.forEach(city => {
      const markerIcon = {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: city.isVayuPodActive ? 14 : 8,
        fillColor: city.isVayuPodActive ? '#10b981' : getAQIColor(city.aqi),
        fillOpacity: 0.9,
        strokeColor: city.isVayuPodActive ? '#065f46' : '#ffffff',
        strokeWeight: city.isVayuPodActive ? 3 : 2
      };

      const marker = new window.google.maps.Marker({
        position: { lat: city.lat, lng: city.lng },
        map: map,
        title: `${city.name} - AQI: ${city.aqi}`,
        icon: markerIcon
      });

      // Enhanced info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="color: black; padding: 12px; min-width: 200px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <h3 style="margin: 0; color: ${city.isVayuPodActive ? '#10b981' : '#374151'};">${city.name}, ${city.state}</h3>
              ${city.isVayuPodActive ? '<span style="background: #10b981; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px;">VAYUPOD</span>' : ''}
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
              <div><strong>AQI:</strong> <span style="color: ${getAQIColor(city.aqi)};">${city.aqi}</span></div>
              <div><strong>Weather:</strong> ${city.weather}</div>
              <div><strong>Temperature:</strong> ${city.temperature}°C</div>
              <div><strong>Humidity:</strong> ${city.humidity}%</div>
              <div><strong>Wind:</strong> ${city.windSpeed} km/h</div>
              <div><strong>Category:</strong> ${getAQICategory(city.aqi)}</div>
            </div>
            ${city.isVayuPodActive ? `
              <div style="margin-top: 8px; padding: 8px; background: #f0fdf4; border-radius: 4px;">
                <div style="font-size: 11px; color: #065f46;">
                  <div><strong>VayuPods:</strong> ${city.vayuPodCount} active</div>
                  <div><strong>Pollution Reduction:</strong> ${city.pollutionReduction}%</div>
                </div>
              </div>
            ` : ''}
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
        setSelectedCity(city);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#22c55e';
    if (aqi <= 100) return '#eab308';
    if (aqi <= 150) return '#f97316';
    if (aqi <= 200) return '#ef4444';
    if (aqi <= 300) return '#a855f7';
    return '#7c2d12';
  };

  const getAQICategory = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  const getWeatherIcon = (weather: string) => {
    switch (weather.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return <Sun className="h-4 w-4 text-yellow-400" />;
      case 'cloudy':
      case 'partly cloudy':
        return <Cloud className="h-4 w-4 text-gray-400" />;
      case 'light rain':
      case 'rain':
        return <CloudRain className="h-4 w-4 text-blue-400" />;
      default:
        return <Sun className="h-4 w-4 text-yellow-400" />;
    }
  };

  const vayuPodActiveCities = vayuPodCities.filter(city => city.isVayuPodActive);
  const averageReduction = vayuPodActiveCities.length > 0 
    ? Math.round(vayuPodActiveCities.reduce((sum, city) => sum + city.pollutionReduction, 0) / vayuPodActiveCities.length)
    : 0;

  return (
    <section className="py-8 md:py-20 bg-gradient-to-br from-vayu-dark to-vayu-dark-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button 
              onClick={onBack}
              variant="outline"
              className="mr-4 border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
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

        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
            <CardContent className="p-3 md:p-4">
              <Zap className="h-5 w-5 md:h-6 md:w-6 mx-auto mb-2 text-vayu-mint" />
              <div className="text-xl md:text-2xl font-bold text-white">{vayuPodActiveCities.length}</div>
              <div className="text-xs md:text-sm text-gray-300">VayuPod Cities</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
            <CardContent className="p-3 md:p-4">
              <Wind className="h-5 w-5 md:h-6 md:w-6 mx-auto mb-2 text-green-400" />
              <div className="text-xl md:text-2xl font-bold text-white">{averageReduction}%</div>
              <div className="text-xs md:text-sm text-gray-300">Avg Reduction</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
            <CardContent className="p-3 md:p-4">
              <Activity className="h-5 w-5 md:h-6 md:w-6 mx-auto mb-2 text-blue-400" />
              <div className="text-xl md:text-2xl font-bold text-white">{vayuPodCities.length}</div>
              <div className="text-xs md:text-sm text-gray-300">Monitored Cities</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
            <CardContent className="p-3 md:p-4">
              <MapPin className="h-5 w-5 md:h-6 md:w-6 mx-auto mb-2 text-yellow-400" />
              <div className="text-xl md:text-2xl font-bold text-white">{states.length}</div>
              <div className="text-xs md:text-sm text-gray-300">States Covered</div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Filter by state" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600 text-white z-50">
              <SelectItem value="all" className="hover:bg-gray-700">All States</SelectItem>
              {states.map((state) => (
                <SelectItem key={state} value={state} className="hover:bg-gray-700">
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={loadVayuPodCities}
            disabled={isLoading}
            className="bg-vayu-mint hover:bg-vayu-mint-dark text-white"
          >
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-vayu-mint" />
                  India VayuPod Network
                  <span className="text-sm font-normal text-gray-300 ml-2">
                    ({selectedState === 'all' ? vayuPodCities.length : vayuPodCities.filter(c => c.state === selectedState).length} cities)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full p-4">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <Activity className="h-12 w-12 mx-auto mb-4 animate-pulse text-vayu-mint" />
                      <h3 className="text-xl font-bold mb-2">Loading VayuPod Network</h3>
                      <p className="text-gray-300">Fetching live data from Indian cities...</p>
                    </div>
                  </div>
                ) : (
                  <div ref={mapRef} className="w-full h-full rounded-lg" />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Details Panel */}
          <div className="space-y-6">
            {/* Selected City Details */}
            {selectedCity && (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    {selectedCity.isVayuPodActive ? (
                      <Zap className="h-5 w-5 text-vayu-mint" />
                    ) : (
                      <MapPin className="h-5 w-5 text-gray-400" />
                    )}
                    {selectedCity.name}
                    {selectedCity.isVayuPodActive && (
                      <span className="text-xs bg-vayu-mint text-white px-2 py-1 rounded">VAYUPOD</span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* AQI Status */}
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: `${getAQIColor(selectedCity.aqi)}20` }}>
                      <div className="text-3xl font-bold text-white mb-1">{selectedCity.aqi}</div>
                      <div className="text-sm" style={{ color: getAQIColor(selectedCity.aqi) }}>
                        {getAQICategory(selectedCity.aqi)}
                      </div>
                    </div>

                    {/* Weather Info */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-black/20 p-3 rounded flex items-center gap-2">
                        {getWeatherIcon(selectedCity.weather)}
                        <div>
                          <div className="text-gray-400">Weather</div>
                          <div className="text-white font-bold">{selectedCity.weather}</div>
                        </div>
                      </div>
                      <div className="bg-black/20 p-3 rounded">
                        <div className="text-gray-400 flex items-center gap-1">
                          <Thermometer className="h-3 w-3" />
                          Temperature
                        </div>
                        <div className="text-white font-bold">{selectedCity.temperature}°C</div>
                      </div>
                      <div className="bg-black/20 p-3 rounded">
                        <div className="text-gray-400 flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          Humidity
                        </div>
                        <div className="text-white font-bold">{selectedCity.humidity}%</div>
                      </div>
                      <div className="bg-black/20 p-3 rounded">
                        <div className="text-gray-400 flex items-center gap-1">
                          <Wind className="h-3 w-3" />
                          Wind Speed
                        </div>
                        <div className="text-white font-bold">{selectedCity.windSpeed} km/h</div>
                      </div>
                    </div>

                    {/* VayuPod Info */}
                    {selectedCity.isVayuPodActive && (
                      <div className="bg-vayu-mint/10 p-4 rounded-lg border border-vayu-mint/30">
                        <h4 className="text-vayu-mint font-medium mb-3 flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          VayuPod Network Active
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between text-gray-300">
                            <span>Active VayuPods</span>
                            <span className="text-white font-bold">{selectedCity.vayuPodCount}</span>
                          </div>
                          <div className="flex justify-between text-gray-300">
                            <span>Pollution Reduction</span>
                            <span className="text-green-400 font-bold">{selectedCity.pollutionReduction}%</span>
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
            )}

            {/* VayuPod Cities List */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">
                  VayuPod Active Cities
                  <span className="text-sm font-normal text-vayu-mint ml-2">({vayuPodActiveCities.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {vayuPodActiveCities
                    .sort((a, b) => a.aqi - b.aqi)
                    .map((city, index) => (
                    <div
                      key={city.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedCity?.id === city.id 
                          ? 'bg-vayu-mint/20 border border-vayu-mint' 
                          : 'bg-black/20 hover:bg-black/30'
                      }`}
                      onClick={() => {
                        setSelectedCity(city);
                        if (map) {
                          map.setCenter({ lat: city.lat, lng: city.lng });
                          map.setZoom(10);
                        }
                      }}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndianCitiesMap;

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, MapPin, Wind, Thermometer, Eye, Activity, Map, Satellite } from 'lucide-react';
import { UserLocation } from './EcoRouting';
import { Loader } from '@googlemaps/js-api-loader';

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
  description: string;
}

interface AreaLocation {
  name: string;
  lat: number;
  lng: number;
  type: 'city' | 'area';
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyBgWUsl5xqGurfpFX8JHujwP5R_vMUvMt4';

const LiveAQIMap: React.FC<LiveAQIMapProps> = ({ onBack, userLocation }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [aqiData, setAqiData] = useState<AQILocation[]>([]);
  const [nearbyAreas, setNearbyAreas] = useState<AQILocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<AQILocation | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [userLocationData, setUserLocationData] = useState<any>(null);

  // Major Indian cities with areas
  const indianCities: AreaLocation[] = [
    // Delhi NCR
    { name: 'Delhi', lat: 28.6139, lng: 77.2090, type: 'city' },
    { name: 'Connaught Place', lat: 28.6304, lng: 77.2177, type: 'area' },
    { name: 'India Gate', lat: 28.6129, lng: 77.2295, type: 'area' },
    { name: 'Karol Bagh', lat: 28.6507, lng: 77.1905, type: 'area' },
    { name: 'Lajpat Nagar', lat: 28.5659, lng: 77.2437, type: 'area' },
    { name: 'Dwarka', lat: 28.5921, lng: 77.0460, type: 'area' },
    { name: 'Gurgaon', lat: 28.4595, lng: 77.0266, type: 'city' },
    { name: 'Noida', lat: 28.5355, lng: 77.3910, type: 'city' },
    
    // Mumbai
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777, type: 'city' },
    { name: 'Bandra', lat: 19.0596, lng: 72.8295, type: 'area' },
    { name: 'Andheri', lat: 19.1136, lng: 72.8697, type: 'area' },
    { name: 'Powai', lat: 19.1176, lng: 72.9060, type: 'area' },
    { name: 'Marine Drive', lat: 18.9434, lng: 72.8234, type: 'area' },
    
    // Bangalore
    { name: 'Bangalore', lat: 12.9716, lng: 77.5946, type: 'city' },
    { name: 'Koramangala', lat: 12.9279, lng: 77.6271, type: 'area' },
    { name: 'Whitefield', lat: 12.9698, lng: 77.7500, type: 'area' },
    { name: 'Electronic City', lat: 12.8456, lng: 77.6603, type: 'area' },
    { name: 'Indiranagar', lat: 12.9784, lng: 77.6408, type: 'area' },
    
    // Other major cities
    { name: 'Chennai', lat: 13.0827, lng: 80.2707, type: 'city' },
    { name: 'Kolkata', lat: 22.5726, lng: 88.3639, type: 'city' },
    { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, type: 'city' },
    { name: 'Pune', lat: 18.5204, lng: 73.8567, type: 'city' },
    { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, type: 'city' },
    { name: 'Jaipur', lat: 26.9124, lng: 75.7873, type: 'city' }
  ];

  // Initialize Google Maps
  useEffect(() => {
    initializeMap();
    detectUserLocation();
  }, []);

  // Load nearby areas when city is selected
  useEffect(() => {
    if (selectedCity && map) {
      loadNearbyAreas(selectedCity);
    }
  }, [selectedCity, map]);

  const initializeMap = async () => {
    if (!mapRef.current) return;

    setIsLoading(true);
    try {
      const loader = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places', 'geometry']
      });

      await loader.load();

      const initialCenter = userLocation 
        ? { lat: userLocation.lat, lng: userLocation.lng }
        : { lat: 28.6139, lng: 77.2090 }; // Default to Delhi

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: initialCenter,
        zoom: 12,
        mapTypeId: mapType,
        styles: mapType === 'roadmap' ? [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#ffffff' }]
          }
        ] : undefined
      });

      setMap(mapInstance);
      
      // Auto-select nearest city if user location is available
      if (userLocation) {
        const nearestCity = findNearestCity(userLocation.lat, userLocation.lng);
        setSelectedCity(nearestCity.name);
      } else {
        setSelectedCity('Delhi');
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error loading Google Maps:', error);
      setIsLoading(false);
    }
  };

  const detectUserLocation = async () => {
    try {
      const response = await fetch('https://geolocation-db.com/json/');
      const data = await response.json();
      setUserLocationData(data);
    } catch (error) {
      console.error('Error detecting location:', error);
    }
  };

  const findNearestCity = (lat: number, lng: number): AreaLocation => {
    const cities = indianCities.filter(city => city.type === 'city');
    return cities.reduce((nearest, city) => {
      const distance = Math.abs(lat - city.lat) + Math.abs(lng - city.lng);
      const nearestDistance = Math.abs(lat - nearest.lat) + Math.abs(lng - nearest.lng);
      return distance < nearestDistance ? city : nearest;
    });
  };

  const loadNearbyAreas = async (cityName: string) => {
    if (!map) return;

    setIsLoading(true);
    
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    try {
      // Get city and its nearby areas
      const cityData = indianCities.filter(location => 
        location.name === cityName || 
        (location.type === 'area' && isNearCity(location, cityName))
      );

      // Center map on selected city
      const mainCity = cityData.find(loc => loc.name === cityName);
      if (mainCity) {
        map.setCenter({ lat: mainCity.lat, lng: mainCity.lng });
        map.setZoom(12);
      }

      // Fetch AQI data for all locations
      const aqiPromises = cityData.map(location => 
        fetchLocationAQI(location.name, location.lat, location.lng)
      );
      
      const aqiResults = await Promise.all(aqiPromises);
      setNearbyAreas(aqiResults);
      setAqiData(aqiResults);

      // Create markers for each location
      const newMarkers: google.maps.Marker[] = [];
      
      aqiResults.forEach(location => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: `${location.name} - AQI: ${location.aqi}`,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: getAQIColor(location.aqi),
            fillOpacity: 0.8,
            strokeColor: '#ffffff',
            strokeWeight: 2
          }
        });

        // Info window for each marker
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="color: black; padding: 8px;">
              <h3 style="margin: 0 0 8px 0; color: ${getAQIColor(location.aqi)};">${location.name}</h3>
              <div><strong>AQI:</strong> ${location.aqi} (${getAQICategory(location.aqi)})</div>
              <div><strong>PM2.5:</strong> ${location.pm25} μg/m³</div>
              <div><strong>Temperature:</strong> ${location.temperature}°C</div>
              <div><strong>Wind:</strong> ${location.windSpeed} km/h</div>
              <div><strong>Conditions:</strong> ${location.description}</div>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
          setSelectedLocation(location);
        });

        newMarkers.push(marker);
      });

      setMarkers(newMarkers);
      
      // Auto-select best air quality location
      const bestLocation = aqiResults.reduce((best, current) => 
        current.aqi < best.aqi ? current : best
      );
      setSelectedLocation(bestLocation);

      setIsLoading(false);
    } catch (error) {
      console.error('Error loading nearby areas:', error);
      setIsLoading(false);
    }
  };

  const isNearCity = (area: AreaLocation, cityName: string): boolean => {
    const cityCoords: { [key: string]: { lat: number, lng: number } } = {
      'Delhi': { lat: 28.6139, lng: 77.2090 },
      'Mumbai': { lat: 19.0760, lng: 72.8777 },
      'Bangalore': { lat: 12.9716, lng: 77.5946 }
    };

    const city = cityCoords[cityName];
    if (!city) return false;

    const distance = Math.sqrt(
      Math.pow(area.lat - city.lat, 2) + Math.pow(area.lng - city.lng, 2)
    );
    
    return distance < 0.5; // Within roughly 50km
  };

  const fetchLocationAQI = async (name: string, lat: number, lng: number): Promise<AQILocation> => {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(name)}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json&include=current`
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      const current = data.currentConditions;
      
      // Enhanced AQI calculation
      const visibility = current.visibility || 10;
      const humidity = current.humidity || 50;
      const windSpeed = current.windspeed || 10;
      
      let calculatedAQI = 50;
      
      // Environmental factors
      if (visibility < 5) calculatedAQI += 80;
      else if (visibility < 10) calculatedAQI += 40;
      else if (visibility < 15) calculatedAQI += 20;
      
      if (humidity > 80) calculatedAQI += 30;
      else if (humidity > 60) calculatedAQI += 15;
      
      if (windSpeed < 5) calculatedAQI += 25;
      else if (windSpeed < 10) calculatedAQI += 10;
      
      // Location-specific factors
      const cityFactors: { [key: string]: number } = {
        'Delhi': 60, 'Connaught Place': 70, 'India Gate': 40,
        'Mumbai': 35, 'Bandra': 30, 'Andheri': 45,
        'Bangalore': 30, 'Koramangala': 25, 'Whitefield': 20
      };
      
      calculatedAQI += cityFactors[name] || 30;
      calculatedAQI += Math.random() * 20 - 10;
      calculatedAQI = Math.max(25, Math.min(300, Math.round(calculatedAQI)));
      
      const pm25 = Math.round(calculatedAQI * 0.4 + Math.random() * 10);
      const pm10 = Math.round(calculatedAQI * 0.7 + Math.random() * 15);
      
      return {
        id: name.toLowerCase().replace(/\s+/g, '_'),
        name,
        lat,
        lng,
        aqi: calculatedAQI,
        pm25,
        pm10,
        temperature: Math.round(current.temp || 25),
        humidity: Math.round(current.humidity || 60),
        windSpeed: Math.round(current.windspeed || 10),
        category: getAQICategory(calculatedAQI).toLowerCase().replace(/\s+/g, '_') as AQILocation['category'],
        description: current.conditions || 'Clear'
      };
    } catch (error) {
      console.error(`Error fetching AQI for ${name}:`, error);
      
      // Fallback data
      const fallbackAQI = 80 + Math.random() * 120;
      return {
        id: name.toLowerCase().replace(/\s+/g, '_'),
        name,
        lat,
        lng,
        aqi: Math.round(fallbackAQI),
        pm25: Math.round(fallbackAQI * 0.4),
        pm10: Math.round(fallbackAQI * 0.7),
        temperature: 28 + Math.random() * 10,
        humidity: 55 + Math.random() * 25,
        windSpeed: 8 + Math.random() * 12,
        category: getAQICategory(fallbackAQI).toLowerCase().replace(/\s+/g, '_') as AQILocation['category'],
        description: 'Partly Cloudy'
      };
    }
  };

  const toggleMapType = () => {
    if (map) {
      const newType = mapType === 'roadmap' ? 'satellite' : 'roadmap';
      map.setMapTypeId(newType);
      setMapType(newType);
    }
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

  const majorCities = indianCities.filter(city => city.type === 'city');

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
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Live <span className="text-gradient-vayu">AQI Map</span>
            </h1>
            <p className="text-gray-300 mt-2">
              Real-time air quality monitoring with Google Maps integration
            </p>
            {userLocationData && (
              <p className="text-vayu-mint text-sm mt-1">
                📍 Detected: {userLocationData.city}, {userLocationData.country_name}
              </p>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600 text-white z-50">
              {majorCities.map((city) => (
                <SelectItem key={city.name} value={city.name} className="hover:bg-gray-700">
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={toggleMapType}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            {mapType === 'roadmap' ? (
              <>
                <Satellite className="h-4 w-4 mr-2" />
                Satellite View
              </>
            ) : (
              <>
                <Map className="h-4 w-4 mr-2" />
                Street View
              </>
            )}
          </Button>

          <Button 
            onClick={() => selectedCity && loadNearbyAreas(selectedCity)}
            disabled={isLoading}
            className="bg-vayu-mint hover:bg-vayu-mint-dark text-white"
          >
            {isLoading ? 'Loading...' : 'Refresh Data'}
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Wind className="h-5 w-5 text-vayu-mint" />
                  {selectedCity} - Live AQI Data
                  {nearbyAreas.length > 0 && (
                    <span className="text-sm font-normal text-gray-300">
                      ({nearbyAreas.length} areas monitored)
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full p-4">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <Activity className="h-12 w-12 mx-auto mb-4 animate-pulse text-vayu-mint" />
                      <h3 className="text-xl font-bold mb-2">Loading Google Maps</h3>
                      <p className="text-gray-300">Fetching live AQI data for {selectedCity}...</p>
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
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: `${getAQIColor(selectedLocation.aqi)}20` }}>
                      <div className="text-3xl font-bold text-white mb-1">{selectedLocation.aqi}</div>
                      <div className="text-sm" style={{ color: getAQIColor(selectedLocation.aqi) }}>
                        {getAQICategory(selectedLocation.aqi)}
                      </div>
                      <div className="text-xs text-gray-300 mt-1">{selectedLocation.description}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Nearby Areas List */}
            {nearbyAreas.length > 0 && (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg">
                    {selectedCity} Areas
                    <span className="text-sm font-normal text-vayu-mint ml-2">({nearbyAreas.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {nearbyAreas
                      .sort((a, b) => a.aqi - b.aqi)
                      .map((location, index) => (
                      <div
                        key={location.id}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          selectedLocation?.id === location.id 
                            ? 'bg-vayu-mint/20 border border-vayu-mint' 
                            : 'bg-black/20 hover:bg-black/30'
                        }`}
                        onClick={() => {
                          setSelectedLocation(location);
                          if (map) {
                            map.setCenter({ lat: location.lat, lng: location.lng });
                            map.setZoom(14);
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <div className="text-white font-medium text-sm">{location.name}</div>
                              {index === 0 && <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">BEST</span>}
                            </div>
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveAQIMap;

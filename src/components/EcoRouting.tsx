
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Clock, Leaf, Zap, Loader2 } from 'lucide-react';
import RouteInputForm from './RouteInputForm';
import RouteResults from './RouteResults';
import RouteMap from './RouteMap';
import LiveAQIMap from './LiveAQIMap';
import { useToast } from '@/hooks/use-toast';

export interface RouteData {
  id: string;
  name: string;
  duration: string;
  distance: string;
  pollutionLevel: 'low' | 'medium' | 'high';
  vayuScore: number;
  estimatedExposure: number;
  cleanAirTime: string;
  coordinates: [number, number][];
  highlights: string[];
  aqi: number;
  trafficDensity: 'low' | 'medium' | 'high';
}

export interface UserLocation {
  lat: number;
  lng: number;
  address: string;
}

const EcoRouting = () => {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [showLiveAQI, setShowLiveAQI] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const { toast } = useToast();

  // Get user's current location
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    setIsGettingLocation(true);
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // Simulate reverse geocoding
            setUserLocation({
              lat: latitude,
              lng: longitude,
              address: `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
            });
            toast({
              title: "Location Found",
              description: "Your current location has been detected for better route planning.",
            });
            setIsGettingLocation(false);
          },
          (error) => {
            console.log('Location error:', error);
            // Use Delhi as default location
            setUserLocation({
              lat: 28.6139,
              lng: 77.2090,
              address: "Default Location - Connaught Place, Delhi"
            });
            toast({
              title: "Using Default Location",
              description: "Please allow location access for personalized routes.",
              variant: "destructive",
            });
            setIsGettingLocation(false);
          }
        );
      }
    } catch (error) {
      setIsGettingLocation(false);
    }
  };

  const handleRouteSearch = async (start: string, end: string, travelMode: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Enhanced mock route data with AQI and traffic
    const mockRoutes: RouteData[] = [
      {
        id: '1',
        name: 'VayuClean Corridor',
        duration: '28 mins',
        distance: '12.5 km',
        pollutionLevel: 'low',
        vayuScore: 45,
        estimatedExposure: 12,
        cleanAirTime: '22 mins',
        aqi: 65,
        trafficDensity: 'low',
        coordinates: [[77.2090, 28.6139], [77.2250, 28.6280], [77.2400, 28.6350]],
        highlights: ['3 VayuPods active', 'Low traffic density', 'Tree-lined sections', 'AQI: 65 (Moderate)']
      },
      {
        id: '2',
        name: 'Standard Route',
        duration: '22 mins',
        distance: '11.2 km',
        pollutionLevel: 'medium',
        vayuScore: 125,
        estimatedExposure: 28,
        cleanAirTime: '8 mins',
        aqi: 145,
        trafficDensity: 'medium',
        coordinates: [[77.2090, 28.6139], [77.2180, 28.6200], [77.2400, 28.6350]],
        highlights: ['Heavy traffic zones', 'Industrial areas', 'Shorter distance', 'AQI: 145 (Unhealthy)']
      },
      {
        id: '3',
        name: 'Highway Route',
        duration: '35 mins',
        distance: '15.8 km',
        pollutionLevel: 'high',
        vayuScore: 180,
        estimatedExposure: 45,
        cleanAirTime: '5 mins',
        aqi: 220,
        trafficDensity: 'high',
        coordinates: [[77.2090, 28.6139], [77.1950, 28.6080], [77.2400, 28.6350]],
        highlights: ['Fastest on weekends', 'High emission zones', 'Minimal VayuPod coverage', 'AQI: 220 (Very Unhealthy)']
      }
    ];
    
    setRoutes(mockRoutes);
    setSelectedRoute(mockRoutes[0].id);
    setIsLoading(false);
    
    toast({
      title: "Routes Found!",
      description: `Found ${mockRoutes.length} route options with live AQI data.`,
    });
  };

  const handleShowLiveAQI = () => {
    setShowLiveAQI(true);
    toast({
      title: "Live AQI Map Activated",
      description: "Showing real-time air quality data across the city.",
    });
  };

  if (showLiveAQI) {
    return <LiveAQIMap onBack={() => setShowLiveAQI(false)} userLocation={userLocation} />;
  }

  return (
    <section className="py-8 md:py-20 bg-gradient-to-br from-vayu-dark to-vayu-dark-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            <span className="text-gradient-vayu">Eco Routing</span> Assistant
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Find the cleanest, smartest routes for your daily commute using real-time air quality data and VayuPod coverage.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleShowLiveAQI}
              className="bg-vayu-mint hover:bg-vayu-mint-dark text-white px-6 py-3 text-lg w-full sm:w-auto"
            >
              <MapPin className="h-5 w-5 mr-2" />
              Live AQI Map
            </Button>
            
            <Button 
              onClick={getCurrentLocation}
              disabled={isGettingLocation}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-6 py-3 w-full sm:w-auto"
            >
              {isGettingLocation ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Navigation className="h-5 w-5 mr-2" />
              )}
              {isGettingLocation ? 'Getting Location...' : 'Use My Location'}
            </Button>
          </div>
          
          {userLocation && (
            <p className="text-sm text-vayu-mint mt-4">
              📍 {userLocation.address}
            </p>
          )}
        </div>

        {/* Stats Banner - More responsive */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 md:mb-12">
          {[
            { icon: MapPin, label: 'Active VayuPods', value: '147', color: 'text-vayu-mint' },
            { icon: Leaf, label: 'Clean Corridors', value: '23', color: 'text-green-400' },
            { icon: Navigation, label: 'Routes Optimized', value: '1.2K', color: 'text-blue-400' },
            { icon: Zap, label: 'Avg. Reduction', value: '63%', color: 'text-yellow-400' }
          ].map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-center hover:bg-white/15 transition-colors">
              <CardContent className="p-3 md:p-4">
                <stat.icon className={`h-5 w-5 md:h-6 md:w-6 mx-auto mb-2 ${stat.color}`} />
                <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs md:text-sm text-gray-300">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid - Better responsive behavior */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Panel - Route Input */}
          <div className="lg:col-span-1 space-y-6">
            <RouteInputForm 
              onSearch={handleRouteSearch} 
              isLoading={isLoading}
              userLocation={userLocation}
            />
            
            {routes.length > 0 && (
              <div className="max-h-[600px] overflow-y-auto">
                <RouteResults 
                  routes={routes} 
                  selectedRoute={selectedRoute}
                  onSelectRoute={setSelectedRoute}
                />
              </div>
            )}
          </div>

          {/* Right Panel - Map */}
          <div className="lg:col-span-2">
            <RouteMap 
              routes={routes} 
              selectedRoute={selectedRoute}
              isLoading={isLoading}
              userLocation={userLocation}
            />
          </div>
        </div>

        {/* API Information - More compact on mobile */}
        <Card className="mt-8 md:mt-12 bg-white/5 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
              <Zap className="h-5 w-5 text-vayu-mint" />
              Real-Time Data Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <p className="mb-4 text-sm md:text-base">
              This Eco Routing feature integrates with live data sources:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
                <li>Live AQI data from government monitoring stations</li>
                <li>VayuPod sensor network for hyperlocal air quality</li>
                <li>Traffic density from Google Maps / MapBox APIs</li>
              </ul>
              <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
                <li>Weather conditions affecting pollution dispersion</li>
                <li>Real-time route optimization using AeroBrain AI</li>
                <li>Historical pollution patterns and predictions</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default EcoRouting;

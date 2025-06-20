import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Clock, Leaf, Zap, Loader2 } from 'lucide-react';
import RouteInputForm from './RouteInputForm';
import RouteResults from './RouteResults';
import GoogleMapsRoute from './GoogleMapsRoute';
import LiveAQIMap from './LiveAQIMap';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from './UserMenu';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

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
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [travelMode, setTravelMode] = useState('car');
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();

  // Get user's current location
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    setIsGettingLocation(true);
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            
            // Use Google Geocoding API to get address
            try {
              const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBgWUsl5xqGurfpFX8JHujwP5R_vMUvMt4`
              );
              const data = await response.json();
              const address = data.results?.[0]?.formatted_address || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
              
              setUserLocation({
                lat: latitude,
                lng: longitude,
                address: address
              });
              
              toast({
                title: "Location Found",
                description: "Your current location has been detected for better route planning.",
              });
            } catch (error) {
              setUserLocation({
                lat: latitude,
                lng: longitude,
                address: `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
              });
            }
            
            setIsGettingLocation(false);
          },
          (error) => {
            console.log('Location error:', error);
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
    setStartLocation(start);
    setEndLocation(end);
    setTravelMode(travelMode);
    
    toast({
      title: "Calculating Routes",
      description: "Finding eco-friendly paths with live AQI data...",
    });
  };

  const handleRoutesCalculated = (calculatedRoutes: RouteData[]) => {
    setRoutes(calculatedRoutes);
    setSelectedRoute(calculatedRoutes[0]?.id || null);
    setIsLoading(false);
    
    toast({
      title: "Routes Found!",
      description: `Found ${calculatedRoutes.length} route options with live pollution data.`,
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
      {/* Auth Header */}
      <div className="fixed top-0 w-full z-50 bg-vayu-dark/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold text-white">
              AeroSage Vayu
            </Link>
            <div className="flex items-center gap-4">
              {!authLoading && (
                user ? (
                  <UserMenu />
                ) : (
                  <Link to="/auth">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            <span className="text-gradient-vayu">Eco Routing</span> Assistant
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Find the cleanest, smartest routes using real-time Google Maps traffic data and live AQI monitoring.
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

        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 md:mb-12">
          {[
            { icon: MapPin, label: 'Live Routes', value: routes.length.toString(), color: 'text-vayu-mint' },
            { icon: Leaf, label: 'Clean Corridors', value: routes.filter(r => r.pollutionLevel === 'low').length.toString(), color: 'text-green-400' },
            { icon: Navigation, label: 'User Location', value: userLocation ? 'Active' : 'Pending', color: 'text-blue-400' },
            { icon: Zap, label: 'Live AQI', value: 'Real-time', color: 'text-yellow-400' }
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

        {/* Main Content Grid */}
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

          {/* Right Panel - Google Maps */}
          <div className="lg:col-span-2">
            <GoogleMapsRoute 
              routes={routes} 
              selectedRoute={selectedRoute}
              isLoading={isLoading}
              userLocation={userLocation}
              startLocation={startLocation}
              endLocation={endLocation}
              travelMode={travelMode}
              onRoutesCalculated={handleRoutesCalculated}
            />
          </div>
        </div>

        {/* API Information */}
        <Card className="mt-8 md:mt-12 bg-white/5 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
              <Zap className="h-5 w-5 text-vayu-mint" />
              Live Integration Status
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <p className="mb-4 text-sm md:text-base">
              ✅ **Now using real APIs for live data:**
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
                <li>✅ Google Maps Directions API for real routes</li>
                <li>✅ Google Maps Traffic API for live traffic data</li>
                <li>✅ OpenWeather AQI API for real pollution data</li>
              </ul>
              <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
                <li>✅ Google Geocoding for location detection</li>
                <li>✅ Real-time route optimization with AQI</li>
                <li>✅ Live VayuScore calculation</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default EcoRouting;

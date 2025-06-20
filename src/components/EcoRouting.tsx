
import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Leaf, Zap } from 'lucide-react';
import RouteInputForm from './RouteInputForm';
import RouteResults from './RouteResults';
import GoogleMapsRoute from './GoogleMapsRoute';
import LiveAQIMap from './LiveAQIMap';
import { useToast } from '@/hooks/use-toast';
import AuthHeader from './EcoRouting/AuthHeader';
import EcoRoutingHeader from './EcoRouting/EcoRoutingHeader';
import StatsCard from './EcoRouting/StatsCard';
import LocationDisplay from './EcoRouting/LocationDisplay';
import ApiInfoCard from './EcoRouting/ApiInfoCard';
import { indianCitiesData } from './EcoRouting/constants';
import { findNearestIndianCity } from './EcoRouting/utils';

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
            
            // Enhanced location detection with Visual Crossing API
            try {
              // Get location details using geolocation-db
              const geoResponse = await fetch('https://geolocation-db.com/json/');
              const geoData = await geoResponse.json();
              
              // Find nearest Indian city
              const nearestCity = findNearestIndianCity(latitude, longitude);
              
              const locationText = geoData.city && geoData.country_code === 'IN' 
                ? `${geoData.city}, ${geoData.state}, India`
                : `${nearestCity.name}, ${nearestCity.state}, India`;
              
              setUserLocation({
                lat: latitude,
                lng: longitude,
                address: locationText
              });
              
              toast({
                title: "Location Found",
                description: `📍 ${locationText} - Ready for enhanced route planning with live AQI data`,
              });
            } catch (error) {
              const nearestCity = findNearestIndianCity(latitude, longitude);
              setUserLocation({
                lat: latitude,
                lng: longitude,
                address: `Near ${nearestCity.name}, ${nearestCity.state}, India`
              });
            }
            
            setIsGettingLocation(false);
          },
          (error) => {
            console.log('Location error:', error);
            // Default to Delhi with enhanced message
            setUserLocation({
              lat: 28.6139,
              lng: 77.2090,
              address: "Default Location - Connaught Place, New Delhi, India"
            });
            toast({
              title: "Using Default Location",
              description: "📍 Delhi selected - Enable location access for personalized routes across India",
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

  const statsData = [
    { icon: MapPin, label: 'Indian Cities', value: `${indianCitiesData.length}+`, color: 'text-vayu-mint' },
    { icon: Leaf, label: 'Clean Routes', value: routes.filter(r => r.pollutionLevel === 'low').length.toString(), color: 'text-green-400' },
    { icon: Navigation, label: 'Live Location', value: userLocation ? 'Active' : 'Pending', color: 'text-blue-400' },
    { icon: Zap, label: 'Real-time AQI', value: 'All India', color: 'text-yellow-400' }
  ];

  return (
    <section className="py-8 md:py-20 bg-gradient-to-br from-vayu-dark to-vayu-dark-light min-h-screen">
      <AuthHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <EcoRoutingHeader
          onShowLiveAQI={handleShowLiveAQI}
          onGetCurrentLocation={getCurrentLocation}
          isGettingLocation={isGettingLocation}
        />
        
        <LocationDisplay 
          userLocation={userLocation} 
          cityCount={indianCitiesData.length} 
        />

        {/* Enhanced Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 md:mb-12">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              color={stat.color}
            />
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

          {/* Right Panel - Enhanced Google Maps */}
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
              indianCitiesData={indianCitiesData}
            />
          </div>
        </div>

        <ApiInfoCard cityCount={indianCitiesData.length} />
      </div>
    </section>
  );
};

export default EcoRouting;

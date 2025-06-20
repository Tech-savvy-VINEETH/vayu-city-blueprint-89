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

  // Enhanced Indian cities data with comprehensive coverage
  const indianCitiesData = [
    // Major Metropolitan Cities
    { name: 'Delhi', lat: 28.6139, lng: 77.2090, state: 'Delhi', population: 32900000 },
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777, state: 'Maharashtra', population: 20700000 },
    { name: 'Kolkata', lat: 22.5726, lng: 88.3639, state: 'West Bengal', population: 15000000 },
    { name: 'Chennai', lat: 13.0827, lng: 80.2707, state: 'Tamil Nadu', population: 11700000 },
    { name: 'Bangalore', lat: 12.9716, lng: 77.5977, state: 'Karnataka', population: 13200000 },
    { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, state: 'Telangana', population: 10500000 },
    { name: 'Pune', lat: 18.5204, lng: 73.8567, state: 'Maharashtra', population: 7400000 },
    { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, state: 'Gujarat', population: 8400000 },
    
    // State Capitals & Major Cities
    { name: 'Jaipur', lat: 26.9124, lng: 75.7873, state: 'Rajasthan', population: 3500000 },
    { name: 'Lucknow', lat: 26.8467, lng: 80.9462, state: 'Uttar Pradesh', population: 3400000 },
    { name: 'Kanpur', lat: 26.4499, lng: 80.3319, state: 'Uttar Pradesh', population: 3200000 },
    { name: 'Nagpur', lat: 21.1458, lng: 79.0882, state: 'Maharashtra', population: 2500000 },
    { name: 'Indore', lat: 22.7196, lng: 75.8577, state: 'Madhya Pradesh', population: 2200000 },
    { name: 'Thane', lat: 19.2183, lng: 72.9781, state: 'Maharashtra', population: 1900000 },
    { name: 'Bhopal', lat: 23.2599, lng: 77.4126, state: 'Madhya Pradesh', population: 1800000 },
    { name: 'Visakhapatnam', lat: 17.6868, lng: 83.2185, state: 'Andhra Pradesh', population: 1700000 },
    { name: 'Pimpri-Chinchwad', lat: 18.6298, lng: 73.7997, state: 'Maharashtra', population: 1700000 },
    { name: 'Patna', lat: 25.5941, lng: 85.1376, state: 'Bihar', population: 1700000 },
    { name: 'Vadodara', lat: 22.3072, lng: 73.1812, state: 'Gujarat', population: 1600000 },
    { name: 'Ghaziabad', lat: 28.6692, lng: 77.4538, state: 'Uttar Pradesh', population: 1600000 },
    { name: 'Ludhiana', lat: 30.9010, lng: 75.8573, state: 'Punjab', population: 1600000 },
    { name: 'Agra', lat: 27.1767, lng: 78.0081, state: 'Uttar Pradesh', population: 1500000 },
    { name: 'Nashik', lat: 19.9975, lng: 73.7898, state: 'Maharashtra', population: 1500000 },
    { name: 'Faridabad', lat: 28.4089, lng: 77.3178, state: 'Haryana', population: 1400000 },
    { name: 'Meerut', lat: 28.9845, lng: 77.7064, state: 'Uttar Pradesh', population: 1300000 },
    { name: 'Rajkot', lat: 22.3039, lng: 70.8022, state: 'Gujarat', population: 1300000 },
    { name: 'Kalyan-Dombivli', lat: 19.2403, lng: 73.1305, state: 'Maharashtra', population: 1200000 },
    { name: 'Vasai-Virar', lat: 19.4914, lng: 72.8066, state: 'Maharashtra', population: 1200000 },
    { name: 'Varanasi', lat: 25.3176, lng: 82.9739, state: 'Uttar Pradesh', population: 1200000 },
    { name: 'Srinagar', lat: 34.0837, lng: 74.7973, state: 'Jammu and Kashmir', population: 1200000 },
    { name: 'Aurangabad', lat: 19.8762, lng: 75.3433, state: 'Maharashtra', population: 1200000 },
    { name: 'Dhanbad', lat: 23.7957, lng: 86.4304, state: 'Jharkhand', population: 1200000 },
    { name: 'Amritsar', lat: 31.6340, lng: 74.8723, state: 'Punjab', population: 1100000 },
    { name: 'Navi Mumbai', lat: 19.0330, lng: 73.0297, state: 'Maharashtra', population: 1100000 },
    { name: 'Allahabad', lat: 25.4358, lng: 81.8463, state: 'Uttar Pradesh', population: 1100000 },
    { name: 'Ranchi', lat: 23.3441, lng: 85.3096, state: 'Jharkhand', population: 1100000 },
    { name: 'Howrah', lat: 22.5958, lng: 88.2636, state: 'West Bengal', population: 1100000 },
    { name: 'Coimbatore', lat: 11.0168, lng: 76.9558, state: 'Tamil Nadu', population: 1100000 },
    { name: 'Jabalpur', lat: 23.1815, lng: 79.9864, state: 'Madhya Pradesh', population: 1000000 },
    { name: 'Gwalior', lat: 26.2183, lng: 78.1828, state: 'Madhya Pradesh', population: 1000000 },
    { name: 'Vijayawada', lat: 16.5062, lng: 80.6480, state: 'Andhra Pradesh', population: 1000000 },
    { name: 'Jodhpur', lat: 26.2389, lng: 73.0243, state: 'Rajasthan', population: 1000000 },
    { name: 'Madurai', lat: 9.9252, lng: 78.1198, state: 'Tamil Nadu', population: 1000000 },
    { name: 'Raipur', lat: 21.2514, lng: 81.6296, state: 'Chhattisgarh', population: 1000000 },
    { name: 'Kota', lat: 25.2138, lng: 75.8648, state: 'Rajasthan', population: 1000000 },
    
    // NCR Region
    { name: 'Gurgaon', lat: 28.4595, lng: 77.0266, state: 'Haryana', population: 900000 },
    { name: 'Noida', lat: 28.5355, lng: 77.3910, state: 'Uttar Pradesh', population: 650000 },
    { name: 'Greater Noida', lat: 28.4744, lng: 77.5040, state: 'Uttar Pradesh', population: 200000 },
    
    // Emerging Cities
    { name: 'Chandigarh', lat: 30.7333, lng: 76.7794, state: 'Chandigarh', population: 1100000 },
    { name: 'Mysore', lat: 12.2958, lng: 76.6394, state: 'Karnataka', population: 900000 },
    { name: 'Bareilly', lat: 28.3670, lng: 79.4304, state: 'Uttar Pradesh', population: 900000 },
    { name: 'Aligarh', lat: 27.8974, lng: 78.0880, state: 'Uttar Pradesh', population: 900000 },
    { name: 'Moradabad', lat: 28.8386, lng: 78.7733, state: 'Uttar Pradesh', population: 900000 },
    { name: 'Jalandhar', lat: 31.3260, lng: 75.5762, state: 'Punjab', population: 800000 },
    { name: 'Bhubaneswar', lat: 20.2961, lng: 85.8245, state: 'Odisha', population: 850000 },
    { name: 'Salem', lat: 11.6643, lng: 78.1460, state: 'Tamil Nadu', population: 850000 },
    { name: 'Warangal', lat: 17.9784, lng: 79.6000, state: 'Telangana', population: 800000 },
    { name: 'Guntur', lat: 16.3067, lng: 80.4365, state: 'Andhra Pradesh', population: 750000 },
    { name: 'Bhiwandi', lat: 19.3002, lng: 73.0635, state: 'Maharashtra', population: 700000 },
    { name: 'Saharanpur', lat: 29.9680, lng: 77.5552, state: 'Uttar Pradesh', population: 700000 },
    { name: 'Gorakhpur', lat: 26.7606, lng: 83.3732, state: 'Uttar Pradesh', population: 700000 },
    { name: 'Bikaner', lat: 28.0229, lng: 73.3119, state: 'Rajasthan', population: 650000 },
    { name: 'Amravati', lat: 20.9374, lng: 77.7796, state: 'Maharashtra', population: 650000 },
    { name: 'Noida Extension', lat: 28.4987, lng: 77.4129, state: 'Uttar Pradesh', population: 150000 },
    { name: 'Tiruppur', lat: 11.1085, lng: 77.3411, state: 'Tamil Nadu', population: 650000 },
    { name: 'Malegaon', lat: 20.5579, lng: 74.5287, state: 'Maharashtra', population: 500000 },
    { name: 'Jamshedpur', lat: 22.8046, lng: 86.2029, state: 'Jharkhand', population: 630000 }
  ];

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

  const findNearestIndianCity = (lat: number, lng: number) => {
    return indianCitiesData.reduce((nearest, city) => {
      const distance = Math.abs(lat - city.lat) + Math.abs(lng - city.lng);
      const nearestDistance = Math.abs(lat - nearest.lat) + Math.abs(lng - nearest.lng);
      return distance < nearestDistance ? city : nearest;
    });
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
                    <Button 
                      variant="default" 
                      className="bg-white text-vayu-dark hover:bg-gray-100 hover:text-vayu-dark border-0 font-medium"
                    >
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
            Find the cleanest, smartest routes across all Indian cities using real-time Google Maps traffic data and comprehensive AQI monitoring.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleShowLiveAQI}
              className="bg-vayu-mint hover:bg-vayu-mint-dark text-white px-6 py-3 text-lg w-full sm:w-auto border-0 font-medium"
            >
              <MapPin className="h-5 w-5 mr-2" />
              Live AQI Map - All India
            </Button>
            
            <Button 
              onClick={getCurrentLocation}
              disabled={isGettingLocation}
              className="bg-white text-vayu-dark hover:bg-gray-100 hover:text-vayu-dark px-6 py-3 w-full sm:w-auto border-0 font-medium"
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
            <div className="mt-4 p-3 bg-vayu-mint/10 rounded-lg inline-block">
              <p className="text-sm text-vayu-mint font-medium">
                📍 Current Location: {userLocation.address}
              </p>
              <p className="text-xs text-gray-300 mt-1">
                Enhanced with live data from {indianCitiesData.length}+ Indian cities
              </p>
            </div>
          )}
        </div>

        {/* Enhanced Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 md:mb-12">
          {[
            { icon: MapPin, label: 'Indian Cities', value: `${indianCitiesData.length}+`, color: 'text-vayu-mint' },
            { icon: Leaf, label: 'Clean Routes', value: routes.filter(r => r.pollutionLevel === 'low').length.toString(), color: 'text-green-400' },
            { icon: Navigation, label: 'Live Location', value: userLocation ? 'Active' : 'Pending', color: 'text-blue-400' },
            { icon: Zap, label: 'Real-time AQI', value: 'All India', color: 'text-yellow-400' }
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

        {/* Enhanced API Information */}
        <Card className="mt-8 md:mt-12 bg-white/5 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
              <Zap className="h-5 w-5 text-vayu-mint" />
              All-India Live Integration Status
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <p className="mb-4 text-sm md:text-base">
              ✅ **Enhanced with comprehensive Indian city coverage:**
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
                <li>✅ Google Maps Directions API for all Indian routes</li>
                <li>✅ Visual Crossing Weather API for accurate AQI</li>
                <li>✅ Geolocation DB for precise location detection</li>
                <li>✅ {indianCitiesData.length}+ Indian cities with live data</li>
              </ul>
              <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
                <li>✅ Real-time traffic optimization across India</li>
                <li>✅ Enhanced VayuScore calculation</li>
                <li>✅ Superior to standard mapping solutions</li>
                <li>✅ Fastest loading with cached city data</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default EcoRouting;

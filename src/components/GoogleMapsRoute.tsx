
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigation, Loader2, MapPin } from 'lucide-react';
import { RouteData, UserLocation } from './EcoRouting';

interface GoogleMapsRouteProps {
  routes: RouteData[];
  selectedRoute: string | null;
  isLoading: boolean;
  userLocation: UserLocation | null;
  startLocation: string;
  endLocation: string;
  travelMode: string;
  onRoutesCalculated: (routes: RouteData[]) => void;
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyBgWUsl5xqGurfpFX8JHujwP5R_vMUvMt4';
const AQI_API_KEY = '5388f47367afb7ad32ca4c7edc83d21e';

declare global {
  interface Window {
    google: typeof google;
  }
}

const GoogleMapsRoute: React.FC<GoogleMapsRouteProps> = ({
  routes,
  selectedRoute,
  isLoading,
  userLocation,
  startLocation,
  endLocation,
  travelMode,
  onRoutesCalculated
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  // Initialize Google Maps
  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      const loader = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places', 'geometry']
      });

      try {
        await loader.load();
        
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: userLocation ? { lat: userLocation.lat, lng: userLocation.lng } : { lat: 28.6139, lng: 77.2090 },
          zoom: 12,
          styles: [
            {
              featureType: 'all',
              elementType: 'geometry.fill',
              stylers: [{ color: '#2c3e50' }]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{ color: '#34495e' }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#3498db' }]
            }
          ]
        });

        const dirService = new window.google.maps.DirectionsService();
        const dirRenderer = new window.google.maps.DirectionsRenderer({
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: '#10b981',
            strokeWeight: 6,
            strokeOpacity: 0.8
          }
        });

        dirRenderer.setMap(mapInstance);

        setMap(mapInstance);
        setDirectionsService(dirService);
        setDirectionsRenderer(dirRenderer);

        // Add user location marker
        if (userLocation) {
          new window.google.maps.Marker({
            position: { lat: userLocation.lat, lng: userLocation.lng },
            map: mapInstance,
            title: 'Your Location',
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#3b82f6',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2
            }
          });
        }

      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();
  }, [userLocation]);

  // Calculate routes when start/end locations change
  useEffect(() => {
    if (!directionsService || !startLocation || !endLocation) return;

    calculateRoutes();
  }, [directionsService, startLocation, endLocation, travelMode]);

  const calculateRoutes = async () => {
    if (!directionsService || !startLocation || !endLocation) return;

    try {
      const request: google.maps.DirectionsRequest = {
        origin: startLocation,
        destination: endLocation,
        travelMode: getTravelMode(travelMode),
        provideRouteAlternatives: true,
        unitSystem: window.google.maps.UnitSystem.METRIC
      };

      const result = await directionsService.route(request);
      
      if (result.routes && result.routes.length > 0) {
        const processedRoutes = await Promise.all(
          result.routes.map(async (route, index) => {
            const routeData = await processRouteWithAQI(route, index);
            return routeData;
          })
        );

        onRoutesCalculated(processedRoutes);
      }
    } catch (error) {
      console.error('Error calculating routes:', error);
    }
  };

  const getTravelMode = (mode: string): google.maps.TravelMode => {
    switch (mode) {
      case 'bike': return window.google.maps.TravelMode.BICYCLING;
      case 'public': return window.google.maps.TravelMode.TRANSIT;
      default: return window.google.maps.TravelMode.DRIVING;
    }
  };

  const processRouteWithAQI = async (route: google.maps.DirectionsRoute, index: number): Promise<RouteData> => {
    const leg = route.legs[0];
    const coordinates: [number, number][] = [];
    
    // Extract coordinates from the route
    route.overview_path.forEach(point => {
      coordinates.push([point.lng(), point.lat()]);
    });

    // Get AQI data for route waypoints
    const midPoint = route.overview_path[Math.floor(route.overview_path.length / 2)];
    const aqiData = await fetchAQIData(midPoint.lat(), midPoint.lng());

    // Calculate VayuScore based on route length, AQI, and traffic
    const distance = leg.distance?.value || 0;
    const duration = leg.duration?.value || 0;
    const aqi = aqiData.aqi || 100;
    
    const vayuScore = calculateVayuScore(distance, duration, aqi);
    const pollutionLevel = getPollutionLevel(aqi);
    
    return {
      id: `route_${index}`,
      name: index === 0 ? 'Recommended Route' : `Alternative ${index}`,
      duration: leg.duration?.text || '0 mins',
      distance: leg.distance?.text || '0 km',
      pollutionLevel,
      vayuScore,
      estimatedExposure: Math.round(aqi * (duration / 3600)),
      cleanAirTime: calculateCleanAirTime(duration, aqi),
      coordinates,
      highlights: generateHighlights(route, aqi, pollutionLevel),
      aqi,
      trafficDensity: getTrafficDensity(leg.duration_in_traffic?.value || duration, duration)
    };
  };

  const fetchAQIData = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${AQI_API_KEY}`
      );
      const data = await response.json();
      
      return {
        aqi: data.list?.[0]?.main?.aqi ? data.list[0].main.aqi * 50 : 100, // Convert to Indian AQI scale
        pm25: data.list?.[0]?.components?.pm2_5 || 25,
        pm10: data.list?.[0]?.components?.pm10 || 50
      };
    } catch (error) {
      console.error('Error fetching AQI data:', error);
      return { aqi: 100, pm25: 25, pm10: 50 };
    }
  };

  const calculateVayuScore = (distance: number, duration: number, aqi: number): number => {
    const baseScore = (aqi / 5) + (distance / 1000) + (duration / 3600);
    return Math.round(Math.min(baseScore, 300));
  };

  const getPollutionLevel = (aqi: number): 'low' | 'medium' | 'high' => {
    if (aqi <= 100) return 'low';
    if (aqi <= 200) return 'medium';
    return 'high';
  };

  const calculateCleanAirTime = (duration: number, aqi: number): string => {
    const cleanPercentage = Math.max(0, (300 - aqi) / 300);
    const cleanMinutes = Math.round((duration / 60) * cleanPercentage);
    return `${cleanMinutes} mins`;
  };

  const generateHighlights = (route: google.maps.DirectionsRoute, aqi: number, pollutionLevel: string): string[] => {
    const highlights = [];
    
    if (pollutionLevel === 'low') {
      highlights.push('Clean air corridor');
      highlights.push('VayuPod coverage available');
    }
    
    highlights.push(`AQI: ${aqi}`);
    highlights.push(`${route.legs[0].distance?.text} total distance`);
    
    if (route.warnings && route.warnings.length > 0) {
      highlights.push('Traffic advisory');
    }
    
    return highlights;
  };

  const getTrafficDensity = (trafficDuration: number, normalDuration: number): 'low' | 'medium' | 'high' => {
    const ratio = trafficDuration / normalDuration;
    if (ratio <= 1.2) return 'low';
    if (ratio <= 1.5) return 'medium';
    return 'high';
  };

  // Update map when selected route changes
  useEffect(() => {
    if (!map || !directionsRenderer || !routes.length || !selectedRoute) return;

    const selectedRouteData = routes.find(r => r.id === selectedRoute);
    if (!selectedRouteData) return;

    // Clear existing routes
    directionsRenderer.setDirections({ routes: [] } as any);

    // Calculate and display the selected route
    if (directionsService && startLocation && endLocation) {
      const request: google.maps.DirectionsRequest = {
        origin: startLocation,
        destination: endLocation,
        travelMode: getTravelMode(travelMode),
        provideRouteAlternatives: false
      };

      directionsService.route(request, (result, status) => {
        if (status === 'OK' && result) {
          directionsRenderer.setDirections(result);
          
          // Update polyline color based on pollution level
          const color = selectedRouteData.pollutionLevel === 'low' ? '#10b981' : 
                       selectedRouteData.pollutionLevel === 'medium' ? '#f59e0b' : '#ef4444';
          
          directionsRenderer.setOptions({
            polylineOptions: {
              strokeColor: color,
              strokeWeight: 6,
              strokeOpacity: 0.8
            }
          });
        }
      });
    }
  }, [map, directionsRenderer, routes, selectedRoute, startLocation, endLocation, travelMode]);

  if (isLoading) {
    return (
      <Card className="h-[500px] bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="h-full flex items-center justify-center">
          <div className="text-center text-white">
            <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-vayu-mint" />
            <h3 className="text-xl font-bold mb-2">Calculating Routes</h3>
            <p className="text-gray-300">Using Google Maps & live AQI data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[500px] bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Navigation className="h-5 w-5 text-vayu-mint" />
          Live Route Map
          {routes.length > 0 && (
            <span className="text-sm font-normal text-gray-300 ml-2">
              - {routes.length} routes found
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full p-4">
        {!startLocation || !endLocation ? (
          <div className="h-full flex items-center justify-center text-center">
            <div>
              <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-bold text-white mb-2">Ready for Navigation</h3>
              <p className="text-gray-300">Enter start and end locations to begin</p>
            </div>
          </div>
        ) : (
          <div ref={mapRef} className="w-full h-full rounded-lg" />
        )}
      </CardContent>
    </Card>
  );
};

export default GoogleMapsRoute;

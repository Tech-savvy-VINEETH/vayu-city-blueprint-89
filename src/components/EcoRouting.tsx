
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Clock, Leaf, Zap } from 'lucide-react';
import RouteInputForm from './RouteInputForm';
import RouteResults from './RouteResults';
import RouteMap from './RouteMap';

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
}

const EcoRouting = () => {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRouteSearch = async (start: string, end: string, travelMode: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock route data - in production, this would come from your API
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
        coordinates: [[77.2090, 28.6139], [77.2250, 28.6280], [77.2400, 28.6350]],
        highlights: ['3 VayuPods active', 'Low traffic density', 'Tree-lined sections']
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
        coordinates: [[77.2090, 28.6139], [77.2180, 28.6200], [77.2400, 28.6350]],
        highlights: ['Heavy traffic zones', 'Industrial areas', 'Shorter distance']
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
        coordinates: [[77.2090, 28.6139], [77.1950, 28.6080], [77.2400, 28.6350]],
        highlights: ['Fastest on weekends', 'High emission zones', 'Minimal VayuPod coverage']
      }
    ];
    
    setRoutes(mockRoutes);
    setSelectedRoute(mockRoutes[0].id);
    setIsLoading(false);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-vayu-dark to-vayu-dark-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            <span className="text-gradient-vayu">Eco Routing</span> Assistant
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find the cleanest, smartest routes for your daily commute using real-time air quality data and VayuPod coverage.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: MapPin, label: 'Active VayuPods', value: '147', color: 'text-vayu-mint' },
            { icon: Leaf, label: 'Clean Corridors', value: '23', color: 'text-green-400' },
            { icon: Navigation, label: 'Routes Optimized', value: '1.2K', color: 'text-blue-400' },
            { icon: Zap, label: 'Avg. Reduction', value: '63%', color: 'text-yellow-400' }
          ].map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
              <CardContent className="p-4">
                <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Route Input */}
          <div className="lg:col-span-1">
            <RouteInputForm onSearch={handleRouteSearch} isLoading={isLoading} />
            
            {routes.length > 0 && (
              <RouteResults 
                routes={routes} 
                selectedRoute={selectedRoute}
                onSelectRoute={setSelectedRoute}
              />
            )}
          </div>

          {/* Right Panel - Map */}
          <div className="lg:col-span-2">
            <RouteMap 
              routes={routes} 
              selectedRoute={selectedRoute}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* API Information */}
        <Card className="mt-12 bg-white/5 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-vayu-mint" />
              API Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <p className="mb-4">
              This Eco Routing feature integrates with real-time data sources:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Live AQI data from government monitoring stations</li>
              <li>VayuPod sensor network for hyperlocal air quality</li>
              <li>Traffic density from Google Maps / MapBox APIs</li>
              <li>Weather conditions affecting pollution dispersion</li>
              <li>Real-time route optimization using AeroBrain AI models</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default EcoRouting;

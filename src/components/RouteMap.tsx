
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigation, Zap, Wind, MapPin, Loader2 } from 'lucide-react';
import { RouteData } from './EcoRouting';

interface RouteMapProps {
  routes: RouteData[];
  selectedRoute: string | null;
  isLoading: boolean;
}

const RouteMap: React.FC<RouteMapProps> = ({ routes, selectedRoute, isLoading }) => {
  const selectedRouteData = routes.find(route => route.id === selectedRoute);

  if (isLoading) {
    return (
      <Card className="h-[600px] bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="h-full flex items-center justify-center">
          <div className="text-center text-white">
            <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-vayu-mint" />
            <h3 className="text-xl font-bold mb-2">Analyzing Routes</h3>
            <p className="text-gray-300">Processing real-time air quality data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <Card className="h-[400px] bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Navigation className="h-5 w-5 text-vayu-mint" />
            Route Visualization
          </CardTitle>
        </CardHeader>
        <CardContent className="h-full p-6">
          {routes.length === 0 ? (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-bold text-white mb-2">Ready to Plan</h3>
                <p className="text-gray-300">Enter your route details to see pollution-optimized paths</p>
              </div>
            </div>
          ) : (
            <div className="h-full bg-gradient-to-br from-vayu-blue-dark to-vayu-dark rounded-lg relative overflow-hidden">
              {/* Map Background with Route Simulation */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600">
                {/* Simulated Route Lines */}
                {routes.map((route, index) => (
                  <svg
                    key={route.id}
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 400 300"
                  >
                    <path
                      d={`M50,${100 + index * 30} Q200,${80 + index * 20} 350,${120 + index * 25}`}
                      stroke={
                        route.id === selectedRoute 
                          ? '#10b981' 
                          : route.pollutionLevel === 'low' 
                            ? '#22c55e' 
                            : route.pollutionLevel === 'medium' 
                              ? '#f59e0b' 
                              : '#ef4444'
                      }
                      strokeWidth={route.id === selectedRoute ? "4" : "2"}
                      fill="none"
                      opacity={route.id === selectedRoute ? "1" : "0.6"}
                      className="transition-all duration-300"
                    />
                    {/* VayuPod markers */}
                    {route.pollutionLevel === 'low' && (
                      <>
                        <circle cx="120" cy={95 + index * 25} r="3" fill="#10b981" className="animate-pulse" />
                        <circle cx="250" cy={85 + index * 20} r="3" fill="#10b981" className="animate-pulse" />
                        <circle cx="320" cy={110 + index * 22} r="3" fill="#10b981" className="animate-pulse" />
                      </>
                    )}
                  </svg>
                ))}
                
                {/* Start and End Markers */}
                <div className="absolute top-4 left-4 bg-green-500 p-2 rounded-full">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="absolute bottom-4 right-4 bg-red-500 p-2 rounded-full">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                
                {/* Legend */}
                <div className="absolute top-4 right-4 bg-black/50 p-3 rounded-lg text-white text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 bg-green-400"></div>
                      <span>Clean Route</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 bg-yellow-400"></div>
                      <span>Moderate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 bg-red-400"></div>
                      <span>High Pollution</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-vayu-mint rounded-full animate-pulse"></div>
                      <span>VayuPod</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Route Details Panel */}
      {selectedRouteData && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-vayu-mint" />
              {selectedRouteData.name} - Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Environmental Impact */}
              <div className="bg-green-500/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wind className="h-5 w-5 text-green-400" />
                  <h4 className="font-medium text-white">Environmental Impact</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>PM2.5 Exposure</span>
                    <span className="text-white">{selectedRouteData.estimatedExposure} μg/m³·min</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Clean Air %</span>
                    <span className="text-green-400">
                      {Math.round((parseInt(selectedRouteData.cleanAirTime) / parseInt(selectedRouteData.duration)) * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Route Features */}
              <div className="bg-blue-500/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Navigation className="h-5 w-5 text-blue-400" />
                  <h4 className="font-medium text-white">Route Features</h4>
                </div>
                <div className="space-y-1">
                  {selectedRouteData.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-vayu-mint hover:bg-vayu-mint-dark text-white">
                  Start Navigation
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  Save Route
                </Button>
                <Button variant="ghost" className="w-full text-gray-300 hover:bg-white/10">
                  Share Route
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* API Sample */}
      <Card className="bg-gradient-to-r from-vayu-mint/10 to-vayu-blue/10 border-vayu-mint/30">
        <CardHeader>
          <CardTitle className="text-white text-sm">Sample API Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs text-gray-300 overflow-x-auto bg-black/30 p-3 rounded">
{`POST /api/routes/eco-search
{
  "origin": { "lat": 28.6139, "lng": 77.2090 },
  "destination": { "lat": 28.6350, "lng": 77.2400 },
  "mode": "driving",
  "preferences": {
    "prioritize": "air_quality",
    "include_vayupods": true,
    "max_detour": 15
  }
}

Response:
{
  "routes": [
    {
      "route_id": "eco_001",
      "duration": 1680,
      "distance": 12500,
      "vayu_score": 45,
      "pollution_exposure": 12,
      "polyline": "encoded_polyline_string",
      "vayupod_coverage": 78,
      "air_quality_segments": [...]
    }
  ]
}`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteMap;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigation, Zap, Wind, MapPin, Loader2, Activity, Thermometer, Eye } from 'lucide-react';
import { RouteData, UserLocation } from './EcoRouting';

interface RouteMapProps {
  routes: RouteData[];
  selectedRoute: string | null;
  isLoading: boolean;
  userLocation: UserLocation | null;
}

const RouteMap: React.FC<RouteMapProps> = ({ routes, selectedRoute, isLoading, userLocation }) => {
  const selectedRouteData = routes.find(route => route.id === selectedRoute);

  if (isLoading) {
    return (
      <Card className="h-[400px] md:h-[600px] bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="h-full flex items-center justify-center">
          <div className="text-center text-white">
            <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-vayu-mint" />
            <h3 className="text-xl font-bold mb-2">Analyzing Routes</h3>
            <p className="text-gray-300">Processing real-time air quality data...</p>
            <div className="mt-4 text-sm text-gray-400">
              <div className="animate-pulse">Calculating VayuScores...</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <Card className="h-[400px] md:h-[500px] bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
            <Navigation className="h-5 w-5 text-vayu-mint" />
            Route Visualization
            {selectedRouteData && (
              <span className="text-sm font-normal text-gray-300 ml-2">
                - {selectedRouteData.name}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="h-full p-4 md:p-6">
          {routes.length === 0 ? (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <MapPin className="h-12 md:h-16 w-12 md:w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Ready to Plan</h3>
                <p className="text-gray-300 text-sm md:text-base">Enter your route details to see pollution-optimized paths</p>
                {userLocation && (
                  <p className="text-vayu-mint text-sm mt-2">📍 Location detected, ready to route!</p>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full bg-gradient-to-br from-vayu-blue-dark to-vayu-dark rounded-lg relative overflow-hidden">
              {/* Map Background with Route Simulation */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600">
                {/* User Location Marker */}
                {userLocation && (
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2 bg-blue-500/80 text-white px-3 py-2 rounded-full text-sm">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span>Your Location</span>
                    </div>
                  </div>
                )}

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
                    
                    {/* Route AQI Indicators */}
                    <circle 
                      cx="120" 
                      cy={95 + index * 25} 
                      r="4" 
                      fill={route.aqi <= 100 ? "#10b981" : route.aqi <= 150 ? "#f59e0b" : "#ef4444"}
                      className="animate-pulse"
                    />
                    <text 
                      x="130" 
                      y={100 + index * 25} 
                      fill="white" 
                      fontSize="10" 
                      className="font-semibold"
                    >
                      AQI: {route.aqi}
                    </text>
                    
                    {/* VayuPod markers for clean routes */}
                    {route.pollutionLevel === 'low' && (
                      <>
                        <circle cx="200" cy={85 + index * 20} r="3" fill="#10b981" className="animate-pulse" />
                        <circle cx="280" cy={110 + index * 22} r="3" fill="#10b981" className="animate-pulse" />
                      </>
                    )}
                    
                    {/* Traffic indicators */}
                    <circle 
                      cx="320" 
                      cy={100 + index * 25} 
                      r="3" 
                      fill={route.trafficDensity === 'low' ? "#22c55e" : route.trafficDensity === 'medium' ? "#f59e0b" : "#ef4444"}
                    />
                  </svg>
                ))}
                
                {/* Start and End Markers */}
                <div className="absolute top-4 left-12 bg-green-500 p-2 rounded-full shadow-lg">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="absolute bottom-4 right-12 bg-red-500 p-2 rounded-full shadow-lg">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                
                {/* Enhanced Legend */}
                <div className="absolute top-4 right-4 bg-black/70 p-3 rounded-lg text-white text-xs max-w-40">
                  <div className="mb-2 font-semibold">Live Data</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 bg-green-400"></div>
                      <span>Clean Route</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 bg-yellow-400"></div>
                      <span>Moderate AQI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 bg-red-400"></div>
                      <span>High Pollution</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-vayu-mint rounded-full animate-pulse"></div>
                      <span>VayuPod</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Your Location</span>
                    </div>
                  </div>
                </div>

                {/* Real-time data overlay */}
                <div className="absolute bottom-4 left-4 bg-black/70 p-3 rounded-lg text-white text-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="h-3 w-3 text-green-400 animate-pulse" />
                    <span className="font-semibold">Live Data Active</span>
                  </div>
                  <div className="text-gray-300">Updated 2 mins ago</div>
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
            <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
              <Zap className="h-5 w-5 text-vayu-mint" />
              {selectedRouteData.name} - Live Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Environmental Impact */}
              <div className="bg-green-500/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wind className="h-5 w-5 text-green-400" />
                  <h4 className="font-medium text-white">Air Quality Impact</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Current AQI</span>
                    <span className="text-white font-bold">{selectedRouteData.aqi}</span>
                  </div>
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
                  <div className="flex justify-between text-gray-300">
                    <span>VayuScore</span>
                    <span className={`font-bold ${selectedRouteData.vayuScore <= 50 ? 'text-green-400' : selectedRouteData.vayuScore <= 100 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {selectedRouteData.vayuScore}
                    </span>
                  </div>
                </div>
              </div>

              {/* Traffic & Route Info */}
              <div className="bg-blue-500/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Navigation className="h-5 w-5 text-blue-400" />
                  <h4 className="font-medium text-white">Route Intelligence</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Traffic Density</span>
                    <span className={`font-medium capitalize ${
                      selectedRouteData.trafficDensity === 'low' ? 'text-green-400' : 
                      selectedRouteData.trafficDensity === 'medium' ? 'text-yellow-400' : 
                      'text-red-400'
                    }`}>
                      {selectedRouteData.trafficDensity}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Duration</span>
                    <span className="text-white font-medium">{selectedRouteData.duration}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Distance</span>
                    <span className="text-white font-medium">{selectedRouteData.distance}</span>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  {selectedRouteData.highlights.slice(0, 2).map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-vayu-mint hover:bg-vayu-mint-dark text-white">
                  <Navigation className="h-4 w-4 mr-2" />
                  Start Navigation
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  <MapPin className="h-4 w-4 mr-2" />
                  Save Route
                </Button>
                <Button variant="ghost" className="w-full text-gray-300 hover:bg-white/10">
                  Share Route
                </Button>
                
                {/* Real-time updates */}
                <div className="mt-4 p-3 bg-vayu-mint/10 rounded-lg">
                  <div className="flex items-center gap-2 text-vayu-mint text-sm mb-2">
                    <Activity className="h-4 w-4 animate-pulse" />
                    <span className="font-medium">Live Updates</span>
                  </div>
                  <div className="text-xs text-gray-300 space-y-1">
                    <div>• AQI refreshed 2 min ago</div>
                    <div>• Traffic updated 1 min ago</div>
                    <div>• Weather conditions: Clear</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced API Documentation */}
      <Card className="bg-gradient-to-r from-vayu-mint/10 to-vayu-blue/10 border-vayu-mint/30">
        <CardHeader>
          <CardTitle className="text-white text-sm md:text-base">Live API Integration Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs md:text-sm">
            <div className="mb-4">
              <h4 className="text-vayu-mint font-semibold mb-2">Real-time Route Optimization API</h4>
              <pre className="text-gray-300 overflow-x-auto bg-black/30 p-3 rounded">
{`POST /api/routes/eco-search
{
  "origin": { "lat": ${userLocation?.lat || 28.6139}, "lng": ${userLocation?.lng || 77.2090} },
  "destination": { "lat": 28.6350, "lng": 77.2400 },
  "mode": "driving",
  "preferences": {
    "prioritize": "air_quality",
    "include_vayupods": true,
    "max_detour": 15,
    "real_time_aqi": true,
    "traffic_optimization": true
  }
}`}
              </pre>
            </div>
            
            <div>
              <h4 className="text-vayu-mint font-semibold mb-2">Enhanced Response with Live Data</h4>
              <pre className="text-gray-300 overflow-x-auto bg-black/30 p-3 rounded">
{`Response:
{
  "routes": [{
    "route_id": "eco_001",
    "duration": 1680,
    "distance": 12500,
    "vayu_score": 45,
    "current_aqi": 65,
    "pollution_exposure": 12,
    "traffic_density": "low",
    "polyline": "encoded_polyline_string",
    "vayupod_coverage": 78,
    "air_quality_segments": [...],
    "real_time_updates": {
      "last_updated": "2024-01-15T10:30:00Z",
      "weather_impact": "minimal",
      "traffic_incidents": []
    }
  }]
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteMap;

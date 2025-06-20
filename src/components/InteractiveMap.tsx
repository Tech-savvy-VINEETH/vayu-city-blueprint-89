
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Filter, TrendingUp, Users } from 'lucide-react';

const InteractiveMap = () => {
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [selectedOverlay, setSelectedOverlay] = useState('AQI');

  const cities = ['Delhi', 'Hyderabad', 'Bengaluru'];
  const overlays = ['AQI', 'Traffic', 'Emissions'];

  const topCorridors = [
    { name: 'Connaught Place - India Gate', score: 45, reduction: '78%' },
    { name: 'Cyber Hub - DLF Phase 1', score: 52, reduction: '65%' },
    { name: 'Airport Road Corridor', score: 61, reduction: '58%' },
    { name: 'Ring Road East', score: 67, reduction: '51%' },
    { name: 'MG Road Metro Line', score: 73, reduction: '47%' },
  ];

  const getScoreColor = (score: number) => {
    if (score <= 50) return 'bg-green-500';
    if (score <= 100) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-vayu-dark mb-6">
            Interactive <span className="text-gradient-vayu">Corridor Map</span>
          </h2>
          <p className="text-xl text-vayu-blue-dark max-w-3xl mx-auto">
            Explore real-time air quality data across Indian metropolitan corridors.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="p-6 h-96">
              <CardContent className="p-0 h-full">
                {/* Map Controls */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex gap-2">
                    {cities.map((city) => (
                      <Button
                        key={city}
                        variant={selectedCity === city ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCity(city)}
                        className={selectedCity === city ? "bg-vayu-mint text-white" : ""}
                      >
                        {city}
                      </Button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {overlays.map((overlay) => (
                      <Button
                        key={overlay}
                        variant={selectedOverlay === overlay ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setSelectedOverlay(overlay)}
                      >
                        {overlay}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="h-full bg-gradient-to-br from-vayu-blue to-vayu-blue-dark rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="text-white text-center">
                    <MapPin className="h-16 w-16 mx-auto mb-4 text-vayu-mint" />
                    <h3 className="text-2xl font-bold mb-2">{selectedCity} VayuGrid</h3>
                    <p className="text-gray-300">Interactive map loading...</p>
                    
                    {/* Simulated heatmap dots */}
                    <div className="absolute inset-0">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-4 h-4 rounded-full animate-pulse ${
                            i % 3 === 0 ? 'bg-green-400' : i % 3 === 1 ? 'bg-yellow-400' : 'bg-red-400'
                          }`}
                          style={{
                            top: `${Math.random() * 80 + 10}%`,
                            left: `${Math.random() * 80 + 10}%`,
                            animationDelay: `${i * 0.3}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Corridors Sidebar */}
          <div>
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="h-5 w-5 text-vayu-mint" />
                  <h3 className="text-xl font-bold text-vayu-dark">Top 5 Cleanest Corridors Today</h3>
                </div>

                <div className="space-y-4">
                  {topCorridors.map((corridor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getScoreColor(corridor.score)}`}></div>
                        <div>
                          <div className="font-medium text-vayu-dark text-sm">{corridor.name}</div>
                          <div className="text-xs text-vayu-blue">Score: {corridor.score}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-vayu-mint">{corridor.reduction}</div>
                        <div className="text-xs text-vayu-blue">reduction</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-vayu-mint/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-vayu-mint" />
                    <span className="text-sm font-medium text-vayu-dark">Live Stats</span>
                  </div>
                  <div className="text-xs text-vayu-blue-dark space-y-1">
                    <div>Active VayuPods: 147</div>
                    <div>People in clean zones: 12,847</div>
                    <div>Avg pollution reduction: 63%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;

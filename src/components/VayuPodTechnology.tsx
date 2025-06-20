
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, Zap, Wifi, Gauge, Sun, ExternalLink } from 'lucide-react';

const VayuPodTechnology = () => {
  const techFeatures = [
    {
      icon: Filter,
      title: 'HEPA + Carbon Filter',
      description: 'Multi-stage filtration system removing 99.97% of PM2.5 particles'
    },
    {
      icon: Gauge,
      title: 'PM Sensors',
      description: 'Real-time monitoring of PM1, PM2.5, PM10, and VOCs'
    },
    {
      icon: Sun,
      title: 'Solar Power',
      description: 'Self-sustaining energy with battery backup for 24/7 operation'
    },
    {
      icon: Wifi,
      title: 'Edge-AI',
      description: 'On-device processing for instant air quality analysis'
    },
    {
      icon: Zap,
      title: '5G Connectivity',
      description: 'Ultra-low latency communication with central grid system'
    }
  ];

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 15px rgba(20, 184, 166, 0.6); }
          50% { box-shadow: 0 0 25px rgba(20, 184, 166, 0.9); }
        }
        @keyframes solarPulse {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }
        @keyframes statusBlink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        .glow-animation {
          animation: glow 3s infinite;
        }
        .solar-pulse {
          animation: solarPulse 2.5s infinite;
        }
        .status-blink {
          animation: statusBlink 2s infinite;
        }
        .professional-shadow {
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
        }
        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(17, 24, 39, 0.8);
        }
      `}</style>
      
      <section id="technology" className="py-20 bg-vayu-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              VayuPod <span className="text-gradient-vayu">Technology</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Industrial-grade air purification system designed for real-world deployment.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Clear VayuPod Design */}
            <div className="relative flex justify-center">
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 glass-effect professional-shadow">
                
                {/* VayuPod Structure - Clean Layout */}
                <div className="w-64 h-96 mx-auto relative">
                  
                  {/* Solar Panel Top */}
                  <div className="absolute top-0 left-6 right-6 h-12 bg-gradient-to-b from-slate-200 to-slate-300 rounded-t-2xl border border-slate-400 professional-shadow">
                    <div className="grid grid-cols-8 grid-rows-2 gap-0.5 h-full p-2">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div 
                          key={i} 
                          className="bg-blue-900 rounded-sm solar-pulse border border-blue-800" 
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Main Housing */}
                  <div className="absolute top-12 left-0 right-0 bottom-16 bg-gradient-to-b from-white to-gray-100 border-2 border-gray-300 professional-shadow">
                    
                    {/* Top Status Section */}
                    <div className="h-16 px-4 pt-3 border-b border-gray-200">
                      <div className="text-center bg-gray-50 rounded-lg py-1 border border-gray-200">
                        <div className="text-gray-800 text-xs font-bold">EDGE-AI ENABLED</div>
                      </div>
                    </div>

                    {/* Sensor Module - Right Side */}
                    <div className="absolute top-20 right-2 w-20 h-12 bg-gray-100 rounded-lg border border-gray-300 professional-shadow">
                      <div className="p-1 text-center">
                        <div className="text-xs font-bold text-gray-700">SENSORS</div>
                        <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-1 status-blink"></div>
                      </div>
                    </div>

                    {/* Main Filter Section */}
                    <div className="absolute top-20 left-4 right-24 bottom-4 bg-gradient-to-b from-teal-400 to-teal-600 rounded-xl border border-teal-300 professional-shadow">
                      
                      {/* VayuPod Branding */}
                      <div className="text-center py-2 px-2">
                        <div className="bg-white/90 rounded-lg py-1 px-2 border border-white/50">
                          <div className="text-teal-800 text-sm font-bold">VayuPod</div>
                          <div className="text-teal-700 text-xs">GEN-2</div>
                        </div>
                      </div>

                      {/* Filter Pattern */}
                      <div className="absolute top-16 left-2 right-2 bottom-16">
                        <div className="grid grid-cols-6 grid-rows-8 h-full w-full gap-1">
                          {Array.from({ length: 48 }).map((_, i) => (
                            <div key={i} className="border border-teal-200 opacity-60 rounded-sm bg-teal-300/30"></div>
                          ))}
                        </div>
                      </div>

                      {/* Filter Info */}
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="bg-white/90 rounded-lg py-1 px-2 text-center border border-white/50">
                          <div className="text-teal-800 text-xs font-bold">99.97% HEPA</div>
                        </div>
                      </div>
                    </div>

                    {/* Air Quality Indicators - Left Side */}
                    <div className="absolute top-36 left-2 space-y-1">
                      <div className="flex items-center gap-1 bg-white/80 rounded px-1 py-0.5">
                        <div className="w-2 h-2 bg-green-400 rounded-full pulse-animation"></div>
                        <span className="text-xs font-medium text-gray-700">PM2.5</span>
                      </div>
                      <div className="flex items-center gap-1 bg-white/80 rounded px-1 py-0.5">
                        <div className="w-2 h-2 bg-blue-400 rounded-full pulse-animation" style={{ animationDelay: '0.5s' }}></div>
                        <span className="text-xs font-medium text-gray-700">VOC</span>
                      </div>
                      <div className="flex items-center gap-1 bg-white/80 rounded px-1 py-0.5">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full pulse-animation" style={{ animationDelay: '1s' }}></div>
                        <span className="text-xs font-medium text-gray-700">PM10</span>
                      </div>
                    </div>
                  </div>

                  {/* Base Section */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-200 to-gray-300 rounded-b-2xl border-2 border-gray-400 border-t-0 professional-shadow">
                    
                    {/* Base Info */}
                    <div className="text-center pt-1">
                      <div className="bg-gray-100 rounded px-2 py-0.5 mx-4 border border-gray-300">
                        <div className="text-gray-800 text-xs font-bold">WEATHERPROOF</div>
                      </div>
                    </div>
                    
                    {/* Ventilation */}
                    <div className="absolute bottom-2 left-4 right-4 h-6 bg-gray-700 rounded professional-shadow">
                      <div className="grid grid-cols-12 gap-0.5 h-full p-1">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div key={i} className="bg-gray-500 rounded-sm"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Info - Separate from VayuPod */}
                <div className="mt-8 text-center">
                  <h3 className="text-2xl font-bold mb-2 text-white">VayuPod Gen-2</h3>
                  <p className="text-gray-300 mb-4">Professional Air Purification</p>
                  
                  {/* Status Indicators - Clean Layout */}
                  <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
                    <div className="flex items-center gap-2 text-yellow-400 bg-gray-800/60 rounded-lg px-3 py-2 border border-yellow-400/20">
                      <Sun className="w-4 h-4" />
                      <span className="text-sm font-medium">Solar</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-400 bg-gray-800/60 rounded-lg px-3 py-2 border border-blue-400/20">
                      <Wifi className="w-4 h-4" />
                      <span className="text-sm font-medium">5G+AI</span>
                    </div>
                    <div className="flex items-center gap-2 text-teal-400 bg-gray-800/60 rounded-lg px-3 py-2 border border-teal-400/20">
                      <Filter className="w-4 h-4" />
                      <span className="text-sm font-medium">HEPA</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 bg-gray-800/60 rounded-lg px-3 py-2 border border-green-400/20">
                      <Gauge className="w-4 h-4" />
                      <span className="text-sm font-medium">Weather</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Features */}
            <div className="space-y-6">
              {techFeatures.map((feature, index) => (
                <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-md hover:bg-white/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-vayu-mint text-white">
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                        <p className="text-gray-300">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="pt-6">
                <Button className="bg-vayu-mint hover:bg-vayu-mint-dark text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:scale-105 transition-all duration-200">
                  <ExternalLink className="h-5 w-5" />
                  View Tech Specs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VayuPodTechnology;

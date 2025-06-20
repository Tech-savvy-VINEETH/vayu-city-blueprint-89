
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
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), 0 4px 15px rgba(0, 0, 0, 0.2);
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

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Clean Professional VayuPod Design */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-12 h-[650px] flex items-center justify-center glass-effect professional-shadow overflow-hidden">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="h-full w-full" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>

                <div className="relative z-10 text-center">
                  {/* Clean VayuPod Structure */}
                  <div className="relative w-56 h-[450px] mx-auto">
                    
                    {/* Solar Panel - Top Section */}
                    <div className="absolute top-0 left-4 right-4 h-16 bg-gradient-to-b from-slate-100 to-slate-200 rounded-t-3xl border-2 border-slate-300 professional-shadow">
                      {/* Solar Panel Grid */}
                      <div className="grid grid-cols-6 grid-rows-3 gap-0.5 h-full p-3">
                        {Array.from({ length: 18 }).map((_, i) => (
                          <div 
                            key={i} 
                            className="bg-gradient-to-br from-blue-900 via-slate-700 to-blue-900 rounded solar-pulse border border-blue-800" 
                            style={{ animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Main Clean Housing */}
                    <div className="absolute top-16 left-0 right-0 bottom-24 bg-gradient-to-b from-white to-gray-50 border-2 border-gray-200 rounded-t-none rounded-b-none professional-shadow">
                      
                      {/* Clean Brand Section - Top */}
                      <div className="absolute top-4 left-0 right-0 px-6">
                        <div className="text-center bg-gray-100 rounded-lg py-2 border border-gray-200">
                          <div className="text-gray-800 text-xs font-bold tracking-widest">EDGE-AI + 5G ENABLED</div>
                        </div>
                      </div>

                      {/* Sensor Module - Clean Design */}
                      <div className="absolute top-16 right-4 w-24 h-16 bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl border-2 border-gray-300 professional-shadow">
                        <div className="p-2 text-center">
                          <div className="text-xs font-bold text-gray-700 leading-tight mb-1">AIR QUALITY</div>
                          <div className="text-xs font-semibold text-gray-600">SENSORS</div>
                        </div>
                        {/* Status Light */}
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full status-blink border-2 border-white shadow-lg"></div>
                      </div>

                      {/* Main Filter Section - Clean Teal Design */}
                      <div className="absolute top-24 left-6 right-6 bottom-8 bg-gradient-to-b from-teal-400 to-teal-600 rounded-2xl border-2 border-teal-300 professional-shadow overflow-hidden">
                        {/* Filter Pattern */}
                        <div className="absolute inset-4">
                          <div className="grid grid-cols-8 grid-rows-12 h-full w-full gap-1">
                            {Array.from({ length: 96 }).map((_, i) => (
                              <div key={i} className="border border-teal-200 opacity-60 rounded-sm bg-teal-300/20"></div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Clean VayuPod Branding */}
                        <div className="absolute top-6 left-0 right-0 text-center">
                          <div className="bg-white/90 backdrop-blur-sm rounded-lg py-2 px-4 mx-4 border border-white/50">
                            <div className="text-teal-800 text-lg font-bold tracking-wider">VayuPod</div>
                            <div className="text-teal-700 text-xs font-semibold">GEN-2</div>
                          </div>
                        </div>

                        {/* Air Quality Indicators */}
                        <div className="absolute top-20 right-4 space-y-2">
                          <div className="flex items-center gap-2 bg-white/80 rounded-lg px-2 py-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full pulse-animation"></div>
                            <span className="text-xs font-medium text-gray-700">PM2.5</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white/80 rounded-lg px-2 py-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full pulse-animation" style={{ animationDelay: '0.5s' }}></div>
                            <span className="text-xs font-medium text-gray-700">VOC</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white/80 rounded-lg px-2 py-1">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full pulse-animation" style={{ animationDelay: '1s' }}></div>
                            <span className="text-xs font-medium text-gray-700">PM10</span>
                          </div>
                        </div>

                        {/* Filter Efficiency Badge */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-white/90 backdrop-blur-sm rounded-lg py-2 px-3 text-center border border-white/50">
                            <div className="text-teal-800 text-sm font-bold">99.97% HEPA</div>
                            <div className="text-teal-700 text-xs">+ CARBON FILTER</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Clean Weatherproof Base */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-100 to-white rounded-b-3xl border-2 border-gray-200 border-t-0 professional-shadow">
                      {/* Base Information */}
                      <div className="absolute top-2 left-0 right-0 text-center">
                        <div className="bg-gray-50 rounded-lg py-1 px-3 mx-4 border border-gray-200">
                          <div className="text-gray-800 text-xs font-bold tracking-wider">WEATHERPROOF HOUSING</div>
                        </div>
                      </div>
                      
                      {/* Ventilation Grilles */}
                      <div className="absolute bottom-6 left-8 right-8 h-8 bg-gradient-to-b from-gray-700 to-gray-800 rounded-xl professional-shadow">
                        <div className="grid grid-cols-14 gap-0.5 h-full p-1">
                          {Array.from({ length: 14 }).map((_, i) => (
                            <div key={i} className="bg-gradient-to-b from-gray-500 to-gray-600 rounded-sm"></div>
                          ))}
                        </div>
                      </div>

                      {/* Stability Feet */}
                      <div className="absolute -bottom-1 left-6 w-8 h-4 bg-gradient-to-b from-gray-600 to-gray-700 rounded-b-lg professional-shadow"></div>
                      <div className="absolute -bottom-1 right-6 w-8 h-4 bg-gradient-to-b from-gray-600 to-gray-700 rounded-b-lg professional-shadow"></div>
                    </div>

                    {/* Clean Status Indicators - Right Side */}
                    <div className="absolute -right-28 top-1/3 space-y-4">
                      <div className="flex items-center gap-3 text-blue-400 bg-gray-900/90 backdrop-blur-sm rounded-xl px-4 py-3 border border-blue-400/30">
                        <Wifi className="h-5 w-5 pulse-animation" />
                        <div>
                          <div className="text-sm font-bold">5G</div>
                          <div className="text-xs text-blue-300">Connected</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-cyan-400 bg-gray-900/90 backdrop-blur-sm rounded-xl px-4 py-3 border border-cyan-400/30">
                        <div className="w-4 h-4 bg-cyan-400 rounded-full pulse-animation"></div>
                        <div>
                          <div className="text-sm font-bold">EDGE AI</div>
                          <div className="text-xs text-cyan-300">Processing</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-yellow-400 bg-gray-900/90 backdrop-blur-sm rounded-xl px-4 py-3 border border-yellow-400/30">
                        <Sun className="h-5 w-5 solar-pulse" />
                        <div>
                          <div className="text-sm font-bold">SOLAR</div>
                          <div className="text-xs text-yellow-300">Charging</div>
                        </div>
                      </div>
                    </div>

                    {/* Clean Data Transmission */}
                    <div className="absolute -right-24 top-1/2 flex flex-col gap-2">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex gap-1" style={{ animationDelay: `${i * 0.3}s` }}>
                          <div className="w-2 h-1 bg-cyan-300 rounded-full opacity-70 pulse-animation"></div>
                          <div className="w-4 h-1 bg-cyan-400 rounded-full opacity-90 pulse-animation"></div>
                          <div className="w-2 h-1 bg-cyan-300 rounded-full opacity-70 pulse-animation"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clean Product Information */}
                  <div className="mt-12">
                    <h3 className="text-3xl font-bold mb-2 text-white">VayuPod Gen-2</h3>
                    <p className="text-gray-300 mb-6 text-lg">Professional Air Purification System</p>
                    <div className="grid grid-cols-2 gap-3 text-sm max-w-md mx-auto">
                      <div className="flex items-center gap-2 text-yellow-400 bg-gray-800/60 rounded-xl px-4 py-2 border border-yellow-400/20">
                        <Sun className="w-4 h-4" />
                        <span className="font-medium">Solar Powered</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-400 bg-gray-800/60 rounded-xl px-4 py-2 border border-blue-400/20">
                        <Wifi className="w-4 h-4" />
                        <span className="font-medium">5G + Edge AI</span>
                      </div>
                      <div className="flex items-center gap-2 text-teal-400 bg-gray-800/60 rounded-xl px-4 py-2 border border-teal-400/20">
                        <Filter className="w-4 h-4" />
                        <span className="font-medium">HEPA Filter</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-400 bg-gray-800/60 rounded-xl px-4 py-2 border border-green-400/20">
                        <Gauge className="w-4 h-4" />
                        <span className="font-medium">Weatherproof</span>
                      </div>
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

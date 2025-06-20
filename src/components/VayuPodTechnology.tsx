
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
            {/* Professional VayuPod Design */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-12 h-[650px] flex items-center justify-center glass-effect professional-shadow overflow-hidden">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-3">
                  <div className="h-full w-full" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                  }}></div>
                </div>

                <div className="relative z-10 text-center">
                  {/* Professional VayuPod Structure */}
                  <div className="relative w-52 h-[420px] mx-auto">
                    
                    {/* Solar Panel - Top Section with Professional Design */}
                    <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-white to-gray-50 rounded-t-2xl border border-gray-200 professional-shadow">
                      {/* Solar Panel Grid with Better Styling */}
                      <div className="grid grid-cols-6 grid-rows-3 gap-0.5 h-full p-2">
                        {Array.from({ length: 18 }).map((_, i) => (
                          <div 
                            key={i} 
                            className="bg-gradient-to-br from-blue-900 via-slate-800 to-blue-900 rounded-sm border border-blue-700 solar-pulse" 
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                      {/* Solar Panel Frame */}
                      <div className="absolute inset-1 border border-gray-300 rounded-xl pointer-events-none"></div>
                    </div>

                    {/* Main Professional Housing */}
                    <div className="absolute top-14 left-0 right-0 bottom-20 bg-gradient-to-b from-white to-gray-50 border border-gray-200 professional-shadow">
                      
                      {/* Top Branding Section */}
                      <div className="absolute top-6 left-4 right-4 text-center">
                        <div className="text-gray-800 text-sm font-bold tracking-wider">Edge-AI + 5G</div>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mt-1"></div>
                      </div>

                      {/* Professional Sensor Module */}
                      <div className="absolute top-16 right-4 w-20 h-14 bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl border border-gray-300 professional-shadow">
                        <div className="flex items-center justify-center h-full">
                          <div className="text-xs font-bold text-gray-700 text-center leading-tight">
                            PM<br/>SENSORS
                          </div>
                        </div>
                        {/* Professional Status Indicator */}
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-green-500 rounded-full status-blink border-2 border-white professional-shadow"></div>
                      </div>

                      {/* Main Filter Section - Professional Teal Design */}
                      <div className="absolute top-20 left-6 right-6 bottom-24 bg-gradient-to-b from-teal-500 to-teal-600 rounded-2xl border-2 border-teal-400 professional-shadow overflow-hidden">
                        {/* Professional Grid Pattern */}
                        <div className="absolute inset-3">
                          <div className="grid grid-cols-10 grid-rows-14 h-full w-full gap-0.5">
                            {Array.from({ length: 140 }).map((_, i) => (
                              <div key={i} className="border border-teal-300 opacity-40 rounded-sm"></div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Professional VayuPod Branding */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-white text-2xl font-bold tracking-wider drop-shadow-lg">
                            VayuPod
                          </div>
                        </div>

                        {/* Professional Air Quality Indicators */}
                        <div className="absolute top-3 right-3 grid grid-cols-3 gap-1">
                          <div className="w-2.5 h-2.5 bg-green-300 rounded-full pulse-animation"></div>
                          <div className="w-2.5 h-2.5 bg-blue-300 rounded-full pulse-animation" style={{ animationDelay: '0.7s' }}></div>
                          <div className="w-2.5 h-2.5 bg-yellow-300 rounded-full pulse-animation" style={{ animationDelay: '1.4s' }}></div>
                        </div>

                        {/* Filter Efficiency Badge */}
                        <div className="absolute bottom-3 left-3 right-3 text-center">
                          <div className="bg-white/20 backdrop-blur-sm rounded-lg py-1 px-2">
                            <div className="text-white text-xs font-semibold">99.97% HEPA</div>
                          </div>
                        </div>
                      </div>

                      {/* Professional Filter Label */}
                      <div className="absolute bottom-8 left-4 right-4 text-center">
                        <div className="text-gray-800 text-sm font-bold tracking-wider">
                          HEPA + CARBON FILTER
                        </div>
                      </div>
                    </div>

                    {/* Professional Weatherproof Base */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-50 to-white rounded-b-2xl border border-gray-200 professional-shadow">
                      {/* Professional Base Label */}
                      <div className="absolute top-3 left-4 right-4 text-center">
                        <div className="text-gray-800 text-sm font-bold tracking-wider">WEATHERPROOF</div>
                      </div>
                      
                      {/* Professional Ventilation System */}
                      <div className="absolute bottom-4 left-8 right-8 h-8 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl professional-shadow">
                        <div className="grid grid-cols-12 gap-1 h-full p-1.5">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="bg-gradient-to-b from-gray-600 to-gray-700 rounded-sm"></div>
                          ))}
                        </div>
                      </div>

                      {/* Professional Stability System */}
                      <div className="absolute -bottom-1 left-4 w-6 h-3 bg-gradient-to-b from-gray-600 to-gray-700 rounded-b-lg professional-shadow"></div>
                      <div className="absolute -bottom-1 right-4 w-6 h-3 bg-gradient-to-b from-gray-600 to-gray-700 rounded-b-lg professional-shadow"></div>
                    </div>

                    {/* Professional Status Indicators */}
                    <div className="absolute -right-24 top-1/3 space-y-6">
                      {/* 5G Connectivity */}
                      <div className="flex items-center gap-3 text-blue-400 bg-gray-900/80 backdrop-blur-sm rounded-lg px-3 py-2">
                        <Wifi className="h-5 w-5 pulse-animation" />
                        <span className="text-sm font-bold">5G</span>
                      </div>
                      
                      {/* Edge AI Processing */}
                      <div className="flex items-center gap-3 text-cyan-400 bg-gray-900/80 backdrop-blur-sm rounded-lg px-3 py-2">
                        <div className="w-4 h-4 bg-cyan-400 rounded-full pulse-animation"></div>
                        <span className="text-sm font-bold">EDGE AI</span>
                      </div>
                      
                      {/* Solar Power Status */}
                      <div className="flex items-center gap-3 text-yellow-400 bg-gray-900/80 backdrop-blur-sm rounded-lg px-3 py-2">
                        <Sun className="h-5 w-5 solar-pulse" />
                        <span className="text-sm font-bold">SOLAR</span>
                      </div>
                    </div>

                    {/* Professional Data Transmission Visualization */}
                    <div className="absolute -right-20 top-1/2 flex flex-col gap-1">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="flex gap-1" style={{ animationDelay: `${i * 0.2}s` }}>
                          <div className="w-1 h-0.5 bg-cyan-300 rounded-full opacity-70 pulse-animation"></div>
                          <div className="w-3 h-0.5 bg-cyan-400 rounded-full opacity-90 pulse-animation"></div>
                          <div className="w-1 h-0.5 bg-cyan-300 rounded-full opacity-70 pulse-animation"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Professional Product Information */}
                  <div className="mt-10">
                    <h3 className="text-3xl font-bold mb-3 text-white">VayuPod Gen-2</h3>
                    <p className="text-gray-300 mb-6">Professional Air Purification System</p>
                    <div className="grid grid-cols-2 gap-4 text-sm max-w-sm mx-auto">
                      <div className="flex items-center gap-2 text-yellow-400 bg-gray-800/50 rounded-lg px-3 py-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="font-medium">Solar Powered</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-400 bg-gray-800/50 rounded-lg px-3 py-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="font-medium">Edge AI + 5G</span>
                      </div>
                      <div className="flex items-center gap-2 text-teal-400 bg-gray-800/50 rounded-lg px-3 py-2">
                        <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                        <span className="font-medium">HEPA Filter</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-400 bg-gray-800/50 rounded-lg px-3 py-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
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

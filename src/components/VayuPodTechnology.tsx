
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
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-8px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes dataFlow {
          0% { opacity: 0; transform: translateX(-20px); }
          50% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(20px); }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .fadeInOut-animation {
          animation: fadeInOut 3s infinite;
        }
        .spin-animation {
          animation: spin 8s linear infinite;
        }
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        .data-flow {
          animation: dataFlow 2s infinite;
        }
      `}</style>
      
      <section id="technology" className="py-20 bg-vayu-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              VayuPod <span className="text-gradient-vayu">Technology</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced air purification technology powered by AI and renewable energy.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Realistic 3D VayuPod Air Purifier */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 h-[500px] flex items-center justify-center glass-effect overflow-hidden">
                {/* Environmental background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-60"></div>
                  <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent opacity-40"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
                </div>

                <div className="relative z-10 text-center text-white">
                  <div className="relative perspective-1000">
                    {/* Main VayuPod Air Purifier Body */}
                    <div className="relative w-56 h-80 mx-auto transform-style-preserve-3d">
                      
                      {/* Solar Panel Top */}
                      <div className="absolute -top-4 left-8 right-8 h-8 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 rounded-lg border-2 border-blue-600/50 shadow-lg">
                        <div className="grid grid-cols-6 gap-1 h-full p-1">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="bg-blue-800 rounded-sm relative">
                              <div className="absolute inset-0.5 bg-gradient-to-br from-blue-600 to-blue-800 rounded-sm"></div>
                            </div>
                          ))}
                        </div>
                        {/* Solar power indicator */}
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full pulse-animation">
                          <Sun className="h-3 w-3 text-yellow-800 absolute top-0.5 left-0.5" />
                        </div>
                      </div>

                      {/* Main cylindrical body - Air Purifier Design */}
                      <div className="absolute inset-x-6 top-6 bottom-6 bg-gradient-to-b from-gray-100 via-white to-gray-200 rounded-2xl shadow-2xl border-2 border-gray-300 relative">
                        
                        {/* Top Air Intake with HEPA Filter Indicator */}
                        <div className="absolute top-4 left-4 right-4 h-24 bg-gray-800 rounded-xl overflow-hidden border-2 border-gray-600">
                          {/* HEPA Filter Mesh */}
                          <div className="absolute inset-0 opacity-90">
                            <div className="grid grid-cols-8 gap-0.5 h-full p-1">
                              {Array.from({ length: 64 }).map((_, i) => (
                                <div key={i} className="bg-gray-700 rounded-sm opacity-80"></div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Filter activity indicator */}
                          <div className="absolute top-1 right-1 w-3 h-3 bg-green-400 rounded-full pulse-animation"></div>
                          <div className="absolute top-1 left-1">
                            <Filter className="h-3 w-3 text-green-400" />
                          </div>
                        </div>

                        {/* PM Sensors Display Panel */}
                        <div className="absolute top-32 left-3 right-3 h-20 bg-black rounded-lg border border-gray-400 overflow-hidden">
                          <div className="h-full bg-gradient-to-b from-gray-900 to-black p-2">
                            {/* Digital Display */}
                            <div className="text-green-400 text-xs font-mono leading-tight">
                              <div className="flex justify-between mb-1">
                                <span>PM2.5:</span>
                                <span className="text-green-300">12 μg/m³</span>
                              </div>
                              <div className="flex justify-between mb-1">
                                <span>PM10:</span>
                                <span className="text-yellow-300">24 μg/m³</span>
                              </div>
                              <div className="flex justify-between">
                                <span>VOCs:</span>
                                <span className="text-blue-300">Low</span>
                              </div>
                            </div>
                            {/* Sensor indicator */}
                            <div className="absolute top-1 right-1">
                              <Gauge className="h-3 w-3 text-green-400 pulse-animation" />
                            </div>
                          </div>
                        </div>

                        {/* VayuPod Branding */}
                        <div className="absolute top-56 left-4 right-4 h-12 bg-gradient-to-r from-vayu-mint to-vayu-mint-dark rounded-lg flex items-center justify-center shadow-lg">
                          <div className="text-white font-bold text-sm tracking-wider">VayuPod Gen-2</div>
                        </div>

                        {/* Control Panel with AI Indicator */}
                        <div className="absolute bottom-16 left-4 right-4 h-12 bg-gray-900 rounded-lg border border-gray-600 flex items-center justify-between px-3">
                          {/* Edge-AI Processing Indicator */}
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-cyan-500 rounded-full relative pulse-animation">
                              <div className="absolute inset-1 bg-white rounded-full opacity-90"></div>
                              <div className="absolute inset-0.5 border-2 border-cyan-300 rounded-full spin-animation"></div>
                            </div>
                            <span className="text-cyan-400 text-xs font-semibold">AI</span>
                          </div>
                          
                          {/* Status LEDs */}
                          <div className="flex gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full pulse-animation"></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full pulse-animation" style={{ animationDelay: '0.5s' }}></div>
                            <div className="w-2 h-2 bg-yellow-400 rounded-full pulse-animation" style={{ animationDelay: '1s' }}></div>
                          </div>
                          
                          {/* 5G Connectivity */}
                          <div className="flex items-center gap-1">
                            <Wifi className="h-3 w-3 text-blue-400 pulse-animation" />
                            <span className="text-blue-400 text-xs font-semibold">5G</span>
                          </div>
                        </div>

                        {/* Bottom Air Outlet */}
                        <div className="absolute bottom-2 left-4 right-4 h-10 bg-gray-800 rounded-lg border border-gray-600">
                          <div className="grid grid-cols-10 gap-0.5 h-full p-1">
                            {Array.from({ length: 30 }).map((_, i) => (
                              <div key={i} className="bg-gray-700 rounded-sm"></div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Technology Feature Indicators */}
                      <div className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg shadow-yellow-400/30 pulse-animation">
                        <Sun className="h-6 w-6 text-yellow-800" />
                      </div>
                      
                      <div className="absolute top-20 -right-8 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center shadow-lg shadow-green-400/30 pulse-animation">
                        <Filter className="h-5 w-5 text-green-800" />
                      </div>
                      
                      <div className="absolute bottom-10 -left-8 w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-400/30 pulse-animation">
                        <Wifi className="h-5 w-5 text-blue-800" />
                      </div>
                      
                      <div className="absolute top-40 -left-6 w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-cyan-400/30 pulse-animation">
                        <Zap className="h-4 w-4 text-cyan-800" />
                      </div>

                      {/* Data Flow Visualization */}
                      <div className="absolute top-1/2 -right-12 flex flex-col gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-6 h-1 bg-cyan-300 rounded-full data-flow"
                            style={{ animationDelay: `${i * 0.2}s` }}
                          ></div>
                        ))}
                      </div>

                      {/* Clean Air Output Visualization */}
                      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-2 h-12 bg-green-300 rounded-full opacity-60 fadeInOut-animation"
                            style={{
                              animationDelay: `${i * 0.2}s`
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-12">
                      <h3 className="text-2xl font-bold mb-2">VayuPod Gen-2</h3>
                      <p className="text-gray-300 mb-4">Smart Air Purification System</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <span className="text-green-400 flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          HEPA Active
                        </span>
                        <span className="text-blue-400 flex items-center gap-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          5G Connected
                        </span>
                        <span className="text-yellow-400 flex items-center gap-1">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          Solar Powered
                        </span>
                        <span className="text-cyan-400 flex items-center gap-1">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                          AI Processing
                        </span>
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

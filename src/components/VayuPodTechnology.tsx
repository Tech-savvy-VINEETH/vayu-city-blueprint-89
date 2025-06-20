
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
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(20, 184, 166, 0.5); }
          50% { box-shadow: 0 0 20px rgba(20, 184, 166, 0.8), 0 0 30px rgba(20, 184, 166, 0.6); }
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
        .glow-animation {
          animation: glow 3s infinite;
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
            {/* Realistic VayuPod based on actual prototype */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 h-[500px] flex items-center justify-center glass-effect overflow-hidden">
                {/* Environmental background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-teal-400 to-transparent opacity-60"></div>
                  <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-40"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
                </div>

                <div className="relative z-10 text-center text-white">
                  <div className="relative perspective-1000">
                    {/* Main VayuPod Prototype Design */}
                    <div className="relative w-48 h-72 mx-auto transform-style-preserve-3d">
                      
                      {/* Solar Panel Top - Black/Dark */}
                      <div className="absolute -top-2 left-4 right-4 h-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg border border-gray-700 shadow-lg">
                        <div className="grid grid-cols-8 gap-0.5 h-full p-0.5">
                          {Array.from({ length: 16 }).map((_, i) => (
                            <div key={i} className="bg-gray-800 rounded-sm relative">
                              <div className="absolute inset-0.5 bg-gradient-to-br from-gray-700 to-gray-900 rounded-sm"></div>
                            </div>
                          ))}
                        </div>
                        {/* Solar power indicator */}
                        <div className="absolute -top-1 -right-1 text-xs text-yellow-400 font-semibold">Solar Powered</div>
                      </div>

                      {/* Main Body - Compact Teal Design like prototype */}
                      <div className="absolute inset-x-0 top-6 bottom-4 bg-gradient-to-b from-teal-500 via-teal-600 to-teal-700 rounded-2xl shadow-2xl border border-teal-400 relative glow-animation">
                        
                        {/* Top Air Intake Grille */}
                        <div className="absolute top-3 left-3 right-3 h-16 bg-gray-900 rounded-xl overflow-hidden border border-gray-600">
                          {/* Hexagonal Mesh Pattern */}
                          <div className="absolute inset-0 opacity-90">
                            <div className="grid grid-cols-6 gap-1 h-full p-1">
                              {Array.from({ length: 24 }).map((_, i) => (
                                <div key={i} className="bg-gray-800 rounded-sm relative">
                                  <div className="absolute inset-0.5 bg-gray-700 rounded-sm"></div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Airflow indicator */}
                          <div className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full pulse-animation"></div>
                          <div className="absolute top-1 left-1">
                            <Filter className="h-2 w-2 text-green-400" />
                          </div>
                        </div>

                        {/* Status LED Light - like prototype */}
                        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-teal-300 rounded-full glow-animation border-2 border-white">
                          <div className="absolute inset-1 bg-white rounded-full opacity-90"></div>
                        </div>

                        {/* Modular Section Indicator */}
                        <div className="absolute top-32 left-2 right-2 h-8 bg-teal-800 rounded-lg border border-teal-600 flex items-center justify-center">
                          <div className="text-white text-xs font-bold tracking-wider">MODULAR DESIGN</div>
                        </div>

                        {/* Weatherproof Housing Text */}
                        <div className="absolute top-44 left-2 right-2 h-6 bg-teal-900 rounded-md flex items-center justify-center">
                          <div className="text-teal-200 text-xs font-semibold">WEATHERPROOF</div>
                        </div>

                        {/* Edge AI & 5G Connectivity Panel */}
                        <div className="absolute bottom-16 left-2 right-2 h-16 bg-gray-900 rounded-lg border border-gray-600 p-2">
                          {/* Edge AI Indicator */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-cyan-400 rounded-full relative pulse-animation">
                                <div className="absolute inset-0.5 bg-white rounded-full opacity-90"></div>
                                <div className="absolute inset-0 border border-cyan-300 rounded-full spin-animation"></div>
                              </div>
                              <span className="text-cyan-400 text-xs font-bold">EDGE AI</span>
                            </div>
                            
                            {/* 5G Connectivity */}
                            <div className="flex items-center gap-1">
                              <Wifi className="h-3 w-3 text-blue-400 pulse-animation" />
                              <span className="text-blue-400 text-xs font-bold">5G</span>
                            </div>
                          </div>
                          
                          {/* Connection Status */}
                          <div className="flex justify-center gap-1">
                            <div className="w-1 h-1 bg-green-400 rounded-full pulse-animation"></div>
                            <div className="w-1 h-1 bg-blue-400 rounded-full pulse-animation" style={{ animationDelay: '0.3s' }}></div>
                            <div className="w-1 h-1 bg-yellow-400 rounded-full pulse-animation" style={{ animationDelay: '0.6s' }}></div>
                          </div>
                        </div>

                        {/* Bottom Outlet Grille */}
                        <div className="absolute bottom-2 left-3 right-3 h-8 bg-gray-900 rounded-lg border border-gray-600">
                          <div className="grid grid-cols-8 gap-0.5 h-full p-1">
                            {Array.from({ length: 24 }).map((_, i) => (
                              <div key={i} className="bg-gray-700 rounded-sm"></div>
                            ))}
                          </div>
                        </div>

                        {/* VayuPod Branding - side mounted like prototype */}
                        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -rotate-90 origin-left">
                          <div className="text-white text-xs font-bold tracking-widest opacity-80">VAYUPOD</div>
                        </div>
                      </div>

                      {/* Feature Callouts matching the prototype image */}
                      <div className="absolute -top-4 -right-8 text-right">
                        <div className="text-xs text-teal-300 font-semibold mb-1">Solar Powered</div>
                        <div className="w-6 h-0.5 bg-teal-300 ml-auto"></div>
                      </div>
                      
                      <div className="absolute top-1/4 -right-12 text-right">
                        <div className="text-xs text-blue-300 font-semibold mb-1">Edge AI & 5G</div>
                        <div className="text-xs text-blue-300 font-semibold mb-1">Connectivity</div>
                        <div className="w-8 h-0.5 bg-blue-300 ml-auto"></div>
                      </div>
                      
                      <div className="absolute bottom-1/4 -right-10 text-right">
                        <div className="text-xs text-green-300 font-semibold mb-1">Weatherproof</div>
                        <div className="text-xs text-green-300 font-semibold mb-1">Modular Design</div>
                        <div className="w-8 h-0.5 bg-green-300 ml-auto"></div>
                      </div>

                      {/* Data Flow Visualization */}
                      <div className="absolute top-1/2 -right-16 flex flex-col gap-1">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-8 h-0.5 bg-teal-300 rounded-full data-flow"
                            style={{ animationDelay: `${i * 0.3}s` }}
                          ></div>
                        ))}
                      </div>

                      {/* Clean Air Output Visualization */}
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-1 h-8 bg-teal-300 rounded-full opacity-60 fadeInOut-animation"
                            style={{
                              animationDelay: `${i * 0.2}s`
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-2xl font-bold mb-2 text-teal-300">VayuPod Gen-2</h3>
                      <p className="text-gray-300 mb-4">Smart Modular Air Purification System</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <span className="text-teal-400 flex items-center gap-1">
                          <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                          Weatherproof
                        </span>
                        <span className="text-blue-400 flex items-center gap-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          5G + Edge AI
                        </span>
                        <span className="text-yellow-400 flex items-center gap-1">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          Solar Powered
                        </span>
                        <span className="text-green-400 flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          Modular Design
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


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
        @keyframes airFlowIn {
          0% { transform: translateX(-30px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(0); opacity: 0; }
        }
        @keyframes airFlowOut {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-30px); opacity: 0; }
        }
        @keyframes solarPulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        @keyframes statusBlink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.6; }
        }
        .air-flow-in {
          animation: airFlowIn 2.5s infinite;
        }
        .air-flow-out {
          animation: airFlowOut 2.5s infinite;
        }
        .solar-pulse {
          animation: solarPulse 2s infinite;
        }
        .status-blink {
          animation: statusBlink 2s infinite;
        }
        .professional-shadow {
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
        }
        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(17, 24, 39, 0.85);
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
            {/* VayuPod Design */}
            <div className="relative flex justify-center">
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-16 glass-effect professional-shadow">
                
                {/* Air Flow Indicators - Polluted Air In (Left Side) */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center">
                  {/* Air particles */}
                  <div className="space-y-3 mb-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div 
                        key={`in-${i}`}
                        className="w-10 h-3 bg-red-500 rounded-full air-flow-in opacity-70"
                        style={{ animationDelay: `${i * 0.5}s` }}
                      />
                    ))}
                  </div>
                  
                  {/* Polluted Air Text */}
                  <div className="text-red-400 text-xs font-bold text-center">
                    <div>POLLUTED</div>
                    <div>AIR</div>
                  </div>
                </div>

                {/* VayuPod Structure */}
                <div className="w-72 h-[450px] mx-auto relative">
                  
                  {/* Solar Panel Top */}
                  <div className="absolute top-0 left-6 right-6 h-14 bg-gradient-to-b from-blue-300 to-blue-400 rounded-t-2xl border-2 border-blue-500 professional-shadow">
                    <div className="grid grid-cols-8 grid-rows-3 gap-1 h-full p-2">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <div 
                          key={i} 
                          className="bg-blue-900 rounded solar-pulse" 
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Main Housing */}
                  <div className="absolute top-14 left-0 right-0 bottom-16 bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl border-2 border-gray-400 professional-shadow">
                    
                    {/* Edge-AI + 5G Label */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                      Edge-AI + 5G
                    </div>

                    {/* Sensor Module */}
                    <div className="absolute top-16 right-4 w-20 h-12 bg-gray-300 rounded-lg border-2 border-gray-400 professional-shadow">
                      <div className="p-1 text-center">
                        <div className="text-xs font-bold text-gray-700">SENSORS</div>
                        <div className="w-2 h-2 bg-green-400 rounded-full mx-auto status-blink border border-green-600 mt-1"></div>
                      </div>
                    </div>

                    {/* Main Filter Section */}
                    <div className="absolute top-20 left-4 right-24 bottom-20 bg-gradient-to-b from-teal-500 to-teal-700 rounded-xl border-2 border-teal-600 professional-shadow">
                      
                      {/* Filter Grid Pattern */}
                      <div className="absolute inset-3">
                        <div className="grid grid-cols-6 grid-rows-10 h-full w-full gap-1">
                          {Array.from({ length: 60 }).map((_, i) => (
                            <div key={i} className="border border-teal-300 bg-teal-400/40 rounded-sm"></div>
                          ))}
                        </div>
                      </div>

                      {/* VayuPod Branding */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/95 rounded-lg py-3 px-4 text-center border-2 border-white shadow-lg">
                          <div className="text-2xl font-bold text-teal-800">VayuPod</div>
                        </div>
                      </div>
                    </div>

                    {/* HEPA Filter Label */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-700 text-white px-4 py-2 rounded-lg text-center shadow-lg">
                      <div className="text-sm font-bold">HEPA + CARBON</div>
                    </div>
                  </div>

                  {/* Base Section */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-200 to-gray-300 rounded-b-2xl border-2 border-gray-400 border-t-0 professional-shadow">
                    
                    {/* Weatherproof Label */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 bg-gray-600 text-white px-3 py-1 rounded text-xs font-bold">
                      WEATHERPROOF
                    </div>
                    
                    {/* Ventilation Grille */}
                    <div className="absolute bottom-2 left-4 right-4 h-6 bg-gray-800 rounded-lg professional-shadow">
                      <div className="grid grid-cols-12 gap-1 h-full p-1">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div key={i} className="bg-gray-600 rounded"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Air Flow Indicators - Pure Air Out (Right Side) */}
                <div className="absolute right-0 top-1/3 flex flex-col items-center">
                  {/* Air particles */}
                  <div className="space-y-3 mb-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div 
                        key={`out-${i}`}
                        className="w-10 h-3 bg-green-500 rounded-full air-flow-out opacity-70"
                        style={{ animationDelay: `${i * 0.6}s` }}
                      />
                    ))}
                  </div>
                  
                  {/* Pure Air Text */}
                  <div className="text-green-400 text-xs font-bold text-center">
                    <div>PURE</div>
                    <div>AIR</div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="mt-12 text-center">
                  <h3 className="text-2xl font-bold mb-2 text-white">VayuPod Gen-2</h3>
                  <p className="text-gray-300 mb-6">Professional Air Purification System</p>
                  
                  {/* Status Indicators */}
                  <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                    <div className="flex items-center gap-2 text-yellow-400 bg-gray-800/60 rounded-lg px-3 py-2 border border-yellow-400/20">
                      <Sun className="w-4 h-4" />
                      <span className="text-xs font-medium">Solar</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-400 bg-gray-800/60 rounded-lg px-3 py-2 border border-blue-400/20">
                      <Wifi className="w-4 h-4" />
                      <span className="text-xs font-medium">5G+AI</span>
                    </div>
                    <div className="flex items-center gap-2 text-teal-400 bg-gray-800/60 rounded-lg px-3 py-2 border border-teal-400/20">
                      <Filter className="w-4 h-4" />
                      <span className="text-xs font-medium">HEPA</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 bg-gray-800/60 rounded-lg px-3 py-2 border border-green-400/20">
                      <Gauge className="w-4 h-4" />
                      <span className="text-xs font-medium">Weather</span>
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

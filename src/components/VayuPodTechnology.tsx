
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
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px rgba(20, 184, 166, 0.5); }
          50% { box-shadow: 0 0 25px rgba(20, 184, 166, 0.8); }
        }
        @keyframes airflow {
          0% { opacity: 0.3; transform: translateY(0px); }
          50% { opacity: 0.8; transform: translateY(-15px); }
          100% { opacity: 0.3; transform: translateY(-30px); }
        }
        @keyframes fanRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        .glow-animation {
          animation: glow 3s infinite;
        }
        .airflow-animation {
          animation: airflow 2s infinite;
        }
        .fan-rotate {
          animation: fanRotate 3s linear infinite;
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
            {/* Realistic VayuPod Air Purifier Machine */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 h-[600px] flex items-center justify-center glass-effect overflow-hidden">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="grid grid-cols-8 grid-rows-12 h-full w-full">
                    {Array.from({ length: 96 }).map((_, i) => (
                      <div key={i} className="border border-gray-600"></div>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 text-center text-white">
                  {/* Main VayuPod Machine */}
                  <div className="relative w-64 h-96 mx-auto">
                    
                    {/* Solar Panel Assembly - Top Mounted */}
                    <div className="absolute -top-6 left-8 right-8 h-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg border-2 border-gray-700 shadow-xl">
                      {/* Solar Cell Grid */}
                      <div className="grid grid-cols-12 gap-0.5 h-full p-1">
                        {Array.from({ length: 36 }).map((_, i) => (
                          <div key={i} className="bg-gradient-to-br from-blue-900 to-gray-900 rounded-sm border border-gray-700">
                            <div className="w-full h-full bg-gradient-to-br from-blue-800 to-gray-800 rounded-sm opacity-80"></div>
                          </div>
                        ))}
                      </div>
                      {/* Solar Power Indicator */}
                      <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-1">
                        <Sun className="h-3 w-3 text-white" />
                      </div>
                    </div>

                    {/* Main Housing - Cylindrical Air Purifier Design */}
                    <div className="absolute inset-x-4 top-4 bottom-8 bg-gradient-to-b from-teal-600 via-teal-700 to-teal-800 rounded-3xl shadow-2xl border-2 border-teal-500 relative glow-animation">
                      
                      {/* Top Air Intake with Fan */}
                      <div className="absolute top-4 left-4 right-4 h-20 bg-gray-900 rounded-2xl border-2 border-gray-600 overflow-hidden">
                        {/* Intake Grille */}
                        <div className="absolute inset-2 bg-gray-800 rounded-xl">
                          <div className="grid grid-cols-8 gap-1 h-full p-2">
                            {Array.from({ length: 32 }).map((_, i) => (
                              <div key={i} className="bg-gray-700 rounded-sm border border-gray-600"></div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Fan Blades */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12">
                          <div className="w-full h-full fan-rotate">
                            {Array.from({ length: 6 }).map((_, i) => (
                              <div
                                key={i}
                                className="absolute top-1/2 left-1/2 w-5 h-1 bg-gray-400 origin-left"
                                style={{
                                  transform: `translate(-50%, -50%) rotate(${i * 60}deg)`
                                }}
                              ></div>
                            ))}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-500 rounded-full"></div>
                          </div>
                        </div>
                        
                        {/* Airflow Indicator */}
                        <div className="absolute top-1 right-1 w-3 h-3 bg-green-400 rounded-full pulse-animation"></div>
                      </div>

                      {/* Status Display Panel */}
                      <div className="absolute top-28 left-6 right-6 h-16 bg-gray-900 rounded-xl border border-gray-600 p-3">
                        <div className="flex items-center justify-between h-full">
                          {/* Air Quality Display */}
                          <div className="text-left">
                            <div className="text-green-400 text-xs font-bold">AQI: GOOD</div>
                            <div className="text-teal-300 text-xs">PM2.5: 12 μg/m³</div>
                          </div>
                          
                          {/* Status LEDs */}
                          <div className="flex gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full pulse-animation"></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full pulse-animation" style={{ animationDelay: '0.5s' }}></div>
                            <div className="w-2 h-2 bg-yellow-400 rounded-full pulse-animation" style={{ animationDelay: '1s' }}></div>
                          </div>
                        </div>
                      </div>

                      {/* Filter Chamber Indicator */}
                      <div className="absolute top-48 left-6 right-6 h-20 bg-teal-900 rounded-xl border border-teal-600 p-3">
                        <div className="text-center">
                          <Filter className="h-6 w-6 text-teal-300 mx-auto mb-1" />
                          <div className="text-teal-200 text-xs font-semibold">HEPA FILTER</div>
                          <div className="text-teal-300 text-xs">99.97% Efficiency</div>
                        </div>
                      </div>

                      {/* Edge AI & Connectivity Module */}
                      <div className="absolute bottom-20 left-6 right-6 h-16 bg-gray-900 rounded-xl border border-gray-600 p-3">
                        <div className="flex items-center justify-between h-full">
                          {/* Edge AI */}
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-cyan-400 rounded-full relative pulse-animation">
                              <div className="absolute inset-1 bg-white rounded-full"></div>
                            </div>
                            <span className="text-cyan-400 text-xs font-bold">EDGE AI</span>
                          </div>
                          
                          {/* 5G Signal */}
                          <div className="flex items-center gap-2">
                            <Wifi className="h-4 w-4 text-blue-400 pulse-animation" />
                            <span className="text-blue-400 text-xs font-bold">5G</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Air Outlet */}
                      <div className="absolute bottom-4 left-4 right-4 h-12 bg-gray-900 rounded-xl border border-gray-600">
                        <div className="grid grid-cols-10 gap-1 h-full p-2">
                          {Array.from({ length: 30 }).map((_, i) => (
                            <div key={i} className="bg-gray-700 rounded-sm"></div>
                          ))}
                        </div>
                        
                        {/* Clean Air Output Visualization */}
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1">
                          {Array.from({ length: 7 }).map((_, i) => (
                            <div
                              key={i}
                              className="w-1 h-6 bg-teal-300 rounded-full airflow-animation"
                              style={{
                                animationDelay: `${i * 0.2}s`
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>

                      {/* Product Branding */}
                      <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 -rotate-90 origin-left">
                        <div className="text-white text-sm font-bold tracking-widest opacity-90">VAYUPOD</div>
                      </div>
                    </div>

                    {/* Technical Specifications Callouts */}
                    <div className="absolute -top-8 -right-12 text-right">
                      <div className="text-xs text-yellow-300 font-semibold mb-1">Solar Powered</div>
                      <div className="text-xs text-yellow-300">Self-Sustaining</div>
                      <div className="w-8 h-0.5 bg-yellow-300 ml-auto mt-1"></div>
                    </div>
                    
                    <div className="absolute top-1/4 -right-16 text-right">
                      <div className="text-xs text-blue-300 font-semibold mb-1">Edge AI Processing</div>
                      <div className="text-xs text-blue-300 mb-1">5G Connectivity</div>
                      <div className="w-10 h-0.5 bg-blue-300 ml-auto mt-1"></div>
                    </div>
                    
                    <div className="absolute top-1/2 -right-14 text-right">
                      <div className="text-xs text-green-300 font-semibold mb-1">HEPA Filtration</div>
                      <div className="text-xs text-green-300 mb-1">PM Monitoring</div>
                      <div className="w-8 h-0.5 bg-green-300 ml-auto mt-1"></div>
                    </div>
                    
                    <div className="absolute bottom-1/4 -right-12 text-right">
                      <div className="text-xs text-teal-300 font-semibold mb-1">Weatherproof</div>
                      <div className="text-xs text-teal-300 mb-1">IP65 Rated</div>
                      <div className="w-8 h-0.5 bg-teal-300 ml-auto mt-1"></div>
                    </div>

                    {/* Data Stream Visualization */}
                    <div className="absolute top-1/3 -right-20 flex flex-col gap-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex gap-1"
                        >
                          <div className="w-2 h-0.5 bg-cyan-300 rounded-full opacity-60"></div>
                          <div className="w-3 h-0.5 bg-cyan-400 rounded-full opacity-80"></div>
                          <div className="w-2 h-0.5 bg-cyan-300 rounded-full opacity-60"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-12">
                    <h3 className="text-3xl font-bold mb-2 text-teal-300">VayuPod Gen-2</h3>
                    <p className="text-gray-300 mb-4">Industrial Air Purification System</p>
                    <div className="grid grid-cols-2 gap-3 text-sm max-w-xs mx-auto">
                      <span className="text-yellow-400 flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        Solar Powered
                      </span>
                      <span className="text-blue-400 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        Edge AI + 5G
                      </span>
                      <span className="text-green-400 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        HEPA Filter
                      </span>
                      <span className="text-teal-400 flex items-center gap-2">
                        <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                        IP65 Rated
                      </span>
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

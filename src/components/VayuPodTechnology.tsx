
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
        @keyframes solarPulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        .glow-animation {
          animation: glow 3s infinite;
        }
        .solar-pulse {
          animation: solarPulse 3s infinite;
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
            {/* Exact VayuPod Design Matching the Image */}
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

                <div className="relative z-10 text-center">
                  {/* Main VayuPod Structure - Exact Match */}
                  <div className="relative w-48 h-96 mx-auto">
                    
                    {/* Solar Panel - Top Section */}
                    <div className="absolute top-0 left-0 right-0 h-12 bg-white rounded-t-xl border-2 border-gray-300 shadow-lg">
                      {/* Solar Panel Grid */}
                      <div className="grid grid-cols-6 grid-rows-2 gap-0.5 h-full p-1.5">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div key={i} className="bg-gradient-to-br from-blue-900 via-gray-800 to-blue-800 rounded-sm border border-gray-600 solar-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Main White Housing */}
                    <div className="absolute top-12 left-0 right-0 bottom-16 bg-white rounded-none border-2 border-gray-300 shadow-xl">
                      
                      {/* Edge-AI + 5G Label */}
                      <div className="absolute top-4 left-4 right-4 text-center">
                        <div className="text-gray-700 text-sm font-bold tracking-wide">Edge-AI + 5G</div>
                      </div>

                      {/* Sensor Module */}
                      <div className="absolute top-12 right-2 w-16 h-12 bg-gray-100 rounded-lg border border-gray-300 shadow-md">
                        <div className="flex items-center justify-center h-full">
                          <div className="text-xs font-semibold text-gray-600 text-center leading-tight">SENSORS</div>
                        </div>
                        {/* Sensor Indicator Light */}
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full pulse-animation border-2 border-white"></div>
                      </div>

                      {/* Main Filter Section - Teal with Grid Pattern */}
                      <div className="absolute top-16 left-4 right-4 bottom-20 bg-gradient-to-b from-teal-600 to-teal-700 rounded-xl border-2 border-teal-500 overflow-hidden">
                        {/* Grid Pattern */}
                        <div className="absolute inset-2">
                          <div className="grid grid-cols-8 grid-rows-12 h-full w-full gap-0.5">
                            {Array.from({ length: 96 }).map((_, i) => (
                              <div key={i} className="border border-teal-400 opacity-60"></div>
                            ))}
                          </div>
                        </div>
                        
                        {/* VayuPod Branding */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-white text-2xl font-bold tracking-wider drop-shadow-lg">VayuPod</div>
                        </div>

                        {/* Air Quality Indicator */}
                        <div className="absolute top-2 right-2 flex gap-1">
                          <div className="w-2 h-2 bg-green-300 rounded-full pulse-animation"></div>
                          <div className="w-2 h-2 bg-blue-300 rounded-full pulse-animation" style={{ animationDelay: '0.5s' }}></div>
                          <div className="w-2 h-2 bg-yellow-300 rounded-full pulse-animation" style={{ animationDelay: '1s' }}></div>
                        </div>
                      </div>

                      {/* HEPA + Carbon Filter Label */}
                      <div className="absolute bottom-6 left-4 right-4 text-center">
                        <div className="text-gray-700 text-sm font-bold tracking-wide leading-tight">
                          HEPA + CARBON<br />FILTER
                        </div>
                      </div>
                    </div>

                    {/* Weatherproof Base Section */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-white rounded-b-xl border-2 border-gray-300 shadow-lg">
                      {/* Weatherproof Label */}
                      <div className="absolute top-2 left-4 right-4 text-center">
                        <div className="text-gray-700 text-sm font-bold tracking-wide">WEATHERPROOF</div>
                      </div>
                      
                      {/* Base Ventilation Grilles */}
                      <div className="absolute bottom-2 left-8 right-8 h-6 bg-gray-800 rounded-lg">
                        <div className="grid grid-cols-8 gap-1 h-full p-1">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="bg-gray-600 rounded-sm"></div>
                          ))}
                        </div>
                      </div>

                      {/* Stability Feet */}
                      <div className="absolute -bottom-1 left-2 w-4 h-2 bg-gray-600 rounded-b-md"></div>
                      <div className="absolute -bottom-1 right-2 w-4 h-2 bg-gray-600 rounded-b-md"></div>
                    </div>

                    {/* Status Indicators and Connectivity */}
                    <div className="absolute -right-20 top-1/4 space-y-4">
                      {/* 5G Signal */}
                      <div className="flex items-center gap-2 text-blue-400">
                        <Wifi className="h-4 w-4 pulse-animation" />
                        <span className="text-xs font-bold">5G</span>
                      </div>
                      
                      {/* Edge AI */}
                      <div className="flex items-center gap-2 text-cyan-400">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full pulse-animation"></div>
                        <span className="text-xs font-bold">EDGE AI</span>
                      </div>
                      
                      {/* Solar Power */}
                      <div className="flex items-center gap-2 text-yellow-400">
                        <Sun className="h-4 w-4 solar-pulse" />
                        <span className="text-xs font-bold">SOLAR</span>
                      </div>
                    </div>

                    {/* Data Transmission Lines */}
                    <div className="absolute -right-16 top-1/3 flex flex-col gap-1">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex gap-1"
                        >
                          <div className="w-1 h-0.5 bg-cyan-300 rounded-full opacity-60"></div>
                          <div className="w-2 h-0.5 bg-cyan-400 rounded-full opacity-80"></div>
                          <div className="w-1 h-0.5 bg-cyan-300 rounded-full opacity-60"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-3xl font-bold mb-2 text-white">VayuPod Gen-2</h3>
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
                      <span className="text-teal-400 flex items-center gap-2">
                        <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                        HEPA Filter
                      </span>
                      <span className="text-green-400 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Weatherproof
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

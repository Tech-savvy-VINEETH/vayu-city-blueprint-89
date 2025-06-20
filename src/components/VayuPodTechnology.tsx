
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
          {/* Professional 3D VayuPod Visualization */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 h-96 flex items-center justify-center glass-effect overflow-hidden">
              {/* Background city lights effect */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-60"></div>
                <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-red-400 to-transparent opacity-40"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
              </div>

              <div className="relative z-10 text-center text-white">
                <div className="relative perspective-1000">
                  {/* Main VayuPod Body - Professional Design */}
                  <div className="relative w-48 h-64 mx-auto transform-style-preserve-3d">
                    {/* Main cylindrical body */}
                    <div className="absolute inset-x-8 top-8 bottom-8 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-700 rounded-3xl shadow-2xl border border-gray-500/30">
                      {/* Top cap */}
                      <div className="absolute -top-2 left-2 right-2 h-6 bg-gradient-to-b from-gray-500 to-gray-600 rounded-full shadow-lg"></div>
                      
                      {/* Air intake grille */}
                      <div className="absolute top-6 left-4 right-4 h-20 bg-gray-800 rounded-lg overflow-hidden">
                        {/* Hexagonal mesh pattern */}
                        <div className="grid grid-cols-6 gap-0.5 h-full p-2">
                          {Array.from({ length: 36 }).map((_, i) => (
                            <div key={i} className="bg-gray-700 rounded-sm opacity-80"></div>
                          ))}
                        </div>
                        
                        {/* Glowing AI core */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50">
                            <div className="absolute inset-2 bg-white rounded-full opacity-80"></div>
                            <div className="absolute inset-1 border-2 border-cyan-300 rounded-full animate-spin"></div>
                          </div>
                        </div>
                      </div>

                      {/* VayuPod branding panel */}
                      <div className="absolute top-32 left-2 right-2 h-16 bg-gradient-to-r from-gray-600 to-gray-500 rounded-lg flex items-center justify-center shadow-inner">
                        <div className="text-white font-bold text-lg tracking-wider">VayuPod</div>
                      </div>

                      {/* Status indicators */}
                      <div className="absolute bottom-12 left-4 right-4 flex justify-between">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                      </div>

                      {/* Air outlet */}
                      <div className="absolute bottom-4 left-4 right-4 h-8 bg-gray-800 rounded-lg">
                        <div className="grid grid-cols-8 gap-0.5 h-full p-1">
                          {Array.from({ length: 16 }).map((_, i) => (
                            <div key={i} className="bg-gray-700 rounded-sm"></div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom cap */}
                      <div className="absolute -bottom-2 left-2 right-2 h-6 bg-gradient-to-b from-gray-600 to-gray-500 rounded-full shadow-lg"></div>
                    </div>

                    {/* Solar panel indicator */}
                    <div className="absolute -top-2 left-12 right-12 h-4 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-lg border border-blue-600/50">
                      <div className="grid grid-cols-4 gap-0.5 h-full p-0.5">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="bg-blue-700 rounded-sm"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating feature indicators */}
                  <div className="absolute -top-8 -right-8 w-12 h-12 bg-yellow-400 rounded-full animate-pulse flex items-center justify-center shadow-lg shadow-yellow-400/30">
                    <Sun className="h-6 w-6 text-yellow-800" />
                  </div>
                  <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-blue-400 rounded-full animate-pulse flex items-center justify-center shadow-lg shadow-blue-400/30">
                    <Wifi className="h-6 w-6 text-blue-800" />
                  </div>
                  <div className="absolute top-1/2 -right-12 w-10 h-10 bg-green-400 rounded-full animate-pulse flex items-center justify-center shadow-lg shadow-green-400/30">
                    <Filter className="h-5 w-5 text-green-800" />
                  </div>

                  {/* Air flow visualization */}
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-8 bg-cyan-300 rounded-full opacity-60 animate-pulse absolute"
                        style={{
                          left: `${i * 8 - 8}px`,
                          animationDelay: `${i * 0.3}s`,
                          animation: 'fadeInOut 2s infinite'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-2">VayuPod Gen-2</h3>
                  <p className="text-gray-300">Next-gen air purification</p>
                  <div className="flex justify-center gap-4 mt-4 text-sm">
                    <span className="text-green-400">● Active</span>
                    <span className="text-blue-400">● Connected</span>
                    <span className="text-yellow-400">● Solar Powered</span>
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

      <style jsx>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; transform: translateY(0); }
          50% { opacity: 0.8; transform: translateY(-10px); }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  );
};

export default VayuPodTechnology;

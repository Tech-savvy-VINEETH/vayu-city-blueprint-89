
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
          {/* 3D VayuPod Visualization */}
          <div className="relative">
            <div className="bg-gradient-to-br from-vayu-blue to-vayu-blue-dark rounded-2xl p-8 h-96 flex items-center justify-center glass-effect">
              <div className="text-center text-white">
                <div className="relative">
                  {/* VayuPod representation */}
                  <div className="w-32 h-48 bg-gradient-to-b from-vayu-mint to-vayu-mint-dark rounded-lg mx-auto mb-4 relative overflow-hidden">
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white/20 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-white/30 rounded-lg"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-2 bg-white/40 rounded-full"></div>
                  </div>
                  
                  {/* Feature indicators */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse flex items-center justify-center">
                    <Sun className="h-4 w-4 text-yellow-800" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-blue-400 rounded-full animate-pulse flex items-center justify-center">
                    <Wifi className="h-4 w-4 text-blue-800" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">VayuPod Gen-2</h3>
                <p className="text-gray-300">Next-gen air purification</p>
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
  );
};

export default VayuPodTechnology;

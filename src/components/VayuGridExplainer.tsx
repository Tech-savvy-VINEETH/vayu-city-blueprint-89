
import React, { useState } from 'react';
import { Brain, Cpu, Shield, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const VayuGridExplainer = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: Brain,
      title: 'AI Forecasting',
      description: 'Predictive models forecast pollution hotspots 48 hours ahead',
      details: 'Our AeroBrain algorithms analyze traffic patterns, weather conditions, and historical data to predict pollution levels with 94% accuracy.'
    },
    {
      icon: Cpu,
      title: 'Edge VayuPods',
      description: 'Distributed air purification units with real-time monitoring',
      details: 'Solar-powered units with HEPA+Carbon filters, PM sensors, and 5G connectivity for instant air quality response.'
    },
    {
      icon: Shield,
      title: 'Exposure Tracker',
      description: 'Personal pollution exposure monitoring and route optimization',
      details: 'Track your daily exposure levels and get personalized route recommendations to minimize pollution intake.'
    },
    {
      icon: Activity,
      title: 'AeroBrain Models',
      description: 'Advanced ML models for traffic-pollution correlation analysis',
      details: 'Deep learning models that understand the complex relationship between traffic flow and air quality patterns.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-vayu-dark mb-6">
            What is <span className="text-gradient-vayu">VayuGrid</span>?
          </h2>
          <p className="text-xl text-vayu-blue-dark max-w-3xl mx-auto">
            An intelligent network of air purification pods connected by AI to create pollution-neutral corridors across Indian cities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Visualization Area */}
          <div className="relative">
            <div className="bg-gradient-to-br from-vayu-dark to-vayu-dark-light rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-24 h-24 bg-vayu-mint rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse-mint">
                  <Brain className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Smart City Grid</h3>
                <p className="text-gray-300">3D visualization coming soon</p>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="w-8 h-8 bg-vayu-mint/30 rounded-lg animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                  hoveredCard === index ? 'border-vayu-mint bg-vayu-mint/5' : 'border-gray-200'
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg transition-colors duration-300 ${
                      hoveredCard === index ? 'bg-vayu-mint text-white' : 'bg-vayu-mint/10 text-vayu-mint'
                    }`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-vayu-dark mb-2">{feature.title}</h3>
                      <p className="text-vayu-blue-dark mb-2">{feature.description}</p>
                      {hoveredCard === index && (
                        <p className="text-sm text-vayu-blue animate-fade-in">{feature.details}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VayuGridExplainer;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Download, Map } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 gradient-vayu-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-vayu-mint/10 via-transparent to-vayu-blue/20"></div>
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-vayu-mint/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-vayu-blue/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            India's First{' '}
            <span className="text-gradient-vayu">AI-Powered</span>
            <br />
            Pollution-Neutral Traffic Grid
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            AeroSage Vayu is cleaning air, one corridor at a time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button className="bg-vayu-mint hover:bg-vayu-mint-dark text-white px-8 py-3 rounded-full text-lg font-medium hover:scale-105 transition-all duration-200 flex items-center gap-2">
              <Map className="h-5 w-5" />
              View Live City Zones
            </Button>
            
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-vayu-dark px-8 py-3 rounded-full text-lg font-medium hover:scale-105 transition-all duration-200 flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download Investor Deck
            </Button>
            
            <Button variant="ghost" className="text-white hover:text-vayu-mint px-8 py-3 rounded-full text-lg font-medium hover:scale-105 transition-all duration-200 flex items-center gap-2">
              <Play className="h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-vayu-mint mb-2">2.5M+</div>
              <div className="text-gray-300">Citizens Benefited</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-vayu-mint mb-2">150+</div>
              <div className="text-gray-300">VayuPods Active</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-vayu-mint mb-2">85%</div>
              <div className="text-gray-300">Pollution Reduction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

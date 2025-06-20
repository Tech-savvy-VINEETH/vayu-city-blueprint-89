
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';

interface ApiInfoCardProps {
  cityCount: number;
}

const ApiInfoCard: React.FC<ApiInfoCardProps> = ({ cityCount }) => {
  return (
    <Card className="mt-8 md:mt-12 bg-white/5 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
          <Zap className="h-5 w-5 text-vayu-mint" />
          All-India Live Integration Status
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300">
        <p className="mb-4 text-sm md:text-base">
          ✅ **Enhanced with comprehensive Indian city coverage:**
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
            <li>✅ Google Maps Directions API for all Indian routes</li>
            <li>✅ Visual Crossing Weather API for accurate AQI</li>
            <li>✅ Geolocation DB for precise location detection</li>
            <li>✅ {cityCount}+ Indian cities with live data</li>
          </ul>
          <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
            <li>✅ Real-time traffic optimization across India</li>
            <li>✅ Enhanced VayuScore calculation</li>
            <li>✅ Superior to standard mapping solutions</li>
            <li>✅ Fastest loading with cached city data</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiInfoCard;

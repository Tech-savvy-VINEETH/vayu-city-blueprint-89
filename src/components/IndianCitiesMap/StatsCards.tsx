
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Wind, Activity, MapPin } from 'lucide-react';
import { VayuPodCity } from './types';

interface StatsCardsProps {
  vayuPodActiveCities: VayuPodCity[];
  totalCities: number;
  statesCount: number;
  averageReduction: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({ 
  vayuPodActiveCities, 
  totalCities, 
  statesCount, 
  averageReduction 
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
        <CardContent className="p-3 md:p-4">
          <Zap className="h-5 w-5 md:h-6 md:w-6 mx-auto mb-2 text-vayu-mint" />
          <div className="text-xl md:text-2xl font-bold text-white">{vayuPodActiveCities.length}</div>
          <div className="text-xs md:text-sm text-gray-300">VayuPod Cities</div>
        </CardContent>
      </Card>
      
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
        <CardContent className="p-3 md:p-4">
          <Wind className="h-5 w-5 md:h-6 md:w-6 mx-auto mb-2 text-green-400" />
          <div className="text-xl md:text-2xl font-bold text-white">{averageReduction}%</div>
          <div className="text-xs md:text-sm text-gray-300">Avg Reduction</div>
        </CardContent>
      </Card>
      
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
        <CardContent className="p-3 md:p-4">
          <Activity className="h-5 w-5 md:h-6 md:w-6 mx-auto mb-2 text-blue-400" />
          <div className="text-xl md:text-2xl font-bold text-white">{totalCities}</div>
          <div className="text-xs md:text-sm text-gray-300">Monitored Cities</div>
        </CardContent>
      </Card>
      
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
        <CardContent className="p-3 md:p-4">
          <MapPin className="h-5 w-5 md:h-6 md:w-6 mx-auto mb-2 text-yellow-400" />
          <div className="text-xl md:text-2xl font-bold text-white">{statesCount}</div>
          <div className="text-xs md:text-sm text-gray-300">States Covered</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, label, value, color }) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center hover:bg-white/15 transition-colors">
      <CardContent className="p-3 md:p-4">
        <Icon className={`h-5 w-5 md:h-6 md:w-6 mx-auto mb-2 ${color}`} />
        <div className="text-xl md:text-2xl font-bold text-white">{value}</div>
        <div className="text-xs md:text-sm text-gray-300">{label}</div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;


import React from 'react';
import { Sun, Cloud, CloudRain } from 'lucide-react';

interface WeatherIconProps {
  weather: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ weather }) => {
  switch (weather.toLowerCase()) {
    case 'clear':
    case 'sunny':
      return <Sun className="h-4 w-4 text-yellow-400" />;
    case 'cloudy':
    case 'partly cloudy':
      return <Cloud className="h-4 w-4 text-gray-400" />;
    case 'light rain':
    case 'rain':
      return <CloudRain className="h-4 w-4 text-blue-400" />;
    default:
      return <Sun className="h-4 w-4 text-yellow-400" />;
  }
};

export default WeatherIcon;

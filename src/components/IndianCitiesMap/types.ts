
export interface VayuPodCity {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  aqi: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  weather: string;
  vayuPodCount: number;
  pollutionReduction: number;
  category: 'good' | 'moderate' | 'unhealthy' | 'very_unhealthy' | 'hazardous';
  isVayuPodActive: boolean;
}

export interface IndianCitiesMapProps {
  onBack: () => void;
}

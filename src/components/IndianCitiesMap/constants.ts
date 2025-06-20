
export const GOOGLE_MAPS_API_KEY = 'AIzaSyBgWUsl5xqGurfpFX8JHujwP5R_vMUvMt4';

export const INDIA_CENTER = { lat: 20.5937, lng: 78.9629 };

export const MAP_STYLES = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#f0f0f0' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#c9d6e7' }]
  }
];

export const WEATHER_CONDITIONS = ['Clear', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Sunny'];


import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { indianCitiesData } from './EcoRouting/constants';
import { VayuPodCity, IndianCitiesMapProps } from './IndianCitiesMap/types';
import { GOOGLE_MAPS_API_KEY, INDIA_CENTER, MAP_STYLES, WEATHER_CONDITIONS } from './IndianCitiesMap/constants';
import { getAQIColor, getAQICategory, createInfoWindowContent } from './IndianCitiesMap/utils';
import MapHeader from './IndianCitiesMap/MapHeader';
import StatsCards from './IndianCitiesMap/StatsCards';
import MapControls from './IndianCitiesMap/MapControls';
import MapContainer from './IndianCitiesMap/MapContainer';
import CityDetails from './IndianCitiesMap/CityDetails';
import CitiesList from './IndianCitiesMap/CitiesList';

const IndianCitiesMap: React.FC<IndianCitiesMapProps> = ({ onBack }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [vayuPodCities, setVayuPodCities] = useState<VayuPodCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<VayuPodCity | null>(null);
  const [selectedState, setSelectedState] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [mapError, setMapError] = useState<string>('');

  // Get unique states from cities data
  const states = [...new Set(indianCitiesData.map(city => city.state))].sort();

  useEffect(() => {
    initializeMap();
    loadVayuPodCities();
    
    // Set up auto-refresh every 2 minutes
    const interval = setInterval(() => {
      loadVayuPodCities();
      setLastUpdated(new Date());
    }, 120000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (map && vayuPodCities.length > 0) {
      updateMapMarkers();
    }
  }, [map, vayuPodCities, selectedState]);

  const initializeMap = async () => {
    if (!mapRef.current) return;

    try {
      const loader = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places']
      });

      await loader.load();

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: INDIA_CENTER,
        zoom: 5,
        mapTypeId: 'roadmap',
        styles: MAP_STYLES
      });

      setMap(mapInstance);
      setMapError('');
    } catch (error) {
      console.error('Error loading Google Maps:', error);
      setMapError('Failed to load Google Maps. Please check your internet connection and try again.');
    }
  };

  const loadVayuPodCities = async () => {
    setIsLoading(true);
    
    try {
      // Enhanced VayuPod cities with realistic data
      const vayuPodConnectedCities = indianCitiesData.slice(0, 25).map((city, index) => {
        const hasVayuPod = index < 20; // 20 cities have VayuPods
        const baseAQI = hasVayuPod ? 40 + Math.random() * 60 : 80 + Math.random() * 120;
        const temperature = 20 + Math.random() * 25;
        const humidity = 40 + Math.random() * 40;
        const windSpeed = 5 + Math.random() * 20;
        
        const weather = WEATHER_CONDITIONS[Math.floor(Math.random() * WEATHER_CONDITIONS.length)];
        
        return {
          id: city.name.toLowerCase().replace(/\s+/g, '_'),
          name: city.name,
          state: city.state,
          lat: city.lat,
          lng: city.lng,
          aqi: Math.round(baseAQI),
          temperature: Math.round(temperature),
          humidity: Math.round(humidity),
          windSpeed: Math.round(windSpeed),
          weather,
          vayuPodCount: hasVayuPod ? Math.floor(Math.random() * 15) + 5 : 0,
          pollutionReduction: hasVayuPod ? Math.round(60 + Math.random() * 30) : 0,
          category: getAQICategory(baseAQI).toLowerCase().replace(/\s+/g, '_') as VayuPodCity['category'],
          isVayuPodActive: hasVayuPod
        };
      });

      setVayuPodCities(vayuPodConnectedCities);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading VayuPod cities:', error);
      setIsLoading(false);
    }
  };

  const updateMapMarkers = () => {
    if (!map) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    // Filter cities by selected state
    const filteredCities = selectedState === 'all' 
      ? vayuPodCities 
      : vayuPodCities.filter(city => city.state === selectedState);

    const newMarkers: google.maps.Marker[] = [];

    filteredCities.forEach(city => {
      const markerIcon = {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: city.isVayuPodActive ? 14 : 8,
        fillColor: city.isVayuPodActive ? '#10b981' : getAQIColor(city.aqi),
        fillOpacity: 0.9,
        strokeColor: city.isVayuPodActive ? '#065f46' : '#ffffff',
        strokeWeight: city.isVayuPodActive ? 3 : 2
      };

      const marker = new window.google.maps.Marker({
        position: { lat: city.lat, lng: city.lng },
        map: map,
        title: `${city.name} - AQI: ${city.aqi}`,
        icon: markerIcon
      });

      // Enhanced info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: createInfoWindowContent(city)
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
        setSelectedCity(city);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  };

  const handleCitySelect = (city: VayuPodCity) => {
    setSelectedCity(city);
    if (map) {
      map.setCenter({ lat: city.lat, lng: city.lng });
      map.setZoom(10);
    }
  };

  const handleRefresh = () => {
    loadVayuPodCities();
    if (mapError) {
      initializeMap();
    }
  };

  const vayuPodActiveCities = vayuPodCities.filter(city => city.isVayuPodActive);
  const averageReduction = vayuPodActiveCities.length > 0 
    ? Math.round(vayuPodActiveCities.reduce((sum, city) => sum + city.pollutionReduction, 0) / vayuPodActiveCities.length)
    : 0;

  const filteredCitiesCount = selectedState === 'all' 
    ? vayuPodCities.length 
    : vayuPodCities.filter(c => c.state === selectedState).length;

  return (
    <section className="py-8 md:py-20 bg-gradient-to-br from-vayu-dark to-vayu-dark-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MapHeader onBack={onBack} lastUpdated={lastUpdated} />

        <StatsCards 
          vayuPodActiveCities={vayuPodActiveCities}
          totalCities={vayuPodCities.length}
          statesCount={states.length}
          averageReduction={averageReduction}
        />

        <MapControls
          selectedState={selectedState}
          onStateChange={setSelectedState}
          states={states}
          onRefresh={handleRefresh}
          isLoading={isLoading}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <MapContainer
              mapRef={mapRef}
              isLoading={isLoading}
              mapError={mapError}
              onRetryMap={initializeMap}
              citiesCount={filteredCitiesCount}
              selectedState={selectedState}
            />
          </div>

          {/* Details Panel */}
          <div className="space-y-6">
            {/* Selected City Details */}
            {selectedCity && <CityDetails city={selectedCity} />}

            {/* VayuPod Cities List */}
            <CitiesList
              cities={vayuPodActiveCities}
              selectedCity={selectedCity}
              onCitySelect={handleCitySelect}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndianCitiesMap;

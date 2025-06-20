
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Car, Bike, Users, Loader2, Navigation } from 'lucide-react';
import { UserLocation } from './EcoRouting';

interface RouteInputFormProps {
  onSearch: (start: string, end: string, travelMode: string) => void;
  isLoading: boolean;
  userLocation: UserLocation | null;
}

const RouteInputForm: React.FC<RouteInputFormProps> = ({ onSearch, isLoading, userLocation }) => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [travelMode, setTravelMode] = useState('car');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startLocation && endLocation) {
      onSearch(startLocation, endLocation, travelMode);
    }
  };

  const useCurrentLocation = () => {
    if (userLocation) {
      setStartLocation(userLocation.address);
    }
  };

  // Popular Delhi NCR locations for autocomplete
  const popularLocations = [
    'Connaught Place, New Delhi',
    'India Gate, New Delhi',
    'Red Fort, New Delhi',
    'Qutub Minar, New Delhi',
    'Lotus Temple, New Delhi',
    'Cyber Hub, Gurgaon',
    'DLF Phase 1, Gurgaon',
    'Sector 29, Gurgaon',
    'Kingdom of Dreams, Gurgaon',
    'Ambience Mall, Gurgaon',
    'Aerocity, New Delhi',
    'Nehru Place, New Delhi',
    'Khan Market, New Delhi',
    'Karol Bagh, New Delhi',
    'Rajouri Garden, New Delhi',
    'Dwarka Sector 21, New Delhi',
    'Janakpuri, New Delhi',
    'Lajpat Nagar, New Delhi',
    'Greater Kailash, New Delhi',
    'Saket, New Delhi'
  ];

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
          <MapPin className="h-5 w-5 text-vayu-mint" />
          Plan Your Clean Route
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Start Location */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              From
            </label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter starting location (e.g., Connaught Place, Delhi)..."
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 flex-1"
                list="start-suggestions"
              />
              {userLocation && (
                <Button
                  type="button"
                  onClick={useCurrentLocation}
                  size="sm"
                  className="bg-vayu-mint/20 hover:bg-vayu-mint/30 text-vayu-mint border-vayu-mint/40 shrink-0"
                  variant="outline"
                  title="Use current location"
                >
                  <Navigation className="h-4 w-4" />
                </Button>
              )}
            </div>
            <datalist id="start-suggestions">
              {popularLocations.map((location, index) => (
                <option key={index} value={location} />
              ))}
            </datalist>
          </div>

          {/* End Location */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              To
            </label>
            <Input
              type="text"
              placeholder="Enter destination (e.g., India Gate, Delhi)..."
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              list="end-suggestions"
            />
            <datalist id="end-suggestions">
              {popularLocations.map((location, index) => (
                <option key={index} value={location} />
              ))}
            </datalist>
          </div>

          {/* Travel Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Travel Mode
            </label>
            <Select value={travelMode} onValueChange={setTravelMode}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="car" className="text-white">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4" />
                    Car / Taxi
                  </div>
                </SelectItem>
                <SelectItem value="bike" className="text-white">
                  <div className="flex items-center gap-2">
                    <Bike className="h-4 w-4" />
                    Bike / Scooter
                  </div>
                </SelectItem>
                <SelectItem value="public" className="text-white">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Public Transport
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <Button 
            type="submit" 
            className="w-full bg-vayu-mint hover:bg-vayu-mint-dark text-white"
            disabled={!startLocation || !endLocation || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Calculating with Live Data...
              </>
            ) : (
              'Find Eco Routes with Live AQI'
            )}
          </Button>
        </form>

        {/* Enhanced Tips */}
        <div className="mt-6 p-4 bg-vayu-mint/10 rounded-lg">
          <h4 className="text-sm font-medium text-vayu-mint mb-2">🌱 Live Route Intelligence</h4>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• Real-time Google Maps traffic integration</li>
            <li>• Live AQI data from pollution monitoring stations</li>
            <li>• Dynamic VayuScore calculation for clean routes</li>
            <li>• Pollution exposure minimization recommendations</li>
          </ul>
        </div>

        {/* Current Location Info */}
        {userLocation && (
          <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
            <div className="flex items-center gap-2 text-blue-400 text-sm">
              <Navigation className="h-4 w-4" />
              <span className="font-medium">Location Detected</span>
            </div>
            <p className="text-xs text-gray-300 mt-1">{userLocation.address}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RouteInputForm;

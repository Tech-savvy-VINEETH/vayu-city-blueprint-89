
import React, { useState } from 'react';
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

  const popularLocations = [
    'Connaught Place, Delhi',
    'Cyber Hub, Gurgaon',
    'Aerocity, Delhi',
    'India Gate, Delhi',
    'DLF Phase 1, Gurgaon',
    'Nehru Place, Delhi',
    'Khan Market, Delhi',
    'Karol Bagh, Delhi',
    'Sector 29, Gurgaon',
    'Rajouri Garden, Delhi'
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
                placeholder="Enter starting location..."
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
              placeholder="Enter destination..."
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
                Finding Clean Routes...
              </>
            ) : (
              'Find Eco Routes'
            )}
          </Button>
        </form>

        {/* Quick Tips */}
        <div className="mt-6 p-4 bg-vayu-mint/10 rounded-lg">
          <h4 className="text-sm font-medium text-vayu-mint mb-2">💡 Smart Route Tips</h4>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• Travel during VayuPod active hours (6 AM - 10 PM)</li>
            <li>• Avoid peak pollution times (8-10 AM, 6-8 PM)</li>
            <li>• Consider slightly longer routes for cleaner air</li>
            <li>• Check real-time AQI before starting your journey</li>
          </ul>
        </div>

        {/* Current Location Info */}
        {userLocation && (
          <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
            <div className="flex items-center gap-2 text-blue-400 text-sm">
              <Navigation className="h-4 w-4" />
              <span className="font-medium">Your Location Detected</span>
            </div>
            <p className="text-xs text-gray-300 mt-1">{userLocation.address}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RouteInputForm;

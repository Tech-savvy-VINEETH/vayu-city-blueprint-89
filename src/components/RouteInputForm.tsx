
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Car, Bike, Users, Loader2 } from 'lucide-react';

interface RouteInputFormProps {
  onSearch: (start: string, end: string, travelMode: string) => void;
  isLoading: boolean;
}

const RouteInputForm: React.FC<RouteInputFormProps> = ({ onSearch, isLoading }) => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [travelMode, setTravelMode] = useState('car');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startLocation && endLocation) {
      onSearch(startLocation, endLocation, travelMode);
    }
  };

  const popularLocations = [
    'Connaught Place, Delhi',
    'Cyber Hub, Gurgaon',
    'Aerocity, Delhi',
    'India Gate, Delhi',
    'DLF Phase 1, Gurgaon',
    'Nehru Place, Delhi'
  ];

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
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
            <Input
              type="text"
              placeholder="Enter starting location..."
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              list="start-suggestions"
            />
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
          <h4 className="text-sm font-medium text-vayu-mint mb-2">💡 Pro Tips</h4>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• Travel during VayuPod active hours (6 AM - 10 PM)</li>
            <li>• Avoid peak pollution times (8-10 AM, 6-8 PM)</li>
            <li>• Consider slightly longer routes for cleaner air</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteInputForm;

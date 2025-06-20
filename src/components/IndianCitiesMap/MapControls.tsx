
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MapControlsProps {
  selectedState: string;
  onStateChange: (state: string) => void;
  states: string[];
  onRefresh: () => void;
  isLoading: boolean;
}

const MapControls: React.FC<MapControlsProps> = ({
  selectedState,
  onStateChange,
  states,
  onRefresh,
  isLoading
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Select value={selectedState} onValueChange={onStateChange}>
        <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
          <SelectValue placeholder="Filter by state" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-600 text-white z-50">
          <SelectItem value="all" className="hover:bg-gray-700">All States</SelectItem>
          {states.map((state) => (
            <SelectItem key={state} value={state} className="hover:bg-gray-700">
              {state}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        onClick={onRefresh}
        disabled={isLoading}
        className="bg-vayu-mint hover:bg-vayu-mint-dark text-white"
      >
        {isLoading ? 'Refreshing...' : 'Refresh Data'}
      </Button>
    </div>
  );
};

export default MapControls;

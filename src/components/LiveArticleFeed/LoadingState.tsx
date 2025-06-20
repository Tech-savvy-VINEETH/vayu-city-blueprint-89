
import React from 'react';
import { RefreshCw } from 'lucide-react';

const LoadingState = () => {
  return (
    <div className="text-center py-8">
      <RefreshCw className="h-8 w-8 animate-spin mx-auto text-vayu-mint mb-2" />
      <p className="text-vayu-blue-dark">Fetching latest articles from multiple sources...</p>
    </div>
  );
};

export default LoadingState;

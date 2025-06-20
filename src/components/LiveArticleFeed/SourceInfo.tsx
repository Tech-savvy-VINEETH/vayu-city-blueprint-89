
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Rss, Calendar } from 'lucide-react';

const SourceInfo = () => {
  return (
    <Card className="p-4 bg-gray-50 border-gray-200">
      <CardContent className="p-0">
        <h4 className="text-sm font-bold text-gray-700 mb-2">Article Sources:</h4>
        <div className="flex flex-wrap gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Globe className="h-3 w-3 text-blue-600" />
            <span>Live News API</span>
          </div>
          <div className="flex items-center gap-1">
            <Rss className="h-3 w-3 text-orange-600" />
            <span>Environmental RSS Feeds</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-green-600" />
            <span>Environmental Reports</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SourceInfo;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  error: string;
}

const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <Card className="p-4 bg-yellow-50 border-yellow-200">
      <CardContent className="p-0">
        <div className="flex items-center gap-2 text-yellow-700">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ErrorState;

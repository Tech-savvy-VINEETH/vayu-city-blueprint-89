
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator, Map, TrendingUp } from 'lucide-react';

const VayuScoreSection = () => {
  const [score, setScore] = useState(0);
  const [personalScore, setPersonalScore] = useState(0);

  useEffect(() => {
    // Animate scores on load
    const timer = setTimeout(() => {
      setScore(145);
      setPersonalScore(89);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getScoreColor = (score: number) => {
    if (score <= 50) return 'text-green-500';
    if (score <= 100) return 'text-yellow-500';
    if (score <= 200) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score <= 50) return 'Excellent';
    if (score <= 100) return 'Good';
    if (score <= 200) return 'Moderate';
    return 'Poor';
  };

  return (
    <section id="vayuscore" className="py-20 bg-gradient-to-br from-vayu-mint/5 to-vayu-blue/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-vayu-dark mb-6">
            <span className="text-gradient-vayu">VayuScore</span> Dashboard
          </h2>
          <p className="text-xl text-vayu-blue-dark max-w-3xl mx-auto">
            Real-time pollution exposure tracking and zone-wise air quality scoring from 0-500 scale.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Score Gauges */}
          <div className="space-y-8">
            {/* Zone Score */}
            <Card className="p-8 bg-white shadow-lg border-2 border-gray-100">
              <CardContent className="p-0">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-vayu-dark mb-4">Current Zone Score</h3>
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#10b981"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(score / 500) * 251.2} 251.2`}
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}</div>
                        <div className="text-sm text-gray-600">{getScoreLabel(score)}</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-vayu-blue-dark">Connaught Place, Delhi</p>
                </div>
              </CardContent>
            </Card>

            {/* Personal Exposure */}
            <Card className="p-8 bg-gradient-to-br from-vayu-mint to-vayu-mint-dark text-white shadow-lg">
              <CardContent className="p-0">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Your Daily Exposure</h3>
                  <div className="text-5xl font-bold mb-2">{personalScore}</div>
                  <p className="text-vayu-mint-light mb-4">CleanAir Points Earned</p>
                  <div className="flex justify-center space-x-4 text-sm">
                    <div>
                      <div className="font-semibold">2.3 hrs</div>
                      <div className="opacity-80">Clean Air Time</div>
                    </div>
                    <div>
                      <div className="font-semibold">4.2 km</div>
                      <div className="opacity-80">Clean Routes</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Score Calculation & Tools */}
          <div className="space-y-6">
            <Card className="p-6 border-2 border-vayu-mint/20">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold text-vayu-dark mb-4">How VayuScore is Calculated</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-vayu-blue-dark">Real-time AQI Data</span>
                    <span className="font-semibold text-vayu-dark">40%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-vayu-blue-dark">Time Spent in Zone</span>
                    <span className="font-semibold text-vayu-dark">30%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-vayu-blue-dark">Route Optimization</span>
                    <span className="font-semibold text-vayu-dark">20%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-vayu-blue-dark">VayuPod Coverage</span>
                    <span className="font-semibold text-vayu-dark">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              <Button className="bg-vayu-mint hover:bg-vayu-mint-dark text-white p-6 rounded-xl font-medium flex items-center justify-center gap-3 hover:scale-105 transition-all duration-200">
                <Calculator className="h-6 w-6" />
                <div className="text-left">
                  <div className="font-bold">Simulate My Route</div>
                  <div className="text-sm opacity-90">Get exposure prediction</div>
                </div>
              </Button>

              <Button variant="outline" className="border-2 border-vayu-mint text-vayu-mint hover:bg-vayu-mint hover:text-white p-6 rounded-xl font-medium flex items-center justify-center gap-3 hover:scale-105 transition-all duration-200">
                <TrendingUp className="h-6 w-6" />
                <div className="text-left">
                  <div className="font-bold">Live VayuScore</div>
                  <div className="text-sm opacity-90">Real-time monitoring</div>
                </div>
              </Button>
            </div>

            {/* Score Scale */}
            <Card className="p-6 bg-gray-50">
              <CardContent className="p-0">
                <h4 className="font-bold text-vayu-dark mb-3">VayuScore Scale</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-green-600 font-medium">0-50: Excellent</span>
                    <span className="text-gray-600">Safe for all activities</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-yellow-600 font-medium">51-100: Good</span>
                    <span className="text-gray-600">Normal outdoor activities</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-orange-600 font-medium">101-200: Moderate</span>
                    <span className="text-gray-600">Sensitive groups take care</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-red-600 font-medium">201-500: Poor</span>
                    <span className="text-gray-600">Avoid prolonged exposure</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VayuScoreSection;

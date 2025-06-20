
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, ExternalLink, RefreshCw, Calendar, Clock } from 'lucide-react';
import { fetchLiveMediaMentions, getFallbackMediaMentions, MediaMention } from './LiveArticleFeed/mediaMentionsService';

const LiveMediaMentions = () => {
  const [mentions, setMentions] = useState<MediaMention[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    fetchMentions();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchMentions, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchMentions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLiveMediaMentions();
      setMentions(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch latest mentions');
      setMentions(getFallbackMediaMentions());
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'award':
        return 'bg-yellow-100 text-yellow-800';
      case 'feature article':
        return 'bg-blue-100 text-blue-800';
      case 'speaking engagement':
        return 'bg-green-100 text-green-800';
      case 'expert commentary':
        return 'bg-purple-100 text-purple-800';
      case 'industry analysis':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-vayu-dark flex items-center gap-2">
          <Award className="h-6 w-6 text-vayu-mint" />
          Live Media Mentions
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            Updated: {lastUpdated.toLocaleTimeString()}
          </div>
          <Button
            onClick={fetchMentions}
            disabled={loading}
            size="sm"
            className="bg-vayu-mint hover:bg-vayu-mint-dark text-white flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">{error}. Showing cached content.</p>
        </div>
      )}

      <div className="space-y-4">
        {mentions.map((mention, index) => (
          <Card 
            key={`${mention.outlet}-${index}`} 
            className="p-4 hover:shadow-md transition-all duration-200 border-l-4 border-l-vayu-mint"
          >
            <CardContent className="p-0">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="font-bold text-vayu-dark">{mention.outlet}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(mention.type)}`}>
                      {mention.type}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="h-3 w-3" />
                      {mention.date}
                    </div>
                  </div>
                  <h4 className="font-semibold text-vayu-blue-dark mb-2">{mention.title}</h4>
                  {mention.excerpt && (
                    <p className="text-gray-600 text-sm">{mention.excerpt}</p>
                  )}
                </div>
                {mention.url && (
                  <a 
                    href={mention.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 flex-shrink-0"
                  >
                    <ExternalLink className="h-4 w-4 text-vayu-blue hover:text-vayu-mint cursor-pointer transition-colors" />
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {loading && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 text-vayu-blue">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Fetching latest mentions...
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveMediaMentions;

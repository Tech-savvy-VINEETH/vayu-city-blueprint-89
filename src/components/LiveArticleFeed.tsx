
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, RefreshCw } from 'lucide-react';
import { Article } from './LiveArticleFeed/types';
import { fetchNewsAPI } from './LiveArticleFeed/newsApiService';
import { fetchRSSFeeds } from './LiveArticleFeed/rssService';
import { getEnvironmentalArticles, getFallbackArticles } from './LiveArticleFeed/environmentalService';
import ArticleCard from './LiveArticleFeed/ArticleCard';
import LoadingState from './LiveArticleFeed/LoadingState';
import ErrorState from './LiveArticleFeed/ErrorState';
import SourceInfo from './LiveArticleFeed/SourceInfo';

const LiveArticleFeed = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);

    try {
      const allArticles: Article[] = [];

      // 1. Fetch from News API
      try {
        const newsApiArticles = await fetchNewsAPI();
        allArticles.push(...newsApiArticles);
      } catch (err) {
        console.log('News API failed, continuing with other sources');
      }

      // 2. Fetch from RSS feeds
      try {
        const rssArticles = await fetchRSSFeeds();
        allArticles.push(...rssArticles);
      } catch (err) {
        console.log('RSS feeds failed, continuing with other sources');
      }

      // 3. Add environmental data articles
      const environmentalArticles = getEnvironmentalArticles();
      allArticles.push(...environmentalArticles);

      // Sort by date and limit to 6 articles
      const sortedArticles = allArticles
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 6);

      setArticles(sortedArticles);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to fetch some articles. Showing available content.');
      setArticles(getFallbackArticles());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-vayu-dark flex items-center gap-2">
          <Calendar className="h-6 w-6 text-vayu-mint" />
          Live Environmental Articles
        </h3>
        <Button
          onClick={fetchArticles}
          disabled={loading}
          className="bg-vayu-mint hover:bg-vayu-mint-dark text-white flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {error && <ErrorState error={error} />}

      {loading && <LoadingState />}

      <div className="space-y-6">
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} index={index} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button className="bg-vayu-mint hover:bg-vayu-mint-dark text-white px-8 py-3 rounded-full">
          View All Articles
        </Button>
      </div>

      <SourceInfo />
    </div>
  );
};

export default LiveArticleFeed;

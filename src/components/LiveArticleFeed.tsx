
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
import ArticlePagination from './LiveArticleFeed/ArticlePagination';

const ARTICLES_PER_PAGE = 6;

const LiveArticleFeed = () => {
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    updateDisplayedArticles();
  }, [allArticles, currentPage, showAll]);

  const updateDisplayedArticles = () => {
    if (showAll) {
      const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
      const endIndex = startIndex + ARTICLES_PER_PAGE;
      setDisplayedArticles(allArticles.slice(startIndex, endIndex));
    } else {
      setDisplayedArticles(allArticles.slice(0, 6));
    }
  };

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);

    try {
      const articles: Article[] = [];

      // 1. Fetch from News API
      try {
        const newsApiArticles = await fetchNewsAPI();
        articles.push(...newsApiArticles);
      } catch (err) {
        console.log('News API failed, continuing with other sources');
      }

      // 2. Fetch from RSS feeds
      try {
        const rssArticles = await fetchRSSFeeds();
        articles.push(...rssArticles);
      } catch (err) {
        console.log('RSS feeds failed, continuing with other sources');
      }

      // 3. Add environmental data articles
      const environmentalArticles = getEnvironmentalArticles();
      articles.push(...environmentalArticles);

      // Sort by date and store all articles
      const sortedArticles = articles
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setAllArticles(sortedArticles);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to fetch some articles. Showing available content.');
      setAllArticles(getFallbackArticles());
    } finally {
      setLoading(false);
    }
  };

  const handleViewAllArticles = () => {
    setShowAll(true);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE);

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
        {displayedArticles.map((article, index) => (
          <ArticleCard key={`${article.title}-${index}`} article={article} index={index} />
        ))}
      </div>

      {showAll && totalPages > 1 && (
        <ArticlePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={loading}
        />
      )}

      {!showAll && allArticles.length > 6 && (
        <div className="mt-8 text-center">
          <Button 
            onClick={handleViewAllArticles}
            className="bg-vayu-mint hover:bg-vayu-mint-dark text-white px-8 py-3 rounded-full"
          >
            View All Articles ({allArticles.length})
          </Button>
        </div>
      )}

      {showAll && (
        <div className="mt-8 text-center">
          <Button 
            onClick={() => {
              setShowAll(false);
              setCurrentPage(1);
            }}
            variant="outline"
            className="px-8 py-3 rounded-full"
          >
            Show Less
          </Button>
        </div>
      )}

      <SourceInfo />
    </div>
  );
};

export default LiveArticleFeed;

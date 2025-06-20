
import { Article } from './types';

const NEWS_API_KEY = '913801a26476421fb6fd9720f93c1a7b';

export const fetchNewsAPI = async (): Promise<Article[]> => {
  const queries = [
    'air quality pollution',
    'climate change weather',
    'environmental monitoring',
    'air pollution cities'
  ];

  const randomQuery = queries[Math.floor(Math.random() * queries.length)];
  
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=${encodeURIComponent(randomQuery)}&sortBy=publishedAt&pageSize=3&apiKey=${NEWS_API_KEY}`
  );

  if (!response.ok) {
    throw new Error(`News API Error: ${response.status}`);
  }

  const data = await response.json();
  
  return data.articles?.slice(0, 3).map((article: any) => ({
    title: article.title,
    excerpt: article.description || 'Click to read more about this environmental news.',
    date: new Date(article.publishedAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }),
    readTime: `${Math.floor(Math.random() * 4) + 3} min read`,
    category: 'News',
    source: article.source.name,
    url: article.url,
    sourceType: 'news-api' as const
  })) || [];
};

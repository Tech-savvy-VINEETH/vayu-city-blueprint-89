
import { Article } from './types';

export const fetchRSSFeeds = async (): Promise<Article[]> => {
  // Simulated RSS feed data with proper URLs
  const rssArticles = [
    {
      title: "EPA Releases New Air Quality Standards for Urban Areas",
      excerpt: "The Environmental Protection Agency announces updated guidelines for monitoring and improving air quality in metropolitan regions.",
      date: new Date(Date.now() - Math.random() * 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      readTime: "5 min read",
      category: "Policy",
      source: "EPA Environmental Feed",
      url: "https://www.epa.gov/naaqs",
      sourceType: 'rss' as const
    },
    {
      title: "WHO Global Air Quality Database 2024 Update",
      excerpt: "World Health Organization releases comprehensive data on air pollution levels across 100+ countries worldwide.",
      date: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      readTime: "6 min read",
      category: "Research",
      source: "WHO Environmental Health",
      url: "https://www.who.int/data/gho/data/themes/air-pollution",
      sourceType: 'rss' as const
    }
  ];

  return rssArticles;
};

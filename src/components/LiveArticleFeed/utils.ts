
import { Article } from './types';
import { Globe, Rss, Calendar } from 'lucide-react';

export const getSourceIcon = (sourceType: Article['sourceType']) => {
  switch (sourceType) {
    case 'news-api':
      return Globe;
    case 'rss':
      return Rss;
    case 'environmental':
      return Calendar;
    default:
      return Globe;
  }
};

export const getSourceLabel = (sourceType: Article['sourceType']) => {
  switch (sourceType) {
    case 'news-api':
      return 'Live News';
    case 'rss':
      return 'RSS Feed';
    case 'environmental':
      return 'Environmental';
    default:
      return 'Unknown';
  }
};

export const getSourceIconColor = (sourceType: Article['sourceType']) => {
  switch (sourceType) {
    case 'news-api':
      return 'text-blue-600';
    case 'rss':
      return 'text-orange-600';
    case 'environmental':
      return 'text-green-600';
    default:
      return 'text-gray-600';
  }
};

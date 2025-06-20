
export interface Article {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  source: string;
  url?: string;
  sourceType: 'news-api' | 'rss' | 'environmental';
}

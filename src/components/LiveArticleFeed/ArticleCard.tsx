
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Article } from './types';
import { getSourceIcon, getSourceLabel, getSourceIconColor } from './utils';

interface ArticleCardProps {
  article: Article;
  index: number;
}

const ArticleCard = ({ article, index }: ArticleCardProps) => {
  const SourceIcon = getSourceIcon(article.sourceType);
  const sourceLabel = getSourceLabel(article.sourceType);
  const iconColor = getSourceIconColor(article.sourceType);

  const handleReadMore = () => {
    if (article.url) {
      try {
        // Ensure the URL is properly formatted
        const url = article.url.startsWith('http') ? article.url : `https://${article.url}`;
        window.open(url, '_blank', 'noopener,noreferrer');
        console.log(`Opening article: ${article.title} at ${url}`);
      } catch (error) {
        console.error('Error opening article URL:', error);
        // Fallback: try to open the URL anyway
        window.open(article.url, '_blank', 'noopener,noreferrer');
      }
    } else {
      console.warn('No URL available for article:', article.title);
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-vayu-mint">
      <CardContent className="p-0">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <span className="bg-vayu-mint/10 text-vayu-mint px-3 py-1 rounded-full text-sm font-medium">
              {article.category}
            </span>
            <div className="flex items-center gap-1">
              <SourceIcon className={`h-4 w-4 ${iconColor}`} />
              <span className="text-xs text-gray-600">
                {sourceLabel}
              </span>
            </div>
          </div>
          <div className="text-sm text-vayu-blue flex items-center gap-4">
            <span>{article.date}</span>
            <span>{article.readTime}</span>
          </div>
        </div>
        
        <h4 
          className="text-xl font-bold text-vayu-dark mb-3 hover:text-vayu-mint transition-colors cursor-pointer"
          onClick={handleReadMore}
        >
          {article.title}
        </h4>
        
        <p className="text-vayu-blue-dark mb-4">{article.excerpt}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-vayu-blue">Source: {article.source}</span>
          <Button 
            variant="ghost" 
            className="text-vayu-mint hover:text-vayu-mint-dark p-0 h-auto font-medium hover:bg-transparent"
            onClick={handleReadMore}
          >
            Read Full Article
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;

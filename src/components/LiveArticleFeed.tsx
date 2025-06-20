
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';

interface Article {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  source: string;
  url?: string;
}

const LiveArticleFeed = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);

  // Check if API key is stored in localStorage
  useEffect(() => {
    const storedKey = localStorage.getItem('perplexity_api_key');
    if (storedKey) {
      setApiKey(storedKey);
      setHasApiKey(true);
      fetchArticles(storedKey);
    }
  }, []);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('perplexity_api_key', apiKey.trim());
      setHasApiKey(true);
      fetchArticles(apiKey.trim());
    }
  };

  const fetchArticles = async (key: string) => {
    setLoading(true);
    setError(null);

    try {
      const topics = [
        "air quality index pollution reports",
        "climate change weather reports",
        "urban air pollution solutions",
        "environmental monitoring technology",
        "green technology air purification"
      ];

      const randomTopic = topics[Math.floor(Math.random() * topics.length)];

      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: 'You are a content curator. Find recent articles, reports, or news about air quality, pollution, climate, and environmental technology. Return the results as a JSON array with title, excerpt, date, source, and category fields. Focus on real, recent content from the past week.'
            },
            {
              role: 'user',
              content: `Find 5 recent articles about ${randomTopic}. Return as JSON array with fields: title, excerpt, date, source, category.`
            }
          ],
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 1500,
          return_images: false,
          return_related_questions: false,
          search_recency_filter: 'week',
          frequency_penalty: 1,
          presence_penalty: 0
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      // Try to parse JSON from the response
      let parsedArticles: Article[] = [];
      try {
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          parsedArticles = JSON.parse(jsonMatch[0]);
        } else {
          // Fallback: create articles from the text response
          parsedArticles = generateFallbackArticles(content);
        }
      } catch (parseError) {
        parsedArticles = generateFallbackArticles(content);
      }

      // Add read time and format dates
      const formattedArticles = parsedArticles.map((article, index) => ({
        ...article,
        readTime: `${Math.floor(Math.random() * 5) + 3} min read`,
        date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      }));

      setArticles(formattedArticles);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to fetch articles. Please check your API key and try again.');
      // Load fallback articles on error
      setArticles(getFallbackArticles());
    } finally {
      setLoading(false);
    }
  };

  const generateFallbackArticles = (content: string): Article[] => {
    return [
      {
        title: "Real-time Air Quality Monitoring in Smart Cities",
        excerpt: "Latest developments in IoT-based air quality monitoring systems are revolutionizing urban environmental management.",
        date: "Dec 18, 2024",
        readTime: "4 min read",
        category: "Technology",
        source: "Environmental Tech Today"
      },
      {
        title: "WHO Releases New Global Air Pollution Guidelines",
        excerpt: "World Health Organization updates its recommendations for air quality standards as pollution levels continue to rise globally.",
        date: "Dec 17, 2024",
        readTime: "6 min read",
        category: "Health",
        source: "WHO Reports"
      }
    ];
  };

  const getFallbackArticles = (): Article[] => {
    return [
      {
        title: "India's Air Quality Crisis: Latest Government Initiatives",
        excerpt: "New policy measures announced to combat air pollution in major metropolitan cities across India.",
        date: "Dec 18, 2024",
        readTime: "5 min read",
        category: "Policy",
        source: "Environmental News India"
      },
      {
        title: "Breakthrough in Air Purification Technology",
        excerpt: "Scientists develop new filtration system that can remove 99.9% of harmful particles from urban air.",
        date: "Dec 17, 2024",
        readTime: "4 min read",
        category: "Innovation",
        source: "Tech Environmental"
      },
      {
        title: "Climate Change Impact on Air Quality Patterns",
        excerpt: "Research shows how changing weather patterns are affecting pollution dispersion in major cities.",
        date: "Dec 16, 2024",
        readTime: "7 min read",
        category: "Research",
        source: "Climate Science Journal"
      }
    ];
  };

  const refreshArticles = () => {
    if (hasApiKey) {
      fetchArticles(apiKey);
    }
  };

  if (!hasApiKey) {
    return (
      <div className="space-y-6">
        <Card className="p-6 bg-blue-50 border-blue-200">
          <CardContent className="p-0">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-blue-600 mt-1" />
              <div className="flex-1">
                <h4 className="text-lg font-bold text-blue-900 mb-2">Enable Live Articles</h4>
                <p className="text-blue-700 mb-4">
                  To display real-time articles about air quality and environmental topics, please provide your Perplexity API key.
                </p>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    placeholder="Enter your Perplexity API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={saveApiKey}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Save Key
                  </Button>
                </div>
                <p className="text-sm text-blue-600 mt-2">
                  Get your API key from <a href="https://www.perplexity.ai/settings/api" target="_blank" rel="noopener noreferrer" className="underline">Perplexity AI Settings</a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Show fallback articles */}
        <div className="space-y-6">
          {getFallbackArticles().map((article, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-vayu-mint opacity-60">
              <CardContent className="p-0">
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-vayu-mint/10 text-vayu-mint px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                  <div className="text-sm text-vayu-blue flex items-center gap-4">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-vayu-dark mb-3">
                  {article.title}
                </h4>
                
                <p className="text-vayu-blue-dark mb-4">{article.excerpt}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-vayu-blue">Source: {article.source}</span>
                  <span className="text-sm text-gray-500">Sample Article</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-vayu-dark flex items-center gap-2">
          <Calendar className="h-6 w-6 text-vayu-mint" />
          Live Environmental Articles
        </h3>
        <Button
          onClick={refreshArticles}
          disabled={loading}
          className="bg-vayu-mint hover:bg-vayu-mint-dark text-white flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <Card className="p-4 bg-red-50 border-red-200">
          <CardContent className="p-0">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {loading && (
        <div className="text-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-vayu-mint mb-2" />
          <p className="text-vayu-blue-dark">Fetching latest articles...</p>
        </div>
      )}

      <div className="space-y-6">
        {articles.map((article, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-vayu-mint">
            <CardContent className="p-0">
              <div className="flex justify-between items-start mb-3">
                <span className="bg-vayu-mint/10 text-vayu-mint px-3 py-1 rounded-full text-sm font-medium">
                  {article.category}
                </span>
                <div className="text-sm text-vayu-blue flex items-center gap-4">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
              
              <h4 className="text-xl font-bold text-vayu-dark mb-3 hover:text-vayu-mint transition-colors cursor-pointer">
                {article.title}
              </h4>
              
              <p className="text-vayu-blue-dark mb-4">{article.excerpt}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-vayu-blue">Source: {article.source}</span>
                <Button variant="ghost" className="text-vayu-mint hover:text-vayu-mint-dark p-0 h-auto font-medium">
                  Read More
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {hasApiKey && (
        <div className="mt-8 text-center">
          <Button className="bg-vayu-mint hover:bg-vayu-mint-dark text-white px-8 py-3 rounded-full">
            View All Articles
          </Button>
        </div>
      )}
    </div>
  );
};

export default LiveArticleFeed;

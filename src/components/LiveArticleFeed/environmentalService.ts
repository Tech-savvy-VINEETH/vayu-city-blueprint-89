
import { Article } from './types';

export const getEnvironmentalArticles = (): Article[] => {
  const environmentalTopics = [
    {
      title: "Real-time Air Quality Monitoring Revolution in Smart Cities",
      excerpt: "IoT sensors and AI-powered analytics are transforming how cities monitor and respond to air pollution in real-time.",
      category: "Technology",
      source: "Environmental Tech Review"
    },
    {
      title: "Climate Change Impact on Urban Air Quality Patterns",
      excerpt: "New research reveals how changing weather patterns are affecting pollution dispersion in major metropolitan areas.",
      category: "Climate",
      source: "Climate Science Today"
    },
    {
      title: "Green Transportation Initiatives Reduce City Pollution",
      excerpt: "Cities implementing electric vehicle programs and clean transportation see significant improvements in air quality metrics.",
      category: "Transportation",
      source: "Sustainable Cities Report"
    }
  ];

  const randomTopic = environmentalTopics[Math.floor(Math.random() * environmentalTopics.length)];
  
  return [{
    ...randomTopic,
    date: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }),
    readTime: `${Math.floor(Math.random() * 4) + 4} min read`,
    sourceType: 'environmental' as const
  }];
};

export const getFallbackArticles = (): Article[] => {
  return [
    {
      title: "India's National Clean Air Programme Shows Progress",
      excerpt: "Government data reveals improvements in air quality across 102 cities participating in the national initiative.",
      date: "Dec 19, 2024",
      readTime: "5 min read",
      category: "Policy",
      source: "Environmental Policy India",
      sourceType: 'environmental' as const
    },
    {
      title: "Breakthrough in Atmospheric Pollution Detection",
      excerpt: "Scientists develop new satellite technology for monitoring air pollutants with unprecedented accuracy.",
      date: "Dec 18, 2024",
      readTime: "4 min read",
      category: "Innovation",
      source: "Space Environmental Monitor",
      sourceType: 'environmental' as const
    }
  ];
};


import { Article } from './types';

export const getEnvironmentalArticles = (): Article[] => {
  return [
    {
      title: "Real-time Air Quality Monitoring Shows 40% Improvement in Delhi NCR",
      excerpt: "Latest data from VayuGrid network reveals significant air quality improvements across major traffic corridors in Delhi NCR region.",
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      readTime: "4 min read",
      category: "Environmental Data",
      source: "VayuGrid Analytics",
      url: "https://example.com/delhi-air-quality-improvement",
      sourceType: 'environmental' as const
    },
    {
      title: "Smart City Initiative: AI-Powered Pollution Control Systems",
      excerpt: "How machine learning algorithms are helping cities worldwide reduce pollution levels by up to 35% through predictive traffic management.",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      readTime: "6 min read",
      category: "Technology",
      source: "Smart Cities Research",
      url: "https://example.com/ai-pollution-control",
      sourceType: 'environmental' as const
    },
    {
      title: "Climate Change Impact: Urban Heat Islands and Air Quality",
      excerpt: "New research reveals the connection between urban heat islands and deteriorating air quality in metropolitan areas.",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      readTime: "5 min read",
      category: "Research",
      source: "Climate Research Institute",
      url: "https://example.com/urban-heat-islands",
      sourceType: 'environmental' as const
    }
  ];
};

export const getFallbackArticles = (): Article[] => {
  return [
    {
      title: "Emergency Air Quality Alert: Take Precautions",
      excerpt: "Current air quality levels require immediate attention. Stay indoors and use air purifiers when possible.",
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      readTime: "2 min read",
      category: "Alert",
      source: "Environmental Safety",
      url: "https://example.com/air-quality-alert",
      sourceType: 'environmental' as const
    },
    {
      title: "Weekly Air Quality Report",
      excerpt: "Comprehensive analysis of air quality trends across major cities with actionable insights for better health.",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      readTime: "7 min read",
      category: "Report",
      source: "Environmental Health Department",
      url: "https://example.com/weekly-air-quality",
      sourceType: 'environmental' as const
    }
  ];
};

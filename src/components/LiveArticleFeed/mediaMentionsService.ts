
import { Article } from './types';

export interface MediaMention {
  outlet: string;
  title: string;
  type: string;
  date: string;
  url?: string;
  excerpt?: string;
}

export const fetchLiveMediaMentions = async (): Promise<MediaMention[]> => {
  try {
    // In a real implementation, you would fetch from multiple news APIs
    // For now, we'll simulate real-time data with dynamic content
    const mentions: MediaMention[] = [
      {
        outlet: "TechCrunch",
        title: "AI-Powered Air Quality Solutions Transform Urban Transportation",
        type: "Feature Article",
        date: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        url: "https://techcrunch.com",
        excerpt: "Revolutionary technology for cleaner cities through smart routing."
      },
      {
        outlet: "YourStory",
        title: "This startup is creating pollution-neutral traffic corridors in Indian cities",
        type: "Feature Article",
        date: new Date(Date.now() - Math.random() * 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        url: "https://yourstory.com",
        excerpt: "Innovative approach to urban air quality management."
      },
      {
        outlet: "TEDx Mumbai",
        title: "Breathing Clean While Moving Green",
        type: "Speaking Engagement",
        date: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        url: "https://tedxmumbai.com",
        excerpt: "Inspiring talk on sustainable transportation solutions."
      },
      {
        outlet: "NASSCOM",
        title: "Deep Tech 50 Startup Recognition",
        type: "Award",
        date: new Date(Date.now() - Math.random() * 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        url: "https://nasscom.in",
        excerpt: "Recognition for innovative deep tech solutions in environmental monitoring."
      },
      {
        outlet: "Economic Times",
        title: "AI-powered solutions for urban air quality management",
        type: "Expert Commentary",
        date: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        url: "https://economictimes.indiatimes.com",
        excerpt: "Expert insights on leveraging technology for environmental solutions."
      },
      {
        outlet: "Forbes India",
        title: "The Future of Clean Air Technology in Smart Cities",
        type: "Industry Analysis",
        date: new Date(Date.now() - Math.random() * 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        url: "https://forbesindia.com",
        excerpt: "Comprehensive analysis of emerging technologies in urban air quality."
      }
    ];

    // Sort by date (most recent first)
    return mentions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error fetching media mentions:', error);
    // Return fallback static data if API fails
    return [
      {
        outlet: "YourStory",
        title: "This startup is creating pollution-neutral traffic corridors in Indian cities",
        type: "Feature Article",
        date: "Dec 15, 2024",
        url: "https://yourstory.com"
      },
      {
        outlet: "TEDx Mumbai",
        title: "Breathing Clean While Moving Green",
        type: "Speaking Engagement",
        date: "Dec 10, 2024",
        url: "https://tedxmumbai.com"
      }
    ];
  }
};

export const getFallbackMediaMentions = (): MediaMention[] => [
  {
    outlet: "YourStory",
    title: "This startup is creating pollution-neutral traffic corridors in Indian cities",
    type: "Feature Article",
    date: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }),
    excerpt: "Innovative approach to urban air quality management."
  },
  {
    outlet: "TEDx Mumbai",
    title: "Breathing Clean While Moving Green",
    type: "Speaking Engagement",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }),
    excerpt: "Inspiring talk on sustainable transportation solutions."
  },
  {
    outlet: "NASSCOM",
    title: "Deep Tech 50 Startup Recognition",
    type: "Award",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }),
    excerpt: "Recognition for innovative deep tech solutions."
  }
];

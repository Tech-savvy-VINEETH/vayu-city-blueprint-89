
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ExternalLink, Award } from 'lucide-react';

const BlogSection = () => {
  const featuredArticles = [
    {
      title: "AQI as the New Stock Index: Why Cities Should Trade Clean Air",
      excerpt: "Exploring how air quality indices could become tradeable commodities, incentivizing cities to compete for cleaner air.",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      category: "Innovation"
    },
    {
      title: "Inside AeroBrain: The AI Behind Pollution Prediction",
      excerpt: "Deep dive into our machine learning models that predict air pollution patterns 48 hours in advance with 94% accuracy.",
      date: "Dec 10, 2024",
      readTime: "8 min read",
      category: "Technology"
    },
    {
      title: "From Delhi to Bangalore: VayuGrid's Pan-India Expansion",
      excerpt: "How we're scaling our pollution-neutral corridor technology across India's major metropolitan cities.",
      date: "Dec 5, 2024",
      readTime: "6 min read",
      category: "Growth"
    }
  ];

  const mediaMentions = [
    {
      outlet: "YourStory",
      title: "This startup is creating pollution-neutral traffic corridors in Indian cities",
      type: "Feature Article"
    },
    {
      outlet: "TEDx Mumbai",
      title: "Breathing Clean While Moving Green",
      type: "Speaking Engagement"
    },
    {
      outlet: "NASSCOM",
      title: "Deep Tech 50 Startup Recognition",
      type: "Award"
    },
    {
      outlet: "Economic Times",
      title: "AI-powered solutions for urban air quality management",
      type: "Expert Commentary"
    }
  ];

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-vayu-dark mb-6">
            Insights & <span className="text-gradient-vayu">Media</span>
          </h2>
          <p className="text-xl text-vayu-blue-dark max-w-3xl mx-auto">
            Latest thoughts on clean air technology, urban sustainability, and the future of smart cities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Featured Articles */}
          <div>
            <h3 className="text-2xl font-bold text-vayu-dark mb-8 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-vayu-mint" />
              Featured Articles
            </h3>
            
            <div className="space-y-6">
              {featuredArticles.map((article, index) => (
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
                    
                    <Button variant="ghost" className="text-vayu-mint hover:text-vayu-mint-dark p-0 h-auto font-medium">
                      Read Full Article
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button className="bg-vayu-mint hover:bg-vayu-mint-dark text-white px-8 py-3 rounded-full">
                View All Articles
              </Button>
            </div>
          </div>

          {/* Media Mentions */}
          <div>
            <h3 className="text-2xl font-bold text-vayu-dark mb-8 flex items-center gap-2">
              <Award className="h-6 w-6 text-vayu-mint" />
              Media Mentions
            </h3>

            <div className="space-y-4 mb-8">
              {mediaMentions.map((mention, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-all duration-200">
                  <CardContent className="p-0">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold text-vayu-dark">{mention.outlet}</span>
                          <span className="bg-gray-100 text-vayu-blue px-2 py-1 rounded text-xs">
                            {mention.type}
                          </span>
                        </div>
                        <p className="text-vayu-blue-dark">{mention.title}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-vayu-blue hover:text-vayu-mint cursor-pointer" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Press Kit */}
            <Card className="p-6 bg-gradient-to-br from-vayu-blue to-vayu-blue-dark text-white">
              <CardContent className="p-0">
                <h4 className="text-xl font-bold mb-4">Press Kit</h4>
                <p className="text-gray-300 mb-6">
                  Download our complete press kit including high-resolution images, company facts, and founder bios.
                </p>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-vayu-blue">
                    Download Press Kit
                  </Button>
                  <Button variant="ghost" className="w-full text-white hover:text-vayu-mint">
                    Media Contact: press@aerosagevayu.com
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="p-6 mt-6 bg-vayu-mint/5 border-vayu-mint/20">
              <CardContent className="p-0">
                <h4 className="text-xl font-bold text-vayu-dark mb-4">Stay Updated</h4>
                <p className="text-vayu-blue-dark mb-4">
                  Get the latest insights on clean air technology and smart cities.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vayu-mint"
                  />
                  <Button className="bg-vayu-mint hover:bg-vayu-mint-dark text-white px-6">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

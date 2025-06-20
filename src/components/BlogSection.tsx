
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, ExternalLink } from 'lucide-react';
import LiveArticleFeed from './LiveArticleFeed';
import NewsletterSubscription from './LiveArticleFeed/NewsletterSubscription';

const BlogSection = () => {
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
            Latest thoughts on clean air technology, urban sustainability, and real-time environmental news.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Live Articles Feed */}
          <div>
            <LiveArticleFeed />
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
                  <Button variant="outline" className="w-full border-white bg-white text-vayu-blue hover:bg-gray-100 hover:text-vayu-blue">
                    Download Press Kit
                  </Button>
                  <Button variant="ghost" className="w-full text-white hover:text-vayu-mint">
                    Media Contact: press@aerosagevayu.com
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <NewsletterSubscription />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

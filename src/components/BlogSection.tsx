
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LiveArticleFeed from './LiveArticleFeed';
import LiveMediaMentions from './LiveMediaMentions';
import NewsletterSubscription from './LiveArticleFeed/NewsletterSubscription';

const BlogSection = () => {
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

          {/* Live Media Mentions */}
          <div>
            <LiveMediaMentions />

            {/* Press Kit */}
            <Card className="p-6 bg-gradient-to-br from-vayu-blue to-vayu-blue-dark text-white mt-8">
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

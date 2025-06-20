
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Insert subscription into database
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([
          {
            email: email.toLowerCase().trim(),
            is_active: true
          }
        ]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already Subscribed",
            description: "This email is already subscribed to our newsletter.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Successfully Subscribed!",
          description: "Thank you for subscribing to our newsletter. You'll receive updates about clean air technology and environmental news.",
        });
        setEmail('');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription Failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 mt-6 bg-vayu-mint/5 border-vayu-mint/20">
      <CardContent className="p-0">
        <h4 className="text-xl font-bold text-vayu-dark mb-4">Stay Updated</h4>
        <p className="text-vayu-blue-dark mb-4">
          Get the latest insights on clean air technology and smart cities delivered to your inbox.
        </p>
        <form onSubmit={handleSubscribe} className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            disabled={isLoading}
            required
          />
          <Button 
            type="submit"
            className="bg-vayu-mint hover:bg-vayu-mint-dark text-white px-6"
            disabled={isLoading}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewsletterSubscription;

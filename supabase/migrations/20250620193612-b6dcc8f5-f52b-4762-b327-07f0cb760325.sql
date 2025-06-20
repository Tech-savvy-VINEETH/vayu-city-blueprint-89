
-- Create a table for newsletter subscriptions
CREATE TABLE public.newsletter_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to the newsletter subscriptions table
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to insert (subscribe)
CREATE POLICY "Anyone can subscribe to newsletter" 
  ON public.newsletter_subscriptions 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy that allows anyone to select (for admin purposes, we can restrict this later)
CREATE POLICY "Anyone can view newsletter subscriptions" 
  ON public.newsletter_subscriptions 
  FOR SELECT 
  USING (true);

-- Create policy that allows updates (for unsubscribe functionality)
CREATE POLICY "Anyone can update newsletter subscriptions" 
  ON public.newsletter_subscriptions 
  FOR UPDATE 
  USING (true);

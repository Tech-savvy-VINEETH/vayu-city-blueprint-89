
-- Create a table to store user login credentials and details
CREATE TABLE public.user_credentials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  login_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address INET,
  user_agent TEXT,
  login_method TEXT DEFAULT 'email_password',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_credentials ENABLE ROW LEVEL SECURITY;

-- Create policies for user_credentials
CREATE POLICY "Users can view own credentials" 
  ON public.user_credentials 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own credentials" 
  ON public.user_credentials 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own credentials" 
  ON public.user_credentials 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create an index for better performance on user_id queries
CREATE INDEX idx_user_credentials_user_id ON public.user_credentials(user_id);

-- Create an index for email lookups
CREATE INDEX idx_user_credentials_email ON public.user_credentials(email);

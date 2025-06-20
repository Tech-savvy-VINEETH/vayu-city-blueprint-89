
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Function to store login credentials
const storeLoginCredentials = async (user: User, email: string, loginMethod: string = 'email_password') => {
  try {
    // Get user's IP and user agent
    const userAgent = navigator.userAgent;
    
    // Store credentials in the database
    const { error } = await supabase
      .from('user_credentials')
      .insert({
        user_id: user.id,
        email: email,
        login_timestamp: new Date().toISOString(),
        user_agent: userAgent,
        login_method: loginMethod
      });

    if (error) {
      console.error('Error storing login credentials:', error);
    } else {
      console.log('Login credentials stored successfully');
    }
  } catch (error) {
    console.error('Error in storeLoginCredentials:', error);
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Store credentials when user signs in
        if (event === 'SIGNED_IN' && session?.user) {
          await storeLoginCredentials(session.user, session.user.email || '', 'email_password');
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    // Use a more robust approach to get the correct URL
    const currentOrigin = window.location.origin;
    const redirectUrl = currentOrigin.includes('localhost') 
      ? 'https://6c712804-285c-4078-834e-1d08aef03549.lovableproject.com/'
      : `${currentOrigin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName || ''
        }
      }
    });
    
    // Store credentials for successful sign up
    if (!error && data.user) {
      await storeLoginCredentials(data.user, email, 'email_signup');
    }
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    // Store credentials for successful sign in
    if (!error && data.user) {
      await storeLoginCredentials(data.user, email, 'email_password');
    }
    
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

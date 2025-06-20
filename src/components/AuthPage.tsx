
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Navigate, Link } from 'react-router-dom';
import { Loader2, Mail, Lock, User, Wind, Phone, KeyRound } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const { user, signIn, signUp, signInWithPhone, verifyOTP } = useAuth();
  const { toast } = useToast();

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = isLogin 
        ? await signIn(email, password)
        : await signUp(email, password, fullName);

      if (error) {
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: isLogin ? "Welcome back!" : "Account created!",
          description: isLogin 
            ? "You have successfully logged in." 
            : "Please check your email to verify your account.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!otpSent) {
        const { error } = await signInWithPhone(phone);
        if (error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          setOtpSent(true);
          toast({
            title: "OTP Sent",
            description: "Please check your phone for the verification code.",
          });
        }
      } else {
        const { error } = await verifyOTP(phone, otp);
        if (error) {
          toast({
            title: "Verification Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome!",
            description: "You have successfully signed in.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetPhoneAuth = () => {
    setOtpSent(false);
    setOtp('');
    setPhone('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vayu-dark to-vayu-dark-light flex flex-col items-center justify-center p-4">
      {/* Logo Header */}
      <div className="flex items-center justify-center space-x-3 mb-8">
        <Wind className="h-8 w-8 text-vayu-mint flex-shrink-0" />
        <span className="text-2xl md:text-3xl font-bold text-white whitespace-nowrap">AeroSage Vayu</span>
      </div>

      <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
          <p className="text-gray-300">
            {isLogin ? 'Sign in to your AeroSage Vayu account' : 'Join AeroSage Vayu today'}
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="email" className="text-sm">Email</TabsTrigger>
              <TabsTrigger value="phone" className="text-sm">Phone</TabsTrigger>
            </TabsList>
            
            <TabsContent value="email">
              <form onSubmit={handleEmailAuth} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-white">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-vayu-mint hover:bg-vayu-mint-dark text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="phone">
              <form onSubmit={handlePhoneAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1234567890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                      disabled={otpSent}
                    />
                  </div>
                </div>
                
                {otpSent && (
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-white">Verification Code</Label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        required
                        maxLength={6}
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Button
                    type="submit"
                    className="w-full bg-vayu-mint hover:bg-vayu-mint-dark text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    {otpSent ? 'Verify Code' : 'Send Code'}
                  </Button>
                  
                  {otpSent && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetPhoneAuth}
                      className="w-full border-white/20 text-white hover:bg-white/10"
                    >
                      Use Different Number
                    </Button>
                  )}
                </div>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-vayu-mint hover:text-vayu-mint-dark underline"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </CardContent>
      </Card>
      
      {/* Back to Home Link */}
      <Link 
        to="/" 
        className="text-vayu-mint hover:text-vayu-mint-dark mt-6 underline transition-colors duration-200"
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default AuthPage;

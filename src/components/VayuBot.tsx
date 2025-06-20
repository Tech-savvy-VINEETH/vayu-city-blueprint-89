
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const VayuBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hi! I\'m VayuBot 🤖 Can I help you with air quality information or any questions about AeroSage Vayu?',
      timestamp: new Date(),
    }
  ]);

  useEffect(() => {
    // Add a subtle bounce animation when component mounts
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setIsVisible(true), 100);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simple bot responses
    const botResponses = [
      "Thanks for your question! I'm currently learning more about air quality to better assist you. Please check our Live AQI Map for real-time data!",
      "Great question! For detailed air quality information, I recommend exploring our VayuScore section or checking the live monitoring data.",
      "I'm here to help! While I'm still learning, you can find comprehensive air quality insights throughout our platform.",
      "Thank you for reaching out! For the most accurate information, please refer to our technology sections and live data feeds.",
    ];

    // Add bot response after a delay
    setTimeout(() => {
      const botMessage = {
        type: 'bot',
        content: botResponses[Math.floor(Math.random() * botResponses.length)],
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setMessage('');
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 h-96 shadow-2xl border-2 border-vayu-mint/20 z-50 bg-white">
          <CardHeader className="bg-gradient-to-r from-vayu-mint to-vayu-mint-dark text-white p-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="relative">
                  <Bot className="h-6 w-6" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                VayuBot
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleChat}
                className="text-white hover:bg-white/20 p-1 h-auto"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-full">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-64">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-2 rounded-lg text-sm ${
                    msg.type === 'user' 
                      ? 'bg-vayu-mint text-white' 
                      : 'bg-gray-100 text-vayu-dark'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input Area */}
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 text-sm"
                />
                <Button 
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-vayu-mint hover:bg-vayu-mint-dark px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat Button */}
      <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'}`}>
        <Button
          onClick={toggleChat}
          className="bg-gradient-to-r from-vayu-mint to-vayu-mint-dark hover:from-vayu-mint-dark hover:to-vayu-mint text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <div className="relative">
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <>
                <MessageCircle className="h-6 w-6" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <Bot className="h-2.5 w-2.5 text-white" />
                </div>
                {/* Animated ripple effect */}
                <div className="absolute inset-0 rounded-full bg-vayu-mint animate-ping opacity-20"></div>
              </>
            )}
          </div>
        </Button>
        
        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute bottom-16 right-0 bg-vayu-dark text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap animate-bounce">
            Can I help you? 🤖
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-vayu-dark"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default VayuBot;

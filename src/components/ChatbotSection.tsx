
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface FormData {
  name: string;
  email: string;
  queryType: string;
  message: string;
}

const ChatbotSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm VayuBot, your AI assistant for AeroSage Vayu. I can help you with information about our VayuPod technology, partnerships, or collect your contact details. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    queryType: '',
    message: ''
  });
  const [collectingForm, setCollectingForm] = useState(false);
  const [currentFormField, setCurrentFormField] = useState<keyof FormData | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const generateAIResponse = async (userMessage: string) => {
    const apiKey = "AIzaSyAWFB1Ecu-EYnG793pQS9FZDPD141g2hmo";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const contextPrompt = `You are VayuBot, an AI assistant for AeroSage Vayu, a company that creates VayuPod technology for air purification in Indian cities. 

Company Information:
- VayuPods are air purification devices that create clean air corridors
- VayuGrid is the network of connected VayuPods across cities
- VayuScore measures air quality improvement
- Company focuses on partnerships with governments, corporations, and NGOs
- Headquarters: T-Hub, IIIT-H Campus, Hyderabad, Telangana
- Contact: hello@aerosagevayu.com

You can help with:
1. Information about VayuPod technology and air purification
2. Partnership opportunities (Government, Corporate, NGO)
3. VayuPod adoption programs
4. Collecting contact information for inquiries
5. General questions about clean air initiatives

Keep responses concise, helpful, and focused on air quality and VayuPod technology.

User message: ${userMessage}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: contextPrompt }]
            }
          ]
        })
      });

      const data = await response.json();

      if (data?.candidates?.length > 0) {
        return data.candidates[0].content.parts[0].text;
      } else {
        return "I'm sorry, I didn't understand that. Could you please rephrase your question about VayuPod technology or air quality?";
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I'm experiencing technical difficulties. Please try again or contact us directly at hello@aerosagevayu.com";
    }
  };

  const handleFormCollection = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();

    // Check if user wants to provide contact info
    if (lowerMessage.includes('contact') || lowerMessage.includes('form') || lowerMessage.includes('inquiry') || lowerMessage.includes('partnership')) {
      setCollectingForm(true);
      setCurrentFormField('name');
      addMessage("I'd be happy to collect your contact information for our team. What's your name?", false);
      return;
    }

    // Handle form field collection
    if (collectingForm && currentFormField) {
      const updatedFormData = { ...formData, [currentFormField]: userMessage };
      setFormData(updatedFormData);

      switch (currentFormField) {
        case 'name':
          setCurrentFormField('email');
          addMessage(`Nice to meet you, ${userMessage}! What's your email address?`, false);
          break;
        case 'email':
          setCurrentFormField('queryType');
          addMessage("What type of inquiry is this? (e.g., Government Partnership, Corporate Partnership, Technology Inquiry, Investment Opportunity, Media & Press, or General Inquiry)", false);
          break;
        case 'queryType':
          setCurrentFormField('message');
          addMessage("Please tell me more about your project or inquiry:", false);
          break;
        case 'message':
          setCollectingForm(false);
          setCurrentFormField(null);
          addMessage(`Thank you for providing your information! Here's what I have:
          
Name: ${updatedFormData.name}
Email: ${updatedFormData.email}
Query Type: ${updatedFormData.queryType}
Message: ${userMessage}

Our team will contact you within 24 hours. Is there anything else I can help you with regarding VayuPod technology?`, false);
          
          // Here you could send the form data to your backend
          console.log('Form submitted:', updatedFormData);
          break;
      }
      return;
    }

    // Regular AI response for non-form queries
    return null;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    addMessage(userMessage, true);
    setInputValue('');
    setIsLoading(true);

    // Check if this is form-related
    const formResponse = handleFormCollection(userMessage);
    
    if (formResponse === null && !collectingForm) {
      // Generate AI response for general queries
      const aiResponse = await generateAIResponse(userMessage);
      addMessage(aiResponse, false);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-vayu-dark mb-6">
            Get in <span className="text-gradient-vayu">Touch</span>
          </h2>
          <p className="text-xl text-vayu-blue-dark max-w-3xl mx-auto">
            Chat with VayuBot to learn about our technology or get in touch with our team.
          </p>
        </div>

        {/* Chatbot Button */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-vayu-mint hover:bg-vayu-mint-dark text-white px-8 py-4 text-lg font-medium rounded-full shadow-lg flex items-center gap-3"
          >
            <MessageCircle className="h-6 w-6" />
            Chat with VayuBot
          </Button>
        </div>

        {/* Contact Information Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 border-l-4 border-l-vayu-mint">
            <CardContent className="p-0">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-vayu-mint/10 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-vayu-mint" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-vayu-dark mb-2">AI Assistant</h4>
                  <p className="text-vayu-blue-dark">Chat instantly with VayuBot</p>
                  <p className="text-vayu-blue-dark">24/7 availability</p>
                  <p className="text-vayu-blue-dark">Powered by Gemini AI</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 border-l-4 border-l-vayu-blue">
            <CardContent className="p-0">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-vayu-blue/10 rounded-lg">
                  <User className="h-6 w-6 text-vayu-blue" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-vayu-dark mb-2">Human Support</h4>
                  <p className="text-vayu-blue-dark">hello@aerosagevayu.com</p>
                  <p className="text-vayu-blue-dark">partnerships@aerosagevayu.com</p>
                  <p className="text-vayu-blue-dark">Mon-Fri 9AM-6PM IST</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 border-l-4 border-l-gray-400">
            <CardContent className="p-0">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Bot className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-vayu-dark mb-2">Smart Features</h4>
                  <p className="text-vayu-blue-dark">Form collection</p>
                  <p className="text-vayu-blue-dark">Technical support</p>
                  <p className="text-vayu-blue-dark">Partnership guidance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chatbot Modal */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl h-[600px] flex flex-col">
              <div className="flex items-center justify-between p-4 border-b bg-vayu-mint text-white rounded-t-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">VayuBot</h3>
                    <p className="text-sm text-vayu-mint-light">AI Assistant</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <CardContent className="flex-1 p-0 flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.isUser
                            ? 'bg-vayu-mint text-white'
                            : 'bg-gray-100 text-vayu-dark'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {!message.isUser && (
                            <Bot className="h-4 w-4 mt-1 text-vayu-mint" />
                          )}
                          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-vayu-dark p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4 text-vayu-mint" />
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-vayu-mint rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-vayu-mint rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-vayu-mint rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={isLoading || !inputValue.trim()}
                      className="bg-vayu-mint hover:bg-vayu-mint-dark text-white px-4"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChatbotSection;

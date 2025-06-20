
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Twitter, Linkedin, Instagram } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    queryType: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Headquarters",
      details: ["T-Hub, IIIT-H Campus", "Hyderabad, Telangana 500032", "India"]
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 40 6677 8899", "+91 98765 43210", "Mon-Fri 9AM-6PM IST"]
    },
    {
      icon: Mail,
      title: "Email",
      details: ["hello@aerosagevayu.com", "partnerships@aerosagevayu.com", "media@aerosagevayu.com"]
    }
  ];

  const queryTypes = [
    "Government Partnership",
    "Corporate Partnership",
    "Technology Inquiry",
    "Investment Opportunity",
    "Media & Press",
    "General Inquiry"
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-vayu-dark mb-6">
            Get in <span className="text-gradient-vayu">Touch</span>
          </h2>
          <p className="text-xl text-vayu-blue-dark max-w-3xl mx-auto">
            Ready to create cleaner cities together? Let's discuss how VayuGrid can transform your community.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8 border-2 border-gray-100">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold text-vayu-dark mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-vayu-dark mb-2">Name</label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="border-gray-300 focus:border-vayu-mint focus:ring-vayu-mint"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-vayu-dark mb-2">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="border-gray-300 focus:border-vayu-mint focus:ring-vayu-mint"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-vayu-dark mb-2">Query Type</label>
                  <Select onValueChange={(value) => setFormData({...formData, queryType: value})}>
                    <SelectTrigger className="border-gray-300 focus:border-vayu-mint focus:ring-vayu-mint">
                      <SelectValue placeholder="Select your inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      {queryTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-vayu-dark mb-2">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={5}
                    className="border-gray-300 focus:border-vayu-mint focus:ring-vayu-mint"
                    placeholder="Tell us about your project or inquiry..."
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-vayu-mint hover:bg-vayu-mint-dark text-white py-3 text-lg font-medium"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6 border-l-4 border-l-vayu-mint">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-vayu-mint/10 rounded-lg">
                      <info.icon className="h-6 w-6 text-vayu-mint" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-vayu-dark mb-2">{info.title}</h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-vayu-blue-dark">{detail}</p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Social Media */}
            <Card className="p-6 bg-gradient-to-br from-vayu-mint to-vayu-mint-dark text-white">
              <CardContent className="p-0">
                <h4 className="text-xl font-bold mb-4">Follow Our Journey</h4>
                <p className="text-vayu-mint-light mb-6">
                  Stay connected for the latest updates on clean air technology and smart city innovations.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="p-6 bg-gray-50">
              <CardContent className="p-0">
                <h4 className="text-lg font-bold text-vayu-dark mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start border-vayu-mint text-vayu-mint hover:bg-vayu-mint hover:text-white">
                    Schedule a Demo
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-vayu-blue text-vayu-blue hover:bg-vayu-blue hover:text-white">
                    Download Brochure
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-300 text-vayu-dark hover:bg-gray-100">
                    Request Pilot Program
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

export default ContactSection;

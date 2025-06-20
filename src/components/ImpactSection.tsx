
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Leaf, Activity, MapPin } from 'lucide-react';

const ImpactSection = () => {
  const [counters, setCounters] = useState({
    citizens: 0,
    pmRemoved: 0,
    podsActive: 0,
    corridorsCleaned: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCounters({
        citizens: 2547000,
        pmRemoved: 18.5,
        podsActive: 147,
        corridorsCleaned: 23
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const testimonials = [
    {
      name: "Dr. Priya Sharma",
      role: "Chief Environmental Officer, Delhi Government",
      content: "VayuGrid has transformed our approach to urban air quality management. The real-time data helps us make informed policy decisions.",
      avatar: "👩‍💼"
    },
    {
      name: "Rajesh Kumar",
      role: "Delivery Partner, Zomato",
      content: "My daily exposure reduced by 40% using VayuScore routes. I feel healthier and more energetic during my work hours.",
      avatar: "🛵"
    },
    {
      name: "Ananya Patel",
      role: "Engineering Student, IIT Delhi",
      content: "The gamification aspect makes me conscious about my daily pollution exposure. CleanAir Points motivate me to choose better routes.",
      avatar: "👩‍🎓"
    }
  ];

  const impacts = [
    {
      icon: Users,
      value: counters.citizens.toLocaleString(),
      label: "Citizens Benefited",
      description: "across 3 major cities"
    },
    {
      icon: Leaf,
      value: `${counters.pmRemoved}T`,
      label: "PM Particles Removed",
      description: "equivalent to 50,000 car emissions"
    },
    {
      icon: Activity,
      value: counters.podsActive,
      label: "VayuPods Active",
      description: "24/7 air purification"
    },
    {
      icon: MapPin,
      value: counters.corridorsCleaned,
      label: "Corridors Cleaned",
      description: "pollution-neutral zones"
    }
  ];

  return (
    <section id="impact" className="py-20 bg-gradient-to-br from-vayu-dark to-vayu-dark-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Real <span className="text-gradient-vayu">Impact</span> Metrics
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Measurable improvements in air quality and citizen health across Indian cities.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {impacts.map((impact, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-md text-white text-center p-6">
              <CardContent className="p-0">
                <impact.icon className="h-12 w-12 text-vayu-mint mx-auto mb-4" />
                <div className="text-3xl sm:text-4xl font-bold mb-2 text-vayu-mint">{impact.value}</div>
                <div className="text-lg font-semibold mb-1">{impact.label}</div>
                <div className="text-sm text-gray-300">{impact.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-md p-6 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-0">
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-vayu-mint">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-vayu-mint to-vayu-mint-dark p-8 rounded-2xl inline-block">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Breathe Cleaner Air?</h3>
            <p className="text-vayu-mint-light mb-6">Join thousands of citizens already benefiting from VayuGrid technology.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-vayu-mint px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Download VayuScore App
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-vayu-mint transition-colors">
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;

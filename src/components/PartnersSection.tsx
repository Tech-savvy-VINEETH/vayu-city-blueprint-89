
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Users, Heart, ArrowRight } from 'lucide-react';

const PartnersSection = () => {
  const partnerCategories = [
    {
      title: "Government Partners",
      icon: Building2,
      partners: ["Delhi Pollution Control Committee", "Hyderabad Smart City", "Karnataka State Pollution Control Board", "Ministry of Environment"]
    },
    {
      title: "Corporate Partners",
      icon: Users,
      partners: ["Tata Motors", "Mahindra Group", "Infosys Foundation", "Wipro EcoEnergy"]
    },
    {
      title: "NGO Partners",
      icon: Heart,
      partners: ["Centre for Science and Environment", "Clean Air India", "Greenpeace India", "Climate Action Network"]
    }
  ];

  const adoptionTiers = [
    {
      name: "Community Hero",
      price: "₹25,000",
      features: ["1 VayuPod adoption", "Community recognition", "Monthly impact reports", "Mobile app access"],
      popular: false
    },
    {
      name: "Corporate Champion",
      price: "₹2,50,000",
      features: ["10 VayuPods adoption", "Corporate branding", "CSR compliance reports", "Employee wellness program"],
      popular: true
    },
    {
      name: "City Partner",
      price: "₹25,00,000",
      features: ["100 VayuPods adoption", "City-wide impact", "Government collaboration", "Custom dashboard"],
      popular: false
    }
  ];

  return (
    <section id="partners" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-vayu-dark mb-6">
            Our <span className="text-gradient-vayu">Partners</span>
          </h2>
          <p className="text-xl text-vayu-blue-dark max-w-3xl mx-auto">
            Collaborating with governments, corporations, and NGOs to create cleaner cities across India.
          </p>
        </div>

        {/* Partner Categories */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {partnerCategories.map((category, index) => (
            <Card key={index} className="p-6 border-2 border-gray-100 hover:border-vayu-mint/50 transition-all duration-300">
              <CardContent className="p-0">
                <div className="text-center mb-6">
                  <category.icon className="h-12 w-12 text-vayu-mint mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-vayu-dark">{category.title}</h3>
                </div>
                <div className="space-y-3">
                  {category.partners.map((partner, idx) => (
                    <div key={idx} className="text-center p-3 bg-gray-50 rounded-lg text-vayu-blue-dark font-medium">
                      {partner}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Adopt a VayuPod Section */}
        <div className="bg-gradient-to-br from-vayu-mint/5 to-vayu-blue/5 rounded-2xl p-8 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-vayu-dark mb-4">Adopt a VayuPod</h3>
            <p className="text-lg text-vayu-blue-dark max-w-2xl mx-auto">
              Be part of India's clean air revolution. Choose your impact level and help create pollution-neutral corridors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {adoptionTiers.map((tier, index) => (
              <Card key={index} className={`relative p-6 ${tier.popular ? 'border-2 border-vayu-mint shadow-lg scale-105' : 'border border-gray-200'}`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-vayu-mint text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
                  </div>
                )}
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold text-vayu-dark mb-2">{tier.name}</h4>
                    <div className="text-3xl font-bold text-vayu-mint mb-2">{tier.price}</div>
                    <div className="text-sm text-vayu-blue">per year</div>
                  </div>
                  <div className="space-y-3 mb-6">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-vayu-mint rounded-full"></div>
                        <span className="text-vayu-blue-dark">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className={`w-full ${tier.popular ? 'bg-vayu-mint hover:bg-vayu-mint-dark' : 'bg-vayu-blue hover:bg-vayu-blue-dark'} text-white`}>
                    Adopt Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partnership Opportunities */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 bg-gradient-to-br from-vayu-blue to-vayu-blue-dark text-white">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold mb-4">B2G Partnerships</h3>
              <p className="mb-6 text-gray-300">
                Collaborate with government agencies to deploy city-wide VayuGrid networks and improve urban air quality at scale.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-vayu-mint" />
                  <span>Smart city integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-vayu-mint" />
                  <span>Policy compliance support</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-vayu-mint" />
                  <span>Public health impact reports</span>
                </div>
              </div>
              <Button variant="outline" className="border-white bg-white text-vayu-blue hover:bg-gray-100 hover:text-vayu-blue">
                Government Partnership
              </Button>
            </CardContent>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-vayu-mint to-vayu-mint-dark text-white">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold mb-4">B2B Solutions</h3>
              <p className="mb-6 text-vayu-mint-light">
                Corporate partnerships for employee wellness, CSR initiatives, and sustainable business operations.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-white" />
                  <span>Employee health programs</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-white" />
                  <span>CSR impact measurement</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-white" />
                  <span>Sustainability reporting</span>
                </div>
              </div>
              <Button variant="outline" className="border-white bg-white text-vayu-mint hover:bg-gray-100 hover:text-vayu-mint">
                Corporate Partnership
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;

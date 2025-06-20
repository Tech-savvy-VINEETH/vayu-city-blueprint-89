
import React from 'react';
import { Wind, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: "Product",
      links: ["VayuGrid Technology", "VayuPod Specifications", "VayuScore App", "API Documentation"]
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Press Kit", "Blog"]
    },
    {
      title: "Partnerships",
      links: ["Government Solutions", "Corporate Programs", "NGO Collaborations", "Adopt a VayuPod"]
    },
    {
      title: "Support",
      links: ["Help Center", "API Support", "System Status", "Contact Us"]
    }
  ];

  return (
    <footer className="bg-vayu-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Wind className="h-8 w-8 text-vayu-mint" />
              <span className="text-2xl font-bold">AeroSage Vayu</span>
            </div>
            <p className="text-gray-300 mb-6 text-lg">
              Breathing Clean While Moving Green – AI-Powered Pollution-Neutral Traffic Corridors for Smart Cities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-vayu-dark-light rounded-lg hover:bg-vayu-mint transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-3 bg-vayu-dark-light rounded-lg hover:bg-vayu-mint transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-3 bg-vayu-dark-light rounded-lg hover:bg-vayu-mint transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-3 bg-vayu-dark-light rounded-lg hover:bg-vayu-mint transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-gray-300 hover:text-vayu-mint transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-vayu-dark-light pt-12 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated on Clean Air Tech</h3>
              <p className="text-gray-300">Get monthly insights on urban air quality and smart city innovations.</p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-vayu-dark-light border border-vayu-dark-lighter rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-vayu-mint"
              />
              <button className="bg-vayu-mint hover:bg-vayu-mint-dark px-6 py-3 rounded-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-vayu-dark-light pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-300">
              © 2024 AeroSage Vayu Private Limited. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-vayu-mint transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-vayu-mint transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-vayu-mint transition-colors">Cookie Policy</a>
              <a href="#" className="text-gray-300 hover:text-vayu-mint transition-colors">Security</a>
            </div>
          </div>
        </div>

        {/* Additional Footer Info */}
        <div className="mt-8 pt-8 border-t border-vayu-dark-light">
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-400">
            <div>
              <div className="font-medium text-white mb-2">Registered Office</div>
              <div>T-Hub, IIIT-H Campus<br />Hyderabad, Telangana 500032</div>
            </div>
            <div>
              <div className="font-medium text-white mb-2">Business Hours</div>
              <div>Monday - Friday: 9:00 AM - 6:00 PM IST<br />Weekend: Emergency Support Only</div>
            </div>
            <div>
              <div className="font-medium text-white mb-2">Recognition</div>
              <div>NASSCOM Deep Tech 50<br />TEDx Featured Startup</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

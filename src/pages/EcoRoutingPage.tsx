
import React from 'react';
import Navigation from '@/components/Navigation';
import EcoRouting from '@/components/EcoRouting';
import Footer from '@/components/Footer';

const EcoRoutingPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <EcoRouting />
      <Footer />
    </div>
  );
};

export default EcoRoutingPage;

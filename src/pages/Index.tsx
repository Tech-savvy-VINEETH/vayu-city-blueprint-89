
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import VayuGridExplainer from '@/components/VayuGridExplainer';
import VayuPodTechnology from '@/components/VayuPodTechnology';
import VayuScoreSection from '@/components/VayuScoreSection';
import InteractiveMap from '@/components/InteractiveMap';
import ImpactSection from '@/components/ImpactSection';
import PartnersSection from '@/components/PartnersSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <VayuGridExplainer />
      <VayuPodTechnology />
      <VayuScoreSection />
      <InteractiveMap />
      <ImpactSection />
      <PartnersSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;

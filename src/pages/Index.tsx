
import HeroSection from "@/components/HeroSection";
import VayuPodTechnology from "@/components/VayuPodTechnology";
import VayuGridExplainer from "@/components/VayuGridExplainer";
import VayuScoreSection from "@/components/VayuScoreSection";
import ImpactSection from "@/components/ImpactSection";
import PartnersSection from "@/components/PartnersSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-vayu-dark to-vayu-dark-light">
      {/* Navigation with integrated auth menu */}
      <Navigation />
      
      {/* Main Content - Restored original order */}
      <HeroSection />
      <VayuPodTechnology />
      <VayuGridExplainer />
      <VayuScoreSection />
      <ImpactSection />
      <PartnersSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;

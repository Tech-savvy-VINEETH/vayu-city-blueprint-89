
import HeroSection from "@/components/HeroSection";
import VayuScoreSection from "@/components/VayuScoreSection";
import VayuPodTechnology from "@/components/VayuPodTechnology";
import VayuGridExplainer from "@/components/VayuGridExplainer";
import ImpactSection from "@/components/ImpactSection";
import PartnersSection from "@/components/PartnersSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import UserMenu from "@/components/UserMenu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";

const Index = () => {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-vayu-dark to-vayu-dark-light">
      {/* Navigation with Auth */}
      <div className="fixed top-0 w-full z-50 bg-vayu-dark/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Navigation />
            <div className="flex items-center gap-4">
              {!loading && (
                user ? (
                  <UserMenu />
                ) : (
                  <Link to="/auth">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16">
        <HeroSection />
        <VayuScoreSection />
        <VayuPodTechnology />
        <VayuGridExplainer />
        <ImpactSection />
        <PartnersSection />
        <BlogSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;

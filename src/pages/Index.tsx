import { useState } from "react";
import PasswordScreen from "@/components/PasswordScreen";
import BackgroundSlideshow from "@/components/BackgroundSlideshow";
import PhraseCarousel from "@/components/PhraseCarousel";
import AudioPlayer from "@/components/AudioPlayer";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);

  const handleAccessGranted = () => {
    setIsAuthenticated(true);
    // Delay showing main content for smooth transition
    setTimeout(() => setShowMainContent(true), 100);
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-background">
      {/* Password Screen */}
      {!isAuthenticated && (
        <PasswordScreen onAccessGranted={handleAccessGranted} />
      )}

      {/* Main Experience */}
      {isAuthenticated && (
        <div 
          className={`fixed inset-0 transition-opacity duration-1000 ${
            showMainContent ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background slideshow */}
          <BackgroundSlideshow />

          {/* Phrase carousel */}
          <PhraseCarousel />

          {/* Audio player */}
          <AudioPlayer />

          {/* Subtle branding */}
          <div className="fixed bottom-6 left-6 z-20">
            <p className="text-xs text-muted-foreground/30 font-body">
              Feito com ❤️ para Bebelle
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;

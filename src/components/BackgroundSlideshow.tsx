import { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteData";

// Import background images
import bg1 from "@/assets/bg-1.jpeg";
import bg2 from "@/assets/bg-2.jpeg";
import bg3 from "@/assets/bg-3.jpeg";
import bg4 from "@/assets/bg-4.jpeg";
import bg5 from "@/assets/bg-5.jpeg";
import bg6 from "@/assets/bg-6.jpeg";
import bg7 from "@/assets/bg-7.jpeg";
import bg8 from "@/assets/bg-8.jpeg";
import bg9 from "@/assets/bg-9.jpeg";
import bg10 from "@/assets/bg-10.jpeg";
import bg11 from "@/assets/bg-11.jpeg";
import bg12 from "@/assets/bg-12.jpeg";
import bg13 from "@/assets/bg-13.jpeg";
import bg14 from "@/assets/bg-14.jpeg";
import bg15 from "@/assets/bg-15.jpeg";

const backgrounds = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11, bg12, bg13, bg14, bg15];

const BackgroundSlideshow = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentBg((prev) => (prev + 1) % backgrounds.length);
        setIsTransitioning(false);
      }, 1500); // Half of transition duration
    }, siteConfig.bgTransitionDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Background images – blur cinematic + contain */}
      {backgrounds.map((bg, index) => {
        const isActive = index === currentBg;

        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Layer 1 — blurred background (cover) */}
            <div
              className="absolute inset-0 scale-110 md:scale-115"
              style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(30px)",
                opacity: 0.85,
              }}
            />

            {/* Layer 2 — sharp image (contain) */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
          </div>
        );
      })}


      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
      
      {/* Additional vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background)/0.7)_100%)]" />

      {/* Subtle animated grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default BackgroundSlideshow;

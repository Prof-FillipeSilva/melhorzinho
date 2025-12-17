import { useState, useEffect, useCallback } from "react";
import { phrases, siteConfig } from "@/data/siteData";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PhraseCarousel = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("next");
    
    setTimeout(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
      setIsAnimating(false);
    }, 600);
  }, [isAnimating]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("prev");
    
    setTimeout(() => {
      setCurrentPhrase((prev) => (prev - 1 + phrases.length) % phrases.length);
      setIsAnimating(false);
    }, 600);
  }, [isAnimating]);

  // Auto-advance phrases
  useEffect(() => {
    const interval = setInterval(goToNext, siteConfig.phraseDuration);
    return () => clearInterval(interval);
  }, [goToNext]);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
      <div className="w-full max-w-4xl px-8 md:px-16 pointer-events-auto">
        {/* Phrase display */}
        <div className="relative min-h-[200px] flex items-center justify-center">
          <p
            key={currentPhrase}
            className={`font-display text-3xl md:text-5xl lg:text-6xl text-center 
              text-foreground leading-relaxed text-shadow-lg
              ${isAnimating ? "phrase-exit" : "phrase-enter"}`}
            style={{
              fontStyle: "italic",
              fontWeight: 300,
            }}
          >
            "{phrases[currentPhrase]}"
          </p>
        </div>

        {/* Navigation controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={goToPrev}
            className="p-3 rounded-full glass hover:bg-foreground/10 
              transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Frase anterior"
          >
            <ChevronLeft className="w-6 h-6 text-foreground/70" />
          </button>

          {/* Progress indicator */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground font-body">
              {currentPhrase + 1}
            </span>
            <div className="w-24 h-0.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${((currentPhrase + 1) / phrases.length) * 100}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground font-body">
              {phrases.length}
            </span>
          </div>

          <button
            onClick={goToNext}
            className="p-3 rounded-full glass hover:bg-foreground/10 
              transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Próxima frase"
          >
            <ChevronRight className="w-6 h-6 text-foreground/70" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhraseCarousel;

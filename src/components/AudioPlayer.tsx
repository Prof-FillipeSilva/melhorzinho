import { useState, useRef, useEffect, useCallback } from "react";
import { playlist, siteConfig } from "@/data/siteData";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Music
} from "lucide-react";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(siteConfig.defaultVolume);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Attempt autoplay when component mounts
  useEffect(() => {
    if (siteConfig.autoplayAudio && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch(() => {
            // Autoplay blocked - user will need to click play
            setIsPlaying(false);
          });
      }
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
    setHasInteracted(true);
  }, [isPlaying]);

  const nextTrack = useCallback(() => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100);
  }, []);

  const prevTrack = useCallback(() => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted]);

  const handleTrackEnd = useCallback(() => {
    nextTrack();
  }, [nextTrack]);

  const currentSong = playlist[currentTrack];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <audio
        ref={audioRef}
        src={currentSong.url}
        onEnded={handleTrackEnd}
        preload="auto"
      />

      {/* Collapsed State - Just a small button */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="glass rounded-full p-4 hover:scale-110 transition-all duration-300 group"
          aria-label="Abrir player de música"
        >
          <Music className={`w-6 h-6 text-foreground ${isPlaying ? 'animate-pulse' : ''}`} />
          {isPlaying && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-breathe" />
          )}
        </button>
      )}

      {/* Expanded State - Full player */}
      {isExpanded && (
        <div className="glass rounded-2xl p-4 w-72 animate-scale-in">
          {/* Close button */}
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Minimizar player"
          >
            <span className="text-xs">×</span>
          </button>

          {/* Track info */}
          <div className="mb-4 pr-4">
            <h4 className="font-display text-lg text-foreground truncate">
              {currentSong.title}
            </h4>
            <p className="text-sm text-muted-foreground truncate">
              {currentSong.artist}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <button
              onClick={prevTrack}
              className="player-btn"
              aria-label="Música anterior"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlay}
              className="player-btn bg-primary/20 hover:bg-primary/30 p-3"
              aria-label={isPlaying ? "Pausar" : "Tocar"}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-foreground" />
              ) : (
                <Play className="w-6 h-6 text-foreground ml-0.5" />
              )}
            </button>

            <button
              onClick={nextTrack}
              className="player-btn"
              aria-label="Próxima música"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={isMuted ? "Ativar som" : "Mutar"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                setIsMuted(false);
              }}
              className="flex-1 h-1 bg-muted rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
                [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-primary 
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125"
              aria-label="Volume"
            />
          </div>

          {/* Track indicator */}
          <div className="flex justify-center gap-1.5 mt-4">
            {playlist.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentTrack(idx);
                  setIsPlaying(true);
                  setTimeout(() => audioRef.current?.play(), 100);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentTrack 
                    ? "bg-primary w-4" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Música ${idx + 1}`}
              />
            ))}
          </div>

          {/* Autoplay hint */}
          {!hasInteracted && !isPlaying && (
            <p className="text-xs text-muted-foreground text-center mt-3">
              Clique em play para iniciar a música
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;

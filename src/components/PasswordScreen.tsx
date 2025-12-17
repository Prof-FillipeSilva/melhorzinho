import { useState, useCallback } from "react";
import { siteConfig } from "@/data/siteData";
import { Lock, ArrowRight, Heart } from "lucide-react";

interface PasswordScreenProps {
  onAccessGranted: () => void;
}

const PasswordScreen = ({ onAccessGranted }: PasswordScreenProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === siteConfig.password) {
      setIsExiting(true);
      setTimeout(() => {
        onAccessGranted();
      }, 800);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }, [password, onAccessGranted]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 ${
        isExiting ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-midnight to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-gold/10 via-transparent to-transparent" />
      </div>

      {/* Animated particles/stars effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-rose-gold/30 rounded-full animate-breathe"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="text-center mb-10 animate-fade-in">
          <Heart className="w-12 h-12 text-primary mx-auto mb-6 float" />
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4 text-shadow">
            Para uma idiota especial
          </h1>
          <p className="text-muted-foreground font-body text-lg">
            Digite a senha para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up delay-200">
          <div className="glass rounded-2xl p-8">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha secreta..."
                className={`w-full bg-muted/50 border rounded-xl py-4 pl-12 pr-4 
                  text-foreground placeholder:text-muted-foreground/50 
                  focus:outline-none focus:ring-2 transition-all duration-300
                  ${error 
                    ? "border-destructive ring-destructive/20 animate-[shake_0.5s_ease-in-out]" 
                    : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  }`}
              />
            </div>

            {error && (
              <p className="text-destructive text-sm mt-3 text-center animate-fade-in">
                Senha incorreta. Tente novamente.
              </p>
            )}

            <button
              type="submit"
              className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground 
                rounded-xl py-4 font-body font-medium flex items-center justify-center gap-2
                transition-all duration-300 hover:gap-4 pulse-glow"
            >
              Entrar
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>

        <p className="text-center text-muted-foreground/50 text-sm mt-8 animate-fade-in delay-500">
          Os motivos que não me deixam ficar mal com você ✨
        </p>
      </div>

      {/* Shake animation for error */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default PasswordScreen;

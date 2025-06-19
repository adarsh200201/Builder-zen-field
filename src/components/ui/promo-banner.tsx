import { X, Wifi, WifiOff } from "lucide-react";
import { useState, useEffect } from "react";

interface PromoBannerProps {
  className?: string;
  onClose?: () => void;
  closeable?: boolean;
}

export function PromoBanner({
  className = "",
  onClose,
  closeable = true,
}: PromoBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  // Check if backend is available
  useEffect(() => {
    const checkBackend = async () => {
      try {
        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/health`,
          { method: "GET", signal: controller.signal },
        );

        clearTimeout(timeoutId);
        setIsOfflineMode(!response.ok);
      } catch (error) {
        console.log("Backend check failed:", error.message);
        setIsOfflineMode(true);
      }
    };
    checkBackend();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`bg-gradient-to-r from-brand-red/10 to-red-100 border-l-4 border-brand-red p-6 rounded-lg shadow-sm text-brand-red relative ${className}`}
    >
      {closeable && (
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-brand-red/60 hover:text-brand-red transition-colors p-1"
          aria-label="Close banner"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      <div className="pr-8">
        <div className="flex items-center gap-2 mb-3">
          <p className="text-lg font-bold text-brand-red">
            📣 <strong>Limited Time Offer:</strong>
          </p>
          {isOfflineMode && (
            <div className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              <WifiOff className="w-3 h-3" />
              Offline Mode
            </div>
          )}
        </div>

        <div className="space-y-3 text-sm md:text-base font-medium">
          <p className="hidden md:block">
            ✨ No limits, no locks, no need to pay,
            <br />
            All our tools are{" "}
            <strong className="text-brand-red">100% free</strong> — starting
            today!
            <br />
            Merge, compress, or create your resume,
            <br />
            Unlimited access, come and play!
          </p>

          <p className="hidden md:block">
            For <strong className="text-brand-red">3 full months</strong>, enjoy
            our best,
            <br />
            No ads, no limits, just give it a test.
            <br />
            After that, choose free or go Pro,
            <br />
            But for now, just{" "}
            <strong className="text-brand-red">enjoy the flow</strong>. 🚀
          </p>

          {/* Mobile version - shorter text */}
          <p className="md:hidden">
            ✨ <strong className="text-brand-red">3 months FREE!</strong> All
            tools unlocked, no limits, no ads. Try everything before deciding on
            a plan! 🚀
          </p>

          <p className="font-bold text-brand-red border-t border-brand-red/20 pt-3">
            🔓 Everything is unlocked — try it now before the timer runs out!
          </p>
        </div>
      </div>
    </div>
  );
}

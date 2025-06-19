import { useState, useEffect } from "react";
import { Wifi, WifiOff } from "lucide-react";

export function NetworkStatus() {
  const [isBackendOnline, setIsBackendOnline] = useState(true);
  const [isChecking, setIsChecking] = useState(false);

  const checkBackendStatus = async () => {
    if (isChecking) return;

    setIsChecking(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/health`,
        {
          method: "GET",
          signal: AbortSignal.timeout(5000), // 5 second timeout
        },
      );
      setIsBackendOnline(response.ok);
    } catch (error) {
      setIsBackendOnline(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    // Check initially
    checkBackendStatus();

    // Check every 30 seconds
    const interval = setInterval(checkBackendStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isBackendOnline) {
    return null; // Don't show anything when everything is working
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
        <WifiOff className="w-5 h-5 text-yellow-600" />
        <div className="text-sm">
          <p className="font-medium">Limited connectivity</p>
          <p className="text-xs">
            Tools working in offline mode during free period
          </p>
        </div>
        <button
          onClick={checkBackendStatus}
          disabled={isChecking}
          className="text-yellow-600 hover:text-yellow-800 transition-colors"
          title="Check connection"
        >
          <Wifi className={`w-4 h-4 ${isChecking ? "animate-pulse" : ""}`} />
        </button>
      </div>
    </div>
  );
}

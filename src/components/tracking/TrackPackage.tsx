import { useState } from "react";
import Button from "../ui/button/Button";

interface TrackPackageProps {
  onTrack: (trackingNumber: string) => void;
  isTracking: boolean;
}

export default function TrackPackage({ onTrack, isTracking }: TrackPackageProps) {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleTrack = () => {
    if (!trackingNumber.trim()) return;
    onTrack(trackingNumber);
  };

  return (
    <div className="w-full max-w-md pt-6 mx-auto">
      <div className="p-5 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          
          <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Track Your Package
          </h3>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter tracking number (e.g., DMS123456789)"
            className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder:text-gray-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          />
          <Button 
            size="sm" 
            variant="primary"
            onClick={handleTrack}
            disabled={!trackingNumber.trim()}
            loading={isTracking}
          >
            Track
          </Button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Enter your tracking number to get real-time delivery updates
        </p>
      </div>
    </div>
  );
}

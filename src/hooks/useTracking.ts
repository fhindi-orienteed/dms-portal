import { useState } from "react";

interface TrackingHistory {
  status: string;
  time: string;
  date: string;
}

interface TrackingResult {
  trackingNumber: string;
  status: string;
  currentLocation: string;
  carrier: string;
  estimatedDelivery: string;
  history: TrackingHistory[];
}

export const useTracking = () => {
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trackPackage = async (trackingNumber: string) => {
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number");
      return;
    }

    setIsTracking(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockResult: TrackingResult = {
        trackingNumber: trackingNumber,
        status: "In Transit",
        currentLocation: "Distribution Center - London",
        carrier: "DMS Express",
        estimatedDelivery: "Tomorrow, 2:00 PM",
        history: [
          { status: "Package picked up", time: "9:00 AM", date: "Today" },
          { status: "In transit", time: "11:30 AM", date: "Today" },
          { status: "Out for delivery", time: "8:00 AM", date: "Tomorrow" }
        ]
      };

      setTrackingResult(mockResult);
    } catch (err) {
      setError("Failed to track package. Please try again.");
    } finally {
      setIsTracking(false);
    }
  };

  const resetTracking = () => {
    setTrackingResult(null);
    setError(null);
  };

  return {
    trackingResult,
    isTracking,
    error,
    trackPackage,
    resetTracking
  };
};

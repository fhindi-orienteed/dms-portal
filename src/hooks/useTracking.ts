import { useState } from "react";

interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface TrackingHistory {
  status: string;
  time: string;
  date: string;
  location?: Location;
}

interface TrackingResult {
  trackingNumber: string;
  status: string;
  currentLocation: string;
  currentCoordinates: Location;
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
        currentCoordinates: {
          lat: 51.5074,
          lng: -0.1278,
          name: "Distribution Center - London, UK"
        },
        carrier: "DMS Express",
        estimatedDelivery: "Tomorrow, 2:00 PM",
        history: [
          { 
            status: "Package picked up", 
            time: "9:00 AM", 
            date: "Today",
            location: {
              lat: 51.4994,
              lng: -0.1245,
              name: "Warehouse - South London"
            }
          },
          { 
            status: "In transit", 
            time: "11:30 AM", 
            date: "Today",
            location: {
              lat: 51.5033,
              lng: -0.1195,
              name: "Sorting Facility - Central London"
            }
          },
          { 
            status: "Out for delivery", 
            time: "8:00 AM", 
            date: "Tomorrow",
            location: {
              lat: 51.5074,
              lng: -0.1278,
              name: "Distribution Center - London, UK"
            }
          }
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

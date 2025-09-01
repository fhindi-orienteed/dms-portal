import { useState } from "react";
import { Link } from "react-router";
import TrackPackage from "./TrackPackage";
import TrackingResults from "./TrackingResults";
import { useTracking } from "../../hooks/useTracking";

export default function TrackingPage() {
  const { trackingResult, isTracking, error, trackPackage, resetTracking } = useTracking();
  const [showSignIn, setShowSignIn] = useState(true);

  const handleTrack = (trackingNumber: string) => {
    trackPackage(trackingNumber);
    setShowSignIn(false);
  };

  const handleTrackAnother = () => {
    resetTracking();
    setShowSignIn(true);
  };

  const handleSignIn = () => {
    setShowSignIn(true);
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Register as Merchant Link - Top */}
      <div className="w-full max-w-md pt-10 mx-auto">
        <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
          Want to become a merchant? {""}
          <Link
            to="/signup"
            className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
          >
            Register as Merchant
          </Link>
        </p>
      </div>

      {/* Track Package Form */}
      <TrackPackage onTrack={handleTrack} isTracking={isTracking} />

      {/* Error Display */}
      {error && (
        <div className="w-full max-w-md mx-auto mt-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      )}

      {/* Tracking Results or Sign In Form */}
      {trackingResult ? (
        <TrackingResults 
          result={trackingResult}
          onTrackAnother={handleTrackAnother}
          onSignIn={handleSignIn}
        />
      ) : showSignIn ? (
        <div className="w-full max-w-md mx-auto mt-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Or sign in to access your account
            </p>
            <Link
              to="/signin"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

import Button from "../ui/button/Button";
import MapComponent from "./MapComponent";

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

interface TrackingResultsProps {
  result: TrackingResult;
  onTrackAnother: () => void;
  onSignIn: () => void;
}

export default function TrackingResults({ result, onTrackAnother, onSignIn }: TrackingResultsProps) {
  const historyLocations = result.history
    .filter(item => item.location)
    .map(item => ({
      ...item.location!,
      status: item.status,
      time: `${item.time} - ${item.date}`
    }));

  return (
    <div className="w-full max-w-4xl mx-auto mt-4">
      <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-white">Package Found!</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">#{result.trackingNumber}</p>
            </div>
          </div>
          <button 
            onClick={onTrackAnother}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Map Section */}
        <div className="mb-4">
          <h4 className="text-xs font-medium text-gray-800 dark:text-white mb-2 flex items-center gap-1">
            <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Package Location
          </h4>
          <MapComponent
            currentLocation={result.currentCoordinates}
            trackingHistory={historyLocations}
            className="h-40 w-full rounded-lg border border-gray-200 dark:border-gray-700"
          />
        </div>

        {/* Status */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Current Status</span>
          </div>
          <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">{result.status}</p>
          <p className="text-xs text-blue-600 dark:text-blue-400">{result.currentLocation}</p>
        </div>

        {/* Delivery Info */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Carrier</p>
            <p className="text-xs font-medium text-gray-800 dark:text-white">{result.carrier}</p>
          </div>
          <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Est. Delivery</p>
            <p className="text-xs font-medium text-gray-800 dark:text-white">{result.estimatedDelivery}</p>
          </div>
        </div>

        {/* Tracking History */}
        <div className="mb-4">
          <h4 className="text-xs font-medium text-gray-800 dark:text-white mb-2">Tracking History</h4>
          <div className="space-y-2">
            {result.history.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-800 dark:text-white">{item.status}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.time} - {item.date}</p>
                  {item.location && (
                    <p className="text-xs text-gray-400 dark:text-gray-500">{item.location.name}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="primary"
            className="flex-1 text-xs"
            onClick={onTrackAnother}
          >
            Track Another Package
          </Button>
          <Button 
            size="sm" 
            variant="secondary"
            className="flex-1 text-xs"
            onClick={onSignIn}
          >
            Sign In for More
          </Button>
        </div>
      </div>
    </div>
  );
}

import Button from "../ui/button/Button";

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

interface TrackingResultsProps {
  result: TrackingResult;
  onTrackAnother: () => void;
  onSignIn: () => void;
}

export default function TrackingResults({ result, onTrackAnother, onSignIn }: TrackingResultsProps) {
  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Package Found!</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">#{result.trackingNumber}</p>
            </div>
          </div>
          <button 
            onClick={onTrackAnother}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Status */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Current Status</span>
          </div>
          <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">{result.status}</p>
          <p className="text-sm text-blue-600 dark:text-blue-400">{result.currentLocation}</p>
        </div>

        {/* Delivery Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Carrier</p>
            <p className="text-sm font-medium text-gray-800 dark:text-white">{result.carrier}</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Est. Delivery</p>
            <p className="text-sm font-medium text-gray-800 dark:text-white">{result.estimatedDelivery}</p>
          </div>
        </div>

        {/* Tracking History */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Tracking History</h4>
          <div className="space-y-3">
            {result.history.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{item.status}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.time} - {item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            size="sm" 
            variant="primary"
            className="flex-1"
            onClick={onTrackAnother}
          >
            Track Another Package
          </Button>
          <Button 
            size="sm" 
            variant="secondary"
            className="flex-1"
            onClick={onSignIn}
          >
            Sign In for More
          </Button>
        </div>
      </div>
    </div>
  );
}

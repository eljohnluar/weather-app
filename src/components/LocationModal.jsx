import { AlertCircle, MapPin, X } from 'lucide-react';

const LocationModal = ({ isOpen, onClose, onEnableLocation, onNotNow }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-2xl max-w-md w-full border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Enable Location Services</h3>
          </div>
          <button
            onClick={onNotNow}
            className="text-gray-400 hover:text-gray-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="bg-yellow-500/10 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <MapPin className="w-10 h-10 text-yellow-400" />
            </div>
            <p className="text-gray-300 mb-2">
              Allow location access to get accurate weather for your area
            </p>
            <p className="text-gray-400 text-sm">
              Your location helps us provide real-time weather updates for your exact area.
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-gray-700/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-300 font-medium mb-2">With location on, you'll get:</p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Accurate local weather data</li>
              <li>• Real-time temperature for your area</li>
              <li>• Relevant forecasts for your location</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onNotNow}
              className="flex-1 px-4 py-2.5 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition font-medium"
            >
              Not Now
            </button>
            <button
              onClick={onEnableLocation}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Turn On My Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
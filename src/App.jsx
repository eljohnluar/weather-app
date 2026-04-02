import { useState, useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import LocationModal from './components/LocationModal';
import { Search, MapPin, Droplets, Wind, Thermometer, Eye, X, AlertCircle } from 'lucide-react';

function App() {
  const { 
    weather, 
    forecast, 
    loading, 
    error, 
    searchWeather, 
    locationStatus,
    showLocationModal,
    enableLocation,
    notNow,
    searchError,
    clearSearchError
  } = useWeather();
  
  const [searchCity, setSearchCity] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showLocationToast, setShowLocationToast] = useState(false);
  const [showNotFoundToast, setShowNotFoundToast] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState('');

  // Auto-hide not found toast after 3 seconds
  useEffect(() => {
    if (showNotFoundToast) {
      const timer = setTimeout(() => {
        setShowNotFoundToast(false);
        setNotFoundMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotFoundToast]);

  // Watch for search errors
  useEffect(() => {
    if (searchError) {
      setNotFoundMessage(searchError);
      setShowNotFoundToast(true);
      clearSearchError();
    }
  }, [searchError, clearSearchError]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchCity.trim()) return;
    
    setIsSearching(true);
    await searchWeather(searchCity);
    setIsSearching(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const handleUseCurrentLocation = () => {
    if (locationStatus === 'denied' || locationStatus === 'unavailable') {
      setShowLocationToast(true);
    } else {
      enableLocation();
    }
  };

  const handleClearSearch = () => {
    setSearchCity('');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading weather data...</p>
        </div>
      </div>
    );
  }

  // Show error state only for non-search errors
  if (error && !weather) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 max-w-md text-center">
          <p className="text-red-400">{error}</p>
          <div className="flex gap-3 mt-4 justify-center">
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show modal if no weather data and modal is open
  if (showLocationModal && !weather) {
    return (
      <div className="min-h-screen bg-gray-900">
        <LocationModal
          isOpen={showLocationModal}
          onClose={notNow}
          onEnableLocation={enableLocation}
          onNotNow={notNow}
        />
      </div>
    );
  }

  // If we have weather data, show the app
  if (!weather) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <p>Something went wrong. Please refresh the page.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 rounded-lg"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  // Main app view
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Simple Top-Right Toast Notification for City Not Found */}
      {showNotFoundToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-5 duration-300">
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
            {notFoundMessage}
          </div>
        </div>
      )}

      {/* Location Toast Notification - Simple Message */}
      {showLocationToast && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" />
          
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 rounded-2xl shadow-2xl max-w-sm w-full mx-auto overflow-hidden">
              <div className="flex justify-center pt-6">
                <div className="bg-gray-900/10 rounded-full p-3">
                  <AlertCircle className="w-12 h-12 text-gray-900" />
                </div>
              </div>
              
              <div className="text-center p-6">
                <h3 className="text-xl font-bold mb-2">Location Services Are Off</h3>
                <p className="text-gray-900/80 text-base mb-6">
                  Turn on location on your device
                </p>
                
                <button
                  onClick={() => setShowLocationToast(false)}
                  className="w-full px-4 py-2.5 bg-gray-900 text-yellow-500 font-medium rounded-lg hover:bg-gray-800 transition"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Search Section */}
        <div className="mb-6 space-y-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search city"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isSearching}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-3 px-4 pl-10 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition disabled:opacity-50 text-base sm:text-sm"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            {searchCity && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </form>
          
          <div className="flex gap-2">
            <button
              onClick={handleUseCurrentLocation}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-800 transition active:scale-95 touch-manipulation"
            >
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Current Location</span>
              <span className="sm:hidden">Current Location</span>
            </button>
            {isSearching && (
              <div className="flex items-center text-sm text-gray-400">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400 mr-2"></div>
                <span className="hidden sm:inline">Searching...</span>
              </div>
            )}
          </div>
        </div>

        {/* Hero Card */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">{weather.name}, {weather.sys.country}</h2>
              <p className="text-gray-400 capitalize mt-1 text-sm sm:text-base">{weather.weather[0].description}</p>
            </div>
            <img 
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt={weather.weather[0].description}
              className="w-16 h-16 sm:w-20 sm:h-20 -mt-2"
            />
          </div>
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-5xl sm:text-7xl font-bold">{Math.round(weather.main.temp)}°</span>
            <span className="text-gray-400 text-sm sm:text-base">Feels like {Math.round(weather.main.feels_like)}°</span>
          </div>
          <div className="flex gap-4 mt-4 text-xs sm:text-sm text-gray-400">
            <span>↑ High: {Math.round(weather.main.temp_max)}°</span>
            <span>↓ Low: {Math.round(weather.main.temp_min)}°</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-700">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Droplets className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Humidity</span>
            </div>
            <p className="text-xl sm:text-2xl font-semibold">{weather.main.humidity}%</p>
          </div>
          
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-700">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Wind className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Wind Speed</span>
            </div>
            <p className="text-xl sm:text-2xl font-semibold">{Math.round(weather.wind.speed)} km/h</p>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-700">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Thermometer className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Pressure</span>
            </div>
            <p className="text-xl sm:text-2xl font-semibold">{weather.main.pressure} hPa</p>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-700">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Eye className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Visibility</span>
            </div>
            <p className="text-xl sm:text-2xl font-semibold">{(weather.visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>

        {/* Forecast Section */}
        {forecast && forecast.list && (
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-700">
            <h3 className="text-base sm:text-lg font-semibold mb-4">5-Day Forecast</h3>
            <div className="space-y-3">
              {forecast.list.filter((_, index) => index % 8 === 0).slice(0, 5).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-sm sm:text-base">
                      {new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(item.dt * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <img 
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    alt={item.weather[0].description}
                    className="w-8 h-8 sm:w-10 sm:h-10"
                  />
                  <div className="flex-1 text-right">
                    <p className="font-semibold text-sm sm:text-base">{Math.round(item.main.temp)}°C</p>
                    <p className="text-xs text-gray-400 capitalize truncate max-w-[80px] sm:max-w-none">
                      {item.weather[0].description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
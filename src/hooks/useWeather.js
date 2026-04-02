import { useState, useEffect } from 'react';
import { 
  getWeatherByCoords, 
  getForecastByCoords,
  searchCity,
  searchForecast
} from '../services/weatherService';

const DEFAULT_CITY = 'Manila';

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [locationStatus, setLocationStatus] = useState('loading');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [hasAttemptedLocation, setHasAttemptedLocation] = useState(false);

  const fetchWeather = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);
      const [weatherData, forecastData] = await Promise.all([
        getWeatherByCoords(lat, lon),
        getForecastByCoords(lat, lon)
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
      setLocationStatus('granted');
      setShowLocationModal(false);
      localStorage.setItem('locationPreference', 'granted');
    } catch (err) {
      console.error('Fetch weather error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDefaultWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const [weatherData, forecastData] = await Promise.all([
        searchCity(DEFAULT_CITY),
        searchForecast(DEFAULT_CITY)
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      console.error('Default weather error:', err);
      setError(`Unable to load default location (${DEFAULT_CITY}). Please check your internet connection.`);
    } finally {
      setLoading(false);
    }
  };

  const searchWeather = async (city) => {
    if (!city.trim()) return false;
    
    // Don't set loading to true to avoid page flicker
    setSearchError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        searchCity(city),
        searchForecast(city)
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
      return true;
    } catch (err) {
      console.error('Search error:', err);
      setSearchError(err.message);
      return false;
    }
  };

  const clearSearchError = () => {
    setSearchError(null);
  };

  const enableLocation = () => {
    setShowLocationModal(false);
    setLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.error('Geolocation error:', err);
          if (err.code === err.PERMISSION_DENIED) {
            setLocationStatus('denied');
            localStorage.setItem('locationPreference', 'denied');
            setError('Location access denied. Showing weather for Manila, Philippines as default.');
          } else {
            setLocationStatus('unavailable');
            setError('Location unavailable. Showing weather for Manila, Philippines as default.');
          }
          fetchDefaultWeather();
        }
      );
    } else {
      setLocationStatus('unavailable');
      setError('Geolocation is not supported by your browser. Showing weather for Manila, Philippines as default.');
      fetchDefaultWeather();
    }
  };

  const notNow = () => {
    setShowLocationModal(false);
    setLocationStatus('denied');
    localStorage.setItem('locationPreference', 'denied');
    fetchDefaultWeather();
  };

  useEffect(() => {
    if (!hasAttemptedLocation) {
      setHasAttemptedLocation(true);
      
      const savedPreference = localStorage.getItem('locationPreference');
      
      if (savedPreference === 'granted') {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            (err) => {
              console.error('Geolocation error:', err);
              fetchDefaultWeather();
            }
          );
        } else {
          fetchDefaultWeather();
        }
      } else if (savedPreference === 'denied') {
        fetchDefaultWeather();
      } else {
        setShowLocationModal(true);
        setLoading(false);
      }
    }
  }, []);

  return { 
    weather, 
    forecast, 
    loading, 
    error,
    searchError,
    clearSearchError,
    searchWeather, 
    locationStatus,
    showLocationModal,
    enableLocation,
    notNow
  };
};
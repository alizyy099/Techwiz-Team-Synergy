import { useState, useEffect } from 'react';

/**
 * Custom hook for HTML5 Geolocation API.
 * Gracefully handles permissions, errors, and provides safe fallback text.
 */
export function useGeolocation() {
  const [locationState, setLocationState] = useState({
    loading: true,
    supported: true,
    granted: false,
    latitude: null,
    longitude: null,
    cityLabel: 'Detecting location...',
    errorMessage: null
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationState({
        loading: false,
        supported: false,
        granted: false,
        latitude: null,
        longitude: null,
        cityLabel: 'Location access is unavailable. Showing general updates.',
        errorMessage: 'Geolocation is not supported by your browser.'
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(2);
        const lon = position.coords.longitude.toFixed(2);
        
        setLocationState({
          loading: false,
          supported: true,
          granted: true,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          cityLabel: `Active Region (${lat}° N, ${Math.abs(lon)}° W)`,
          errorMessage: null
        });
      },
      (error) => {
        let message = 'Location access is unavailable. Showing general updates.';
        if (error.code === error.PERMISSION_DENIED) {
          message = 'Location access is unavailable. Showing general updates.';
        }
        setLocationState({
          loading: false,
          supported: true,
          granted: false,
          latitude: null,
          longitude: null,
          cityLabel: message,
          errorMessage: error.message
        });
      },
      {
        timeout: 10000,
        maximumAge: 60000,
        enableHighAccuracy: false
      }
    );
  }, []);

  return locationState;
}

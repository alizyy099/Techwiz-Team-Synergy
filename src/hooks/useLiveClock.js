import { useState, useEffect } from 'react';

/**
 * Custom hook for a real-time reactive clock using JavaScript Date API.
 * Updates every second and provides formatted time and date strings.
 */
export function useLiveClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeString = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const shortTimeString = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const dateString = now.toLocaleDateString([], {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const isoString = now.toISOString();

  return {
    now,
    timeString,
    shortTimeString,
    dateString,
    isoString
  };
}

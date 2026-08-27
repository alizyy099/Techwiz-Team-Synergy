import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { useGeolocation } from '../../hooks/useGeolocation';

/**
 * Geolocation Display Component with graceful fallback
 */
export default function LocationDisplay({ compact = false }) {
  const { granted, cityLabel, loading } = useGeolocation();

  if (compact) {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-secondary)'
        }}
      >
        <MapPin size={14} color="var(--color-accent)" />
        <span>{loading ? 'Detecting location...' : cityLabel}</span>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 14px',
        borderRadius: 'var(--radius-full)',
        backgroundColor: granted ? 'var(--color-wellness-soft)' : 'var(--color-surface-warm)',
        border: `1px solid ${granted ? 'rgba(78, 110, 88, 0.25)' : 'var(--color-border)'}`,
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        color: granted ? 'var(--color-wellness-dark)' : 'var(--color-primary)'
      }}
    >
      {granted ? (
        <Navigation size={14} color="var(--color-wellness)" />
      ) : (
        <MapPin size={14} color="var(--color-accent)" />
      )}
      <span>{loading ? 'Detecting location...' : cityLabel}</span>
    </div>
  );
}

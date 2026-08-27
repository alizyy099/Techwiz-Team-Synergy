import { Bell, Clock, MapPin, Sparkles, ShieldAlert } from 'lucide-react';
import tickerData from '../../data/tickerUpdates.json';
import { useLiveClock } from '../../hooks/useLiveClock';
import { useGeolocation } from '../../hooks/useGeolocation';

/**
 * Hardware-accelerated smooth scrolling ticker
 * Shows real-time clock, geolocation, announcements, and pet health updates.
 */
export default function ScrollingTicker() {
  const { shortTimeString, dateString } = useLiveClock();
  const { cityLabel } = useGeolocation();

  // Combine live telemetry with JSON ticker updates
  const items = [
    {
      id: 'telemetry-clock',
      icon: Clock,
      text: `Live Time: ${dateString} • ${shortTimeString}`,
      isLive: true
    },
    {
      id: 'telemetry-geo',
      icon: MapPin,
      text: `Region: ${cityLabel}`,
      isLive: true
    },
    ...tickerData.map((item) => ({
      id: item.id,
      icon: item.type === 'alert' ? ShieldAlert : item.type === 'event' ? Bell : Sparkles,
      text: item.text,
      isLive: false
    }))
  ];

  // Duplicate items array to achieve a seamless, continuous marquee loop
  const duplicatedItems = [...items, ...items];

  return (
    <div
      style={{
        backgroundColor: 'var(--color-primary)',
        color: '#FFFFFF',
        overflow: 'hidden',
        position: 'relative',
        padding: '10px 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        userSelect: 'none'
      }}
      aria-label="Real-time announcements and care ticker"
    >
      <div
        className="ticker-track"
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          width: 'max-content',
          animation: 'tickerSlide 40s linear infinite'
        }}
      >
        {duplicatedItems.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div
              key={`${item.id}-${idx}`}
              className="ticker-item"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0 28px',
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: item.isLive ? 'var(--color-accent-border)' : 'rgba(255, 255, 255, 0.92)'
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.isLive ? 'var(--color-accent)' : '#D989BE'
                }}
              >
                <IconComponent size={14} />
              </span>
              <span>{item.text}</span>
              <span
                style={{
                  marginLeft: '20px',
                  color: 'rgba(255, 255, 255, 0.25)',
                  fontSize: '0.9rem'
                }}
              >
                ✦
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

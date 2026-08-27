import { Clock } from 'lucide-react';
import { useLiveClock } from '../../hooks/useLiveClock';

/**
 * Live Clock Display component with real-time seconds ticking.
 */
export default function LiveClockDisplay({ showSeconds = true, compact = false }) {
  const { timeString, shortTimeString, dateString } = useLiveClock();

  if (compact) {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-primary)',
          fontWeight: 600
        }}
      >
        <Clock size={14} color="var(--color-accent)" />
        <span>{showSeconds ? timeString : shortTimeString}</span>
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
        backgroundColor: 'var(--color-surface-warm)',
        border: '1px solid var(--color-border)',
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        color: 'var(--color-primary)'
      }}
    >
      <Clock size={14} color="var(--color-accent)" />
      <span>{dateString}</span>
      <span style={{ color: 'var(--color-border-strong)' }}>•</span>
      <span style={{ fontFamily: 'monospace', letterSpacing: '0.02em' }}>
        {showSeconds ? timeString : shortTimeString}
      </span>
    </div>
  );
}

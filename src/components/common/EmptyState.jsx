import React from 'react';
import { SearchX } from 'lucide-react';

/**
 * Polished Empty State Component for search/filters
 */
export default function EmptyState({
  title = 'No matches found',
  description = 'Try adjusting your search criteria or resetting the filters to view available listings.',
  onReset,
  resetText = 'Reset All Filters'
}) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: 'var(--space-12) var(--space-6)',
        backgroundColor: 'var(--color-surface-warm)',
        borderRadius: 'var(--radius-lg)',
        border: '1.5px dashed var(--color-border)',
        margin: 'var(--space-6) 0'
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-accent-soft)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-accent)',
          margin: '0 auto var(--space-4) auto'
        }}
      >
        <SearchX size={28} />
      </div>

      <h4 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
        {title}
      </h4>
      <p
        style={{
          fontSize: 'var(--text-sm)',
          maxWidth: '460px',
          margin: '0 auto var(--space-6) auto',
          color: 'var(--color-text-secondary)'
        }}
      >
        {description}
      </p>

      {onReset && (
        <button onClick={onReset} className="btn btn-outline btn-sm">
          {resetText}
        </button>
      )}
    </div>
  );
}

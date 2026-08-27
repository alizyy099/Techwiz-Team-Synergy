import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

/**
 * Toast Notification system for simulated actions & feedback
 */
export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success' || !toast.type;
  const isError = toast.type === 'error';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 99999,
        maxWidth: '420px',
        backgroundColor: '#FFFFFF',
        color: 'var(--color-primary)',
        padding: '16px 20px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-xl)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        animation: 'fadeInUp 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}
    >
      <div style={{ marginTop: '2px', flexShrink: 0 }}>
        {isSuccess && <CheckCircle2 size={20} color="var(--color-wellness)" />}
        {isError && <AlertCircle size={20} color="var(--color-danger)" />}
        {!isSuccess && !isError && <Info size={20} color="var(--color-accent)" />}
      </div>

      <div style={{ flex: 1 }}>
        {toast.title && (
          <div
            style={{
              fontWeight: 700,
              fontSize: 'var(--text-sm)',
              marginBottom: '2px'
            }}
          >
            {toast.title}
          </div>
        )}
        <div
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.5
          }}
        >
          {toast.message}
        </div>
      </div>

      <button
        onClick={onClose}
        style={{
          padding: '4px',
          color: 'var(--color-text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}

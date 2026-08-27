import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Accessible modal dialog component with backdrop and ESC key listener.
 */
export default function Modal({ isOpen, onClose, title, children, maxWidth = '600px' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(44, 24, 16, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
        animation: 'fadeInUp 200ms ease-out forwards'
      }}
      onClick={onClose}
    >
      <div
        className="modal-container"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-modal)',
          width: '100%',
          maxWidth: maxWidth,
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: 'var(--space-8)',
          position: 'relative',
          animation: 'fadeInScale 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-6)',
            paddingBottom: 'var(--space-4)',
            borderBottom: '1px solid var(--color-border-subtle)'
          }}
        >
          {title ? (
            <h3 style={{ margin: 0, fontSize: 'var(--text-xl)' }}>{title}</h3>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              padding: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-surface-warm)',
              color: 'var(--color-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}

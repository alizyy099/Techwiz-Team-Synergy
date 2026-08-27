import React from 'react';
import { Calendar } from 'lucide-react';
import LiveClockDisplay from '../common/LiveClockDisplay';
import LocationDisplay from '../common/LocationDisplay';

/**
 * Mobile Drawer Menu component
 */
export default function MobileDrawer({
  isOpen,
  onClose,
  navLinks,
  activeTab,
  onNavClick,
  userName,
  userRole,
  onOpenAppointmentModal
}) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '76px',
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: 'calc(100dvh - 76px)',
        backgroundColor: 'rgba(20, 11, 46, 0.55)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        zIndex: 7999,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
      onClick={onClose}
    >
      {/* Drawer Panel */}
      <div
        style={{
          width: '100%',
          height: 'min(620px, calc(100dvh - 76px))',
          minHeight: '420px',
          backgroundColor: 'var(--color-bg)',
          borderBottom: '1.5px solid var(--color-border)',
          padding: 'var(--space-5) var(--space-4)',
          boxShadow: 'var(--shadow-xl)',
          animation: 'fadeInUp 200ms ease-out forwards',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* User Info */}
        {userName && (
          <div
            style={{
              flexShrink: 0,
              padding: 'var(--space-3) var(--space-4)',
              backgroundColor: 'var(--color-accent-soft)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-accent-border)',
              marginBottom: 'var(--space-4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)'
                }}
              >
                Active Session
              </div>

              <div
                style={{
                  fontWeight: 700,
                  color: 'var(--color-primary)'
                }}
              >
                {userName} ({userRole || 'Pet Owner'})
              </div>
            </div>
          </div>
        )}

        {/* Live Info */}
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginBottom: 'var(--space-4)'
          }}
        >
          <LiveClockDisplay compact />
          <LocationDisplay compact />
        </div>

        {/* Navigation Links */}
        <nav
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            marginBottom: 'var(--space-4)',
            paddingRight: '4px',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'thin'
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;

            return (
              <button
                key={link.id}
                onClick={() => onNavClick(link.id)}
                style={{
                  flexShrink: 0,
                  width: '100%',
                  minHeight: '52px',
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'left',
                  fontSize: '1rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive
                    ? 'var(--color-primary)'
                    : 'var(--color-text-secondary)',
                  backgroundColor: isActive
                    ? 'var(--color-surface-warm)'
                    : 'transparent',
                  border: isActive
                    ? '1px solid var(--color-border)'
                    : '1px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
              >
                <span>{link.label}</span>

                {isActive && (
                  <span
                    style={{
                      color: 'var(--color-accent)',
                      fontSize: '1.2rem',
                      lineHeight: 1
                    }}
                  >
                    •
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Appointment Button */}
        <button
          onClick={() => {
            onClose();
            onOpenAppointmentModal();
          }}
          className="btn btn-primary"
          style={{
            width: '100%',
            flexShrink: 0
          }}
        >
          <Calendar size={16} />
          <span>Book Vet Appointment</span>
        </button>
      </div>
    </div>
  );
}
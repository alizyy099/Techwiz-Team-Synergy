import React, { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

/**
 * Opening Branded Transition (approx 700ms)
 * Soft cream background, logo reveal with gentle fade-out into the main portal.
 */
export default function SplashScreen({ onComplete }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Start fade out at 650ms
    const timer1 = setTimeout(() => {
      setFading(true);
    }, 650);

    // Completely dismiss at 950ms
    const timer2 = setTimeout(() => {
      onComplete();
    }, 950);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--color-bg)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 300ms ease-out, transform 300ms ease-out',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'auto',
        transform: fading ? 'scale(1.02)' : 'scale(1)'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          animation: 'fadeInUp 450ms cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      >
        <div
          className="animate-pulse"
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'var(--gradient-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 10px 28px rgba(108, 92, 231, 0.35)'
          }}
        >
          <Heart size={32} fill="#FFFFFF" />
        </div>

        <h1
          className="text-gradient"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            margin: 0
          }}
        >
          FurEver Care
        </h1>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-accent)',
            fontSize: '0.875rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}
        >
          <Sparkles size={14} />
          <span>They Deserve Forever Love</span>
          <Sparkles size={14} />
        </div>
      </div>
    </div>
  );
}

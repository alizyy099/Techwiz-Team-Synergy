import React, { useState, useEffect } from 'react';
import { Heart, PhoneCall, ShieldCheck, Mail, MapPin, Sparkles, ArrowUp } from 'lucide-react';

/**
 * Editorial Footer Component with Brand Promise, Quick Links, and Simulated Visitor Counter
 */
export default function Footer({ onNavigate, activeTab }) {
  // Simulated local visitor counter as authorized in SRS
  const [visitorCount, setVisitorCount] = useState(() => {
    try {
      const stored = localStorage.getItem('furever_visitor_count');
      const base = stored ? parseInt(stored, 10) : 14280;
      return base + 1;
    } catch {
      return 14281;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('furever_visitor_count', visitorCount.toString());
    } catch {}
  }, [visitorCount]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-primary)',
        color: '#FAF7F2',
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-8)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Main Footer Grid */}
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 0.9fr 0.9fr 1fr',
            gap: 'var(--space-8)',
            marginBottom: 'var(--space-12)'
          }}
        >
          {/* Column 1: Brand & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-4)' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}
              >
                <Heart size={20} fill="#FFFFFF" />
              </div>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: '#FAF7F2',
                    letterSpacing: '-0.02em',
                    lineHeight: 1
                  }}
                >
                  FurEver Care
                </span>
                <div style={{ fontSize: '0.65rem', color: 'var(--color-accent-border)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                  They Deserve Forever Love
                </div>
              </div>
            </div>

            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-border-strong)', lineHeight: 1.65, maxWidth: '340px', marginBottom: 'var(--space-4)' }}>
              A holistic pet wellness ecosystem connecting compassionate pet parents,
              licensed veterinary physicians, and ethical shelter adoption networks under one
              thoughtfully crafted experience.
            </p>

            {/* Simulated Visitor Counter Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-accent-border)'
              }}
            >
              <Sparkles size={13} color="var(--color-accent)" />
              <span>Community Visits: <strong>{visitorCount.toLocaleString()}</strong></span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 style={{ color: '#FAF7F2', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['home', 'petcare', 'products', 'adoption', 'veterinarian'].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => onNavigate(id)}
                    style={{
                      color: activeTab === id ? 'var(--color-accent-border)' : 'var(--color-border-strong)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: activeTab === id ? 700 : 400,
                      transition: 'color var(--transition-fast)'
                    }}
                    className="hover-scale"
                  >
                    {id === 'petcare' ? 'Pet Care Guides' : id === 'veterinarian' ? 'Veterinary Hub' : id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 style={{ color: '#FAF7F2', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Resources
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['emergency', 'about', 'blog', 'contact', 'feedback'].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => onNavigate(id)}
                    style={{
                      color: activeTab === id ? 'var(--color-accent-border)' : 'var(--color-border-strong)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: activeTab === id ? 700 : 400,
                      transition: 'color var(--transition-fast)'
                    }}
                    className="hover-scale"
                  >
                    {id === 'emergency' ? '24/7 Emergency Help' : id === 'about' ? 'About Our Mission' : id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: 24/7 Emergency Hotline Card */}
          <div>
            <div
              style={{
                backgroundColor: 'rgba(184, 36, 75, 0.22)',
                border: '1px solid rgba(184, 36, 75, 0.45)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FAECEB', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '6px' }}>
                <PhoneCall size={14} color="#F28DAA" />
                <span>24/7 Emergency Vet Hotline</span>
              </div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                (888) 426-4435
              </div>
              <p style={{ fontSize: '0.7rem', color: 'var(--color-border-subtle)', margin: 0, lineHeight: 1.4 }}>
                Instant poison control & acute animal emergency dispatch. Available 365 days.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: 'var(--space-6)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
            fontSize: 'var(--text-xs)',
            color: '#A89990'
          }}
        >
          <div>
            © {new Date().getFullYear()} FurEver Care — Original Competition Single Page Application. All static data served via read-only JSON.
          </div>

          <button
            onClick={scrollToTop}
            className="btn btn-outline btn-sm"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.25)',
              color: '#FAF7F2',
              padding: '6px 12px'
            }}
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}

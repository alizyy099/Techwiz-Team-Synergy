import { useState } from 'react';
import {
  Heart,
  Menu,
  X,
  Calendar,
  Stethoscope,
  Building2,
  PawPrint,
  Home,
  MoreHorizontal
} from 'lucide-react';
import MobileDrawer from './MobileDrawer';

/* Primary tabs surfaced on the app-like mobile bottom bar (max 4 + "More") */
const BOTTOM_NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'petcare', label: 'Pet Care', icon: PawPrint },
  { id: 'adoption', label: 'Adopt', icon: Heart },
  { id: 'veterinarian', label: 'Vet Hub', icon: Stethoscope }
];

/**
 * Responsive Navigation Bar
 * Features brand logo, navigation links, role badge/greeting, appointment CTA, and mobile hamburger.
 */
export default function Navbar({
  activeTab,
  setActiveTab,
  userName,
  userRole,
  onOpenAppointmentModal
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'petcare', label: 'Pet Care' },
    { id: 'pawpulse', label: 'PawPulse' },
    { id: 'products', label: 'Products' },
    { id: 'adoption', label: 'Adoption' },
    { id: 'veterinarian', label: 'Vet Hub' },
    { id: 'emergency', label: 'Emergency' },
    { id: 'about', label: 'About Us' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
    { id: 'feedback', label: 'Feedback' }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getRoleIcon = () => {
    if (userRole === 'Veterinarian') return <Stethoscope size={13} />;
    if (userRole === 'Animal Shelter') return <Building2 size={13} />;
    return <PawPrint size={13} />;
  };

  return (
    <header
      className="glass-surface"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 8000,
        paddingTop: 'var(--safe-top)',
        borderBottom: '1px solid var(--color-border-subtle)',
        transition: 'all var(--transition-normal)'
      }}
    >
      <div
        className="container-wide"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px'
        }}
      >
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textAlign: 'left'
          }}
          aria-label="FurEver Care Home"
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 6px 16px rgba(108, 92, 231, 0.32)'
            }}
          >
            <Heart size={20} fill="#FFFFFF" />
          </div>
          <div>
            <div
              className="text-gradient"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.02em'
              }}
            >
              FurEver Care
            </div>
            <div
              style={{
                fontSize: '0.68rem',
                color: 'var(--color-accent)',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase'
              }}
            >
              Forever Love
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav
          className="nav-desktop-links"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  backgroundColor: isActive ? 'var(--color-surface-warm)' : 'transparent',
                  border: isActive ? '1px solid var(--color-border)' : '1px solid transparent',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Role Status & Appointment CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* User Name & Role Pill */}
          {userName && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-accent-soft)',
                border: '1px solid var(--color-accent-border)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--color-primary)'
              }}
              title={`Logged in as ${userRole || 'Pet Owner'}`}
            >
              {getRoleIcon()}
              <span>
                Hi, <strong>{userName}</strong>
              </span>
            </div>
          )}

          {/* Quick Appointment CTA */}
          <button
            onClick={onOpenAppointmentModal}
            className="btn btn-primary btn-sm"
            style={{ display: 'inline-flex' }}
          >
            <Calendar size={14} />
            <span>Book Visit</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="nav-mobile-toggle"
            style={{
              display: 'none',
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-surface-warm)',
              color: 'var(--color-primary)',
              border: '1px solid var(--color-border)'
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        activeTab={activeTab}
        onNavClick={handleNavClick}
        userName={userName}
        userRole={userRole}
        onOpenAppointmentModal={onOpenAppointmentModal}
      />

      {/* App-Like Mobile Bottom Navigation Bar */}
      <nav className="mobile-bottom-nav" aria-label="Primary mobile navigation">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`mobile-bottom-nav-item${isActive ? ' is-active' : ''}`}
              onClick={() => handleNavClick(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="mobile-bottom-nav-dot" aria-hidden="true" />
              <Icon size={20} strokeWidth={isActive ? 2.4 : 1.9} />
              <span>{item.label}</span>
            </button>
          );
        })}
        <button
          className={`mobile-bottom-nav-item${mobileMenuOpen ? ' is-active' : ''}`}
          onClick={() => setMobileMenuOpen(true)}
          aria-label="More menu"
        >
          <span className="mobile-bottom-nav-dot" aria-hidden="true" />
          <MoreHorizontal size={20} strokeWidth={1.9} />
          <span>More</span>
        </button>
      </nav>
    </header>
  );
}

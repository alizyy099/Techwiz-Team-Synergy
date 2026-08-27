import React from 'react';
import { PawPrint, Stethoscope, Building2, User, Check, Sparkles, ArrowRight } from 'lucide-react';

/**
 * User Onboarding & Category Selector with custom interactive Radio Cards
 */
export default function UserCategorySelector({
  userName,
  setUserName,
  userRole,
  setUserRole,
  onProceed
}) {
  const roles = [
    {
      id: 'Pet Owner',
      title: 'Pet Owner',
      tagline: 'Guardian & Loving Companion',
      description: 'Manage personalized pet passports, tailored feeding schedules, grooming masterclasses, and vaccine reminders.',
      icon: PawPrint,
      color: 'var(--color-accent)',
      badge: 'Personalized Care'
    },
    {
      id: 'Veterinarian',
      title: 'Veterinarian',
      tagline: 'Licensed Medical Practitioner',
      description: 'Review patient case histories, manage booked vs available clinic consultation slots, and publish treatment protocols.',
      icon: Stethoscope,
      color: 'var(--color-wellness)',
      badge: 'Clinical Hub'
    },
    {
      id: 'Animal Shelter',
      title: 'Animal Shelter',
      tagline: 'Rescue & Adoption Center',
      description: 'Showcase rescue animals, review adoption applications, broadcast vaccination drives, and share success stories.',
      icon: Building2,
      color: 'var(--color-info)',
      badge: 'Adoption Portal'
    }
  ];

  return (
    <section
      id="onboarding-section"
      style={{
        paddingTop: 'var(--space-12)',
        paddingBottom: 'var(--space-16)',
        backgroundColor: 'var(--color-surface-warm)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto var(--space-8) auto' }}>
          <span className="badge badge-caramel" style={{ marginBottom: 'var(--space-2)' }}>
            <Sparkles size={12} />
            <span>Tailor Your Journey</span>
          </span>
          <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-3)' }}>
            Welcome to Your Personalized Portal
          </h2>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)' }}>
            Tell us your name and role to customize your dashboard with relevant healthcare tools, schedules, and clinical resources.
          </p>
        </div>

        {/* User First Name Input Box */}
        <div
          style={{
            maxWidth: '480px',
            margin: '0 auto var(--space-8) auto',
            backgroundColor: '#FFFFFF',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <label
            htmlFor="user-first-name"
            style={{
              display: 'block',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              marginBottom: '8px',
              letterSpacing: '0.04em'
            }}
          >
            What is your first name?
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="user-first-name"
              type="text"
              placeholder="e.g. Eleanor, James, or Maya"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{
                paddingLeft: '42px',
                fontSize: '1rem',
                fontWeight: 500
              }}
            />
            <User
              size={18}
              color="var(--color-accent)"
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            />
          </div>
          {userName.trim() && (
            <div
              style={{
                marginTop: '10px',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-wellness)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Check size={14} />
              <span>Great to meet you, {userName}! Choose your role below.</span>
            </div>
          )}
        </div>

        {/* Custom Radio-Card Selector */}
        <div
          className="role-cards-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-6)',
            marginBottom: 'var(--space-8)'
          }}
        >
          {roles.map((r) => {
            const isSelected = userRole === r.id;
            const IconComponent = r.icon;

            return (
              <div
                key={r.id}
                onClick={() => setUserRole(r.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setUserRole(r.id);
                  }
                }}
                className="hover-lift"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  border: isSelected
                    ? '2.5px solid var(--color-accent)'
                    : '1.5px solid var(--color-border)',
                  padding: 'var(--space-6)',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-3)',
                  boxShadow: isSelected ? 'var(--shadow-warm)' : 'var(--shadow-xs)',
                  transition: 'all var(--transition-normal)'
                }}
              >
                {/* Selection Checkmark Bubble */}
                <div
                  style={{
                    position: 'absolute',
                    top: '18px',
                    right: '18px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? 'var(--color-accent)' : 'var(--color-surface-warm)',
                    border: isSelected ? 'none' : '1.5px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {isSelected && <Check size={14} strokeWidth={3} />}
                </div>

                {/* Role Icon */}
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-surface-warm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: r.color
                  }}
                >
                  <IconComponent size={26} />
                </div>

                {/* Role Badge */}
                <div>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: 'var(--color-surface-warm)',
                      color: 'var(--color-primary)',
                      fontSize: '0.68rem',
                      marginBottom: '4px'
                    }}
                  >
                    {r.badge}
                  </span>
                  <h3 style={{ fontSize: 'var(--text-xl)', margin: '4px 0 2px 0' }}>
                    {r.title}
                  </h3>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)', fontWeight: 600 }}>
                    {r.tagline}
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                  {r.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Proceed CTA Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onProceed}
            className="btn btn-primary btn-lg"
            style={{ minWidth: '240px' }}
          >
            <span>
              {userName ? `Explore ${userRole} Experience` : 'Enter FurEver Care'}
            </span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

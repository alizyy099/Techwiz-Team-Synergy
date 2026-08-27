import React from 'react';
import {
  PhoneCall,
  ShieldAlert,
  HeartPulse,
  MapPin,
  AlertTriangle,
  Clock,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import emergencyData from '../../data/emergencyContacts.json';
import SectionHeading from '../common/SectionHeading';

/**
 * Emergency 24/7 Triage & Critical Pet First-Aid Hub
 */
export default function EmergencyHub() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'PhoneCall': return PhoneCall;
      case 'ShieldAlert': return ShieldAlert;
      case 'HeartPulse': return HeartPulse;
      case 'MapPin': return MapPin;
      default: return AlertTriangle;
    }
  };

  return (
    <section className="section-padding" id="emergency-hub">
      <div className="container">
        <SectionHeading
          tag="24/7 Urgent Care & Triage"
          title="Emergency Helplines & First-Aid Protocols"
          description="Immediate telephone hotlines for poison emergencies, acute clinical distress, and step-by-step critical first aid."
        />

        {/* Emergency Hotlines Grid */}
        <div className="grid-2" style={{ marginBottom: 'var(--space-12)' }}>
          {emergencyData.hotlines.map((hotline) => {
            const IconComp = getIcon(hotline.icon);

            return (
              <div
                key={hotline.id}
                className="card-premium hover-lift"
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: 'var(--space-6)',
                  borderRadius: 'var(--radius-lg)',
                  borderLeft: '4px solid var(--color-danger)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--space-3)'
                  }}
                >
                  <span className="badge badge-terracotta" style={{ fontSize: '0.65rem' }}>
                    <AlertTriangle size={12} />
                    <span>{hotline.badge}</span>
                  </span>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-wellness)',
                      fontWeight: 700
                    }}
                  >
                    <Clock size={12} />
                    <span>{hotline.available}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: 'var(--space-3)' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-danger-soft)',
                      color: 'var(--color-danger)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <IconComp size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 'var(--text-lg)', margin: '0 0 2px 0' }}>
                      {hotline.name}
                    </h3>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                      {hotline.feeNote}
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.5,
                    marginBottom: 'var(--space-4)',
                    flex: 1
                  }}
                >
                  {hotline.description}
                </p>

                {/* Direct Tap-to-Call Button */}
                <a
                  href={`tel:${hotline.phone.replace(/[^0-9]/g, '')}`}
                  className="btn btn-primary btn-sm"
                  style={{
                    backgroundColor: 'var(--color-danger)',
                    width: '100%',
                    gap: '8px'
                  }}
                >
                  <PhoneCall size={14} />
                  <span>Call Hotline: {hotline.phone}</span>
                </a>
              </div>
            );
          })}
        </div>

        {/* First-Aid Protocols Header */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h3 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>
            Immediate Critical First-Aid Protocols
          </h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
            Actions to take at home while transporting your pet safely to the veterinary emergency room.
          </p>
        </div>

        {/* First Aid Cards Grid */}
        <div className="grid-2">
          {emergencyData.firstAidGuides.map((guide, idx) => (
            <div
              key={idx}
              className="card-warm hover-lift"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-6)',
                border: '1px solid var(--color-border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="badge badge-terracotta" style={{ fontSize: '0.625rem' }}>
                  {guide.urgency}
                </span>
              </div>

              <h4 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-3)' }}>
                {guide.condition}
              </h4>

              <div
                style={{
                  backgroundColor: 'var(--color-surface-warm)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-subtle)'
                }}
              >
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '6px' }}>
                  Immediate Steps:
                </div>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  {guide.doNow.map((step, sIdx) => (
                    <li
                      key={sIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '6px',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-secondary)'
                      }}
                    >
                      <CheckCircle2 size={14} color="var(--color-danger)" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

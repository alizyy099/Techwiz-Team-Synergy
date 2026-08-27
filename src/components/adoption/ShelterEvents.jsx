import { Calendar, MapPin } from 'lucide-react';
import eventsData from '../../data/events.json';
import SectionHeading from '../common/SectionHeading';

/**
 * Shelter Community Events & Outreach Drives
 */
export default function ShelterEvents() {
  return (
    <section style={{ marginBottom: 'var(--space-16)' }}>
      <SectionHeading
        tag="Community & Outreach"
        title="Upcoming Shelter Festivals & Health Drives"
        description="Join us for fee-waived adoption fairs, free microchipping camps, and hands-on pet first-aid masterclasses."
      />

      <div className="grid-3">
        {eventsData.map((ev) => (
          <div
            key={ev.id}
            className="card-premium hover-lift"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div
              style={{
                position: 'relative',
                aspectRatio: '16/9',
                backgroundColor: 'var(--color-surface-warm)',
                overflow: 'hidden'
              }}
            >
              <img
                src={ev.image}
                alt={ev.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                className="hover-scale"
              />
              <span
                className="badge badge-caramel"
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)'
                }}
              >
                {ev.badge}
              </span>
            </div>

            <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Calendar size={13} color="var(--color-accent)" />
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {ev.date}
                </span>
                <span style={{ color: 'var(--color-border-strong)' }}>•</span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  {ev.time}
                </span>
              </div>

              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                {ev.title}
              </h3>

              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.55,
                  marginBottom: 'var(--space-4)',
                  flex: 1
                }}
              >
                {ev.description}
              </p>

              <div
                style={{
                  marginTop: 'auto',
                  padding: 'var(--space-3) var(--space-4)',
                  backgroundColor: 'var(--color-surface-warm)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-secondary)'
                }}
              >
                <MapPin size={14} color="var(--color-wellness)" />
                <span style={{ fontWeight: 600 }}>{ev.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

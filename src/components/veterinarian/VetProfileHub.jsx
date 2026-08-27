import React from 'react';
import { Stethoscope, Award, MapPin, Phone, Mail, Star, Calendar } from 'lucide-react';
import vetsData from '../../data/vets.json';
import SectionHeading from '../common/SectionHeading';

/**
 * Veterinarian Directory & Physician Profiles
 */
export default function VetProfileHub({ onSelectVetForAppointment }) {
  return (
    <section style={{ marginBottom: 'var(--space-16)' }}>
      <SectionHeading
        tag="Board-Certified Clinical Staff"
        title="Veterinary Medical Specialists"
        description="Our compassionate team of licensed veterinary surgeons, dermatologists, and emergency critical care physicians."
      />

      <div className="grid-3">
        {vetsData.map((vet) => (
          <div
            key={vet.id}
            className="card-premium hover-lift"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Vet Photo Frame */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                backgroundColor: 'var(--color-surface-warm)',
                overflow: 'hidden'
              }}
            >
              <img
                src={vet.image}
                alt={vet.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                className="hover-scale"
              />

              {/* Experience Tag */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(44, 24, 16, 0.9)',
                  color: '#FFFFFF',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Award size={12} color="#C98A4B" />
                <span>{vet.experience} Experience</span>
              </div>
            </div>

            {/* Profile Content */}
            <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                <Star size={14} fill="#D99B52" color="#D99B52" />
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700 }}>
                  {vet.rating}
                </span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  ({vet.reviewCount} verified reviews)
                </span>
              </div>

              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: '2px' }}>
                {vet.name}
              </h3>
              <div
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-accent-hover)',
                  fontWeight: 700,
                  marginBottom: 'var(--space-3)'
                }}
              >
                {vet.specialization}
              </div>

              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.55,
                  marginBottom: 'var(--space-4)',
                  flex: 1
                }}
              >
                {vet.bio}
              </p>

              {/* Contact / Clinic details */}
              <div
                style={{
                  backgroundColor: 'var(--color-surface-warm)',
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-subtle)',
                  fontSize: 'var(--text-xs)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  marginBottom: 'var(--space-4)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={13} color="var(--color-accent)" />
                  <span style={{ color: 'var(--color-primary)', fontWeight: 500 }}>
                    {vet.clinic}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={13} color="var(--color-wellness)" />
                  <span>{vet.phone}</span>
                </div>
              </div>

              <button
                onClick={() => onSelectVetForAppointment && onSelectVetForAppointment(vet)}
                className="btn btn-primary btn-sm"
                style={{ width: '100%' }}
              >
                <Calendar size={14} />
                <span>Consultation Schedule</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

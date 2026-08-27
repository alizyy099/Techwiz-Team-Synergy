import React, { useState } from 'react';
import {
  PawPrint,
  Heart,
  ShieldCheck,
  Edit3,
  Check,
  Sparkles,
  Calendar,
  Activity,
  FileText
} from 'lucide-react';
import LiveClockDisplay from '../common/LiveClockDisplay';
import LocationDisplay from '../common/LocationDisplay';

/**
 * Pet Owner Experience: Pet Profile Creator / Interactive Pet Passport
 */
export default function PetProfileCard({
  userName,
  petProfile,
  setPetProfile,
  onShowToast
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(petProfile);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPetProfile(formData);
    setIsEditing(false);
    if (onShowToast) {
      onShowToast({
        type: 'success',
        title: 'Pet Profile Updated',
        message: `${formData.name || 'Your pet'}'s health passport has been updated successfully.`
      });
    }
  };

  return (
    <div style={{ marginBottom: 'var(--space-12)' }}>
      {/* Personalized Header Greeting */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
          padding: 'var(--space-6)',
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: 'var(--space-8)'
        }}
      >
        <div>
          <div
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              color: 'var(--color-accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '2px'
            }}
          >
            Pet Guardian Dashboard
          </div>
          <h2 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>
            Welcome, {userName || 'Pet Guardian'} & {petProfile.name || 'Your Pet'}
          </h2>
        </div>

        {/* Real-Time Telemetry Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <LiveClockDisplay showSeconds={false} />
          <LocationDisplay />
        </div>
      </div>

      {/* Main Pet Passport Card or Edit Form */}
      {isEditing ? (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--color-accent-border)',
            padding: 'var(--space-8)',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-6)',
              paddingBottom: 'var(--space-4)',
              borderBottom: '1px solid var(--color-border)'
            }}
          >
            <h3 style={{ margin: 0, fontSize: 'var(--text-xl)' }}>
              Edit Pet Health Passport
            </h3>
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-ghost btn-sm"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-6)'
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '6px' }}>
                  Pet Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Barnaby, Luna, Oliver"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '6px' }}>
                  Species *
                </label>
                <select
                  value={formData.species}
                  onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Rabbit">Rabbit</option>
                  <option value="Bird">Bird</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '6px' }}>
                  Breed
                </label>
                <input
                  type="text"
                  value={formData.breed}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                  placeholder="e.g. Golden Retriever, Tabby"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '6px' }}>
                  Age
                </label>
                <input
                  type="text"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="e.g. 2 Years 4 Mos"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '6px' }}>
                  Weight
                </label>
                <input
                  type="text"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="e.g. 24.5 kg / 54 lbs"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '6px' }}>
                  Microchip ID
                </label>
                <input
                  type="text"
                  value={formData.microchip}
                  onChange={(e) => setFormData({ ...formData, microchip: e.target.value })}
                  placeholder="e.g. 985-1410-0092-814"
                />
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '6px' }}>
                Vaccination Status & Medical Notes
              </label>
              <textarea
                rows={3}
                value={formData.vaccinations}
                onChange={(e) => setFormData({ ...formData, vaccinations: e.target.value })}
                placeholder="e.g. DHPP Booster (Jul 2026), Rabies 3-Yr (Valid till 2028), Bordetella Oral (Current)"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              <Check size={16} />
              <span>Save Pet Passport</span>
            </button>
          </form>
        </div>
      ) : (
        /* Digital Pet Passport Presentation Card */
        <div
          className="card-premium hover-lift"
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, var(--color-bg) 100%)',
            border: '1.5px solid var(--color-border)',
            padding: 'var(--space-8)',
            position: 'relative'
          }}
        >
          {/* Decorative Corner Badge */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span className="badge badge-sage">
              <ShieldCheck size={12} />
              <span>Passport Verified</span>
            </span>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-outline btn-sm"
              style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            >
              <Edit3 size={12} />
              <span>Edit</span>
            </button>
          </div>

          <div
            className="pet-profile-header-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              gap: 'var(--space-6)',
              alignItems: 'center'
            }}
          >
            {/* Pet Avatar with Soft Caramel Ring */}
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '3px solid var(--color-accent)',
                boxShadow: 'var(--shadow-md)',
                backgroundColor: 'var(--color-surface-warm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <img
                src={
                  petProfile.name === 'Barnaby'
                    ? '/images/barnaby.jpeg'
                    : petProfile.species === 'Cat'
                    ? '/images/jasper.jpeg'
                    : petProfile.species === 'Rabbit'
                    ? 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=400&q=80'
                    : '/images/daisy.jpeg'
                }
                alt={petProfile.name || 'Pet Avatar'}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Profile Overview Fields */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '4px'
                }}
              >
                <h3 style={{ margin: 0, fontSize: 'var(--text-3xl)' }}>
                  {petProfile.name || 'Barnaby'}
                </h3>
                <span className="badge badge-caramel">
                  {petProfile.species || 'Dog'}
                </span>
              </div>

              <div
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-4)'
                }}
              >
                <strong>Breed:</strong> {petProfile.breed || 'Golden Retriever Mix'} •{' '}
                <strong>Age:</strong> {petProfile.age || '2.5 Years'} •{' '}
                <strong>Weight:</strong> {petProfile.weight || '26.4 kg'}
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: 'var(--space-3)',
                  backgroundColor: 'var(--color-surface)',
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-subtle)',
                  fontSize: 'var(--text-xs)'
                }}
              >
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>
                    Microchip Tag
                  </span>
                  <strong>{petProfile.microchip || '985-1410-0092-814'}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>
                    Vaccine Status
                  </span>
                  <strong style={{ color: 'var(--color-wellness)' }}>
                    Core Boosters Up-To-Date
                  </strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>
                    Care Record
                  </span>
                  <span>{petProfile.vaccinations || 'DHPP & Rabies Current'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

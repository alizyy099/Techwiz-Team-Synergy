import React, { useState } from 'react';
import { Heart, CheckCircle2, ShieldCheck, User, Mail, Home } from 'lucide-react';
import Modal from '../common/Modal';

/**
 * Adoption Inquiry & Application Modal (Simulated UI-only per SRS)
 */
export default function AdoptionModal({ pet, onClose, onShowToast }) {
  const [adopterName, setAdopterName] = useState('');
  const [email, setEmail] = useState('');
  const [housing, setHousing] = useState('House with Fenced Yard');
  const [experience, setExperience] = useState('Experienced Pet Owner');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!pet) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!adopterName.trim() || !email.trim()) return;

    setIsSubmitted(true);
    if (onShowToast) {
      onShowToast({
        type: 'success',
        title: 'Adoption Inquiry Registered',
        message: `Thank you, ${adopterName}! Your inquiry for ${pet.name} has been simulated successfully.`
      });
    }

    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <Modal
      isOpen={!!pet}
      onClose={onClose}
      title={`Adoption Inquiry: ${pet.name}`}
      maxWidth="620px"
    >
      {isSubmitted ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-8) var(--space-4)' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-wellness-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-wellness)',
              margin: '0 auto var(--space-4) auto'
            }}
          >
            <CheckCircle2 size={36} />
          </div>
          <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: '8px' }}>
            Inquiry Submitted Successfully!
          </h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', maxWidth: '420px', margin: '0 auto' }}>
            Our shelter volunteer team has registered your interest in adopting <strong>{pet.name}</strong>.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {/* Pet Brief Card */}
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              backgroundColor: 'var(--color-surface-warm)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-md)',
              alignItems: 'center'
            }}
          >
            <img
              src={pet.image}
              alt={pet.name}
              style={{
                width: '70px',
                height: '70px',
                borderRadius: 'var(--radius-md)',
                objectFit: 'cover'
              }}
            />
            <div>
              <h4 style={{ margin: '0 0 2px 0', fontSize: 'var(--text-base)' }}>
                {pet.name} ({pet.breed})
              </h4>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                Age: {pet.age} • Location: {pet.location}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-wellness)', fontWeight: 600 }}>
                {pet.healthStatus}
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'var(--space-4)'
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '6px' }}>
                Your Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Maya Jenkins"
                value={adopterName}
                onChange={(e) => setAdopterName(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '6px' }}>
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="maya@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'var(--space-4)'
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '6px' }}>
                Living Accommodation
              </label>
              <select value={housing} onChange={(e) => setHousing(e.target.value)}>
                <option value="House with Fenced Yard">House with Fenced Yard</option>
                <option value="Apartment / Condo">Apartment / Condo</option>
                <option value="Townhouse with Patio">Townhouse with Patio</option>
                <option value="Rural / Farm Property">Rural / Farm Property</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '6px' }}>
                Pet Guardianship Experience
              </label>
              <select value={experience} onChange={(e) => setExperience(e.target.value)}>
                <option value="Experienced Pet Owner">Experienced Pet Owner</option>
                <option value="First-Time Adopter">First-Time Adopter</option>
                <option value="Previous Rescue Foster">Previous Rescue Foster</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '6px' }}>
              Why do you feel {pet.name} is the perfect match for your family?
            </label>
            <textarea
              rows={3}
              placeholder="Tell us about your daily lifestyle, household members, and pet care philosophy..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            <Heart size={16} fill="#FFFFFF" />
            <span>Submit Adoption Application</span>
          </button>
        </form>
      )}
    </Modal>
  );
}

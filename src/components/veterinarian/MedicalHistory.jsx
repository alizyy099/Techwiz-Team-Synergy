import { useState } from 'react';
import { Search, Calendar } from 'lucide-react';
import historyData from '../../data/medicalHistory.json';
import SectionHeading from '../common/SectionHeading';

/**
 * Veterinarian Medical History & Case Studies Component
 */
export default function MedicalHistory() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCases = historyData.filter((item) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      item.petName.toLowerCase().includes(q) ||
      item.species.toLowerCase().includes(q) ||
      item.caseType.toLowerCase().includes(q) ||
      item.diagnosis.toLowerCase().includes(q)
    );
  });

  return (
    <section style={{ marginBottom: 'var(--space-16)' }}>
      <SectionHeading
        tag="Clinical Case Archive"
        title="Patient Medical History & Treatment Records"
        description="Comprehensive case archives illustrating presenting symptoms, differential diagnoses, clinical interventions, and follow-up trajectories."
      />

      {/* Case Search */}
      <div
        style={{
          maxWidth: '480px',
          margin: '0 auto var(--space-8) auto',
          position: 'relative'
        }}
      >
        <input
          type="text"
          placeholder="Search cases by pet name (e.g. Max, Bella), diagnosis, or symptom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ paddingLeft: '40px', backgroundColor: '#FFFFFF' }}
        />
        <Search
          size={18}
          color="var(--color-text-muted)"
          style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
        />
      </div>

      {/* Case Study Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {filteredCases.map((record) => (
          <div
            key={record.id}
            className="card-premium hover-lift"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-6)',
              border: '1px solid var(--color-border)'
            }}
          >
            {/* Header bar */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 'var(--space-2)',
                paddingBottom: 'var(--space-3)',
                borderBottom: '1px solid var(--color-border-subtle)',
                marginBottom: 'var(--space-4)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-caramel" style={{ fontSize: '0.75rem' }}>
                  Patient: {record.petName}
                </span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  {record.species} • {record.age}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 600
                }}
              >
                <Calendar size={13} color="var(--color-accent)" />
                <span>Recorded: {record.date}</span>
              </div>
            </div>

            {/* Case Type & Attending Vet */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <h3 style={{ fontSize: 'var(--text-lg)', margin: '0 0 4px 0' }}>
                {record.caseType}
              </h3>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-wellness)', fontWeight: 600 }}>
                Attending Physician: {record.attendingVet}
              </div>
            </div>

            {/* Clinical Data Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-4)'
              }}
            >
              <div
                style={{
                  backgroundColor: 'var(--color-surface-warm)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-danger)', marginBottom: '4px' }}>
                  Presenting Symptoms
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                  {record.symptoms}
                </p>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-surface-warm)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-wellness)', marginBottom: '4px' }}>
                  Clinical Diagnosis
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                  {record.diagnosis}
                </p>
              </div>
            </div>

            {/* Treatment Protocol */}
            <div
              style={{
                backgroundColor: 'var(--color-accent-soft)',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-accent-border)',
                marginBottom: 'var(--space-3)'
              }}
            >
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '4px' }}>
                Administered Treatment & Prescriptions
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text)', margin: 0, lineHeight: 1.55 }}>
                {record.treatment}
              </p>
            </div>

            {/* Patient Vitals & Followup footer */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-muted)'
              }}
            >
              <div>
                <strong>Recorded Vitals:</strong> Weight: {record.vitals.weight} • Temp: {record.vitals.temperature} • Heart Rate: {record.vitals.heartRate}
              </div>
              <div style={{ color: 'var(--color-accent-hover)', fontWeight: 600 }}>
                Next Follow-Up: {record.followUp}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle, User, Info, MapPin } from 'lucide-react';
import appointmentsData from '../../data/appointments.json';
import SectionHeading from '../common/SectionHeading';
import Modal from '../common/Modal';

/**
 * Appointment Slots Display Component (SRS: Display-only system)
 */
export default function AppointmentSlots({ onShowToast }) {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [inquirySlot, setInquirySlot] = useState(null);

  const filteredSlots = appointmentsData.filter((slot) => {
    if (selectedStatus === 'All') return true;
    return slot.status === selectedStatus;
  });

  return (
    <section style={{ marginBottom: 'var(--space-16)' }}>
      <SectionHeading
        tag="Clinical Schedule"
        title="Consultation & Surgical Time Slots"
        description="Real-time calendar view of reserved surgical blocks and open outpatient wellness checkup slots across exam suites."
      />

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: 'var(--space-8)'
        }}
      >
        {['All', 'Available', 'Booked'].map((status) => {
          const isSelected = selectedStatus === status;
          return (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              style={{
                padding: '8px 20px',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-xs)',
                fontWeight: isSelected ? 700 : 500,
                backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-surface)',
                color: isSelected ? '#FFFFFF' : 'var(--color-text)',
                border: `1px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`
              }}
            >
              {status === 'All' ? 'All Slots' : `${status} Slots`}
            </button>
          );
        })}
      </div>

      {/* Slots Grid */}
      <div className="grid-2">
        {filteredSlots.map((slot) => {
          const isAvailable = slot.status === 'Available';

          return (
            <div
              key={slot.id}
              className="card-premium hover-lift"
              style={{
                backgroundColor: '#FFFFFF',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                borderLeft: isAvailable
                  ? '4px solid var(--color-wellness)'
                  : '4px solid var(--color-accent)'
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
                <span
                  className={isAvailable ? 'badge badge-sage' : 'badge badge-caramel'}
                  style={{ fontSize: '0.65rem' }}
                >
                  {isAvailable ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                  <span>{slot.status}</span>
                </span>

                <div
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-muted)',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Calendar size={13} />
                  <span>{slot.date}</span>
                </div>
              </div>

              <h3 style={{ fontSize: 'var(--text-base)', margin: '0 0 4px 0' }}>
                {slot.type}
              </h3>

              <div
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  marginBottom: 'var(--space-3)'
                }}
              >
                Attending: {slot.vetName} • 📍 {slot.room}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--color-surface-warm)',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-xs)',
                  marginTop: 'auto'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-secondary)' }}>
                  <Clock size={13} color="var(--color-accent)" />
                  <strong>{slot.time}</strong>
                </div>

                {isAvailable ? (
                  <button
                    onClick={() => setInquirySlot(slot)}
                    className="btn btn-outline-accent btn-sm"
                    style={{ padding: '3px 8px', fontSize: '0.7rem' }}
                  >
                    Request Slot
                  </button>
                ) : (
                  <span style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                    Patient: {slot.patient}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Inquiry Modal */}
      <Modal
        isOpen={!!inquirySlot}
        onClose={() => setInquirySlot(null)}
        title="Consultation Request Preview"
        maxWidth="500px"
      >
        {inquirySlot && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div
              style={{
                backgroundColor: 'var(--color-surface-warm)',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-sm)'
              }}
            >
              <div style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '4px' }}>
                {inquirySlot.type}
              </div>
              <div>Physician: {inquirySlot.vetName}</div>
              <div>Date & Time: {inquirySlot.date} at {inquirySlot.time}</div>
              <div>Location: {inquirySlot.room}</div>
            </div>

            <div
              style={{
                backgroundColor: 'var(--color-accent-soft)',
                border: '1px solid var(--color-accent-border)',
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-primary)'
              }}
            >
              <strong>Display-Only Schedule:</strong> As required by the academic specification,
              appointments are read-only and demonstrate real-time slot availability without database writes.
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                onClick={() => setInquirySlot(null)}
                className="btn btn-primary"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

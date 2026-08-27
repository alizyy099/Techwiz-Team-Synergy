import { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  PlusCircle,
  Sparkles,
  ShieldCheck,
  Scissors,
  Stethoscope,
  Utensils
} from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

/**
 * Vertical Activity & Care Timeline
 */
export default function CareTimeline({ petName = 'Barnaby', onShowToast }) {
  const [timelineItems, setTimelineItems] = useState([
    {
      id: 'tl-1',
      title: 'Annual DHPP & Rabies Booster Vaccination',
      category: 'Vaccination',
      date: 'Aug 14, 2026',
      time: '10:00 AM',
      status: 'Completed',
      vetClinic: 'FurEver Central Vet (Dr. Vance)',
      icon: ShieldCheck,
      notes: 'Administered 3-year rabies booster. No adverse swelling or lethargy observed.'
    },
    {
      id: 'tl-2',
      title: 'Full Coat De-Shedding & Paw Balming Spa',
      category: 'Grooming',
      date: 'Aug 22, 2026',
      time: '02:30 PM',
      status: 'Completed',
      vetClinic: 'Paws & Bubbles Luxury Grooming',
      icon: Scissors,
      notes: 'Line brushed undercoat, trimmed nails safely, applied natural paw wax.'
    },
    {
      id: 'tl-3',
      title: 'Monthly Heartworm & Tick Preventative Chew',
      category: 'Preventative',
      date: 'Aug 28, 2026',
      time: '08:00 AM (With Breakfast)',
      status: 'Upcoming',
      vetClinic: 'Home Care Reminder',
      icon: Clock,
      notes: 'Give 1 chewable tablet with morning kibble.'
    },
    {
      id: 'tl-4',
      title: 'Dental Scaling & Polishing Consultation',
      category: 'Vet Checkup',
      date: 'Sep 15, 2026',
      time: '11:15 AM',
      status: 'Scheduled',
      vetClinic: 'FurEver Central Vet (Dr. Vance)',
      icon: Stethoscope,
      notes: 'Routine evaluation of canine molars and periodontal health.'
    }
  ]);

  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDate, setNewItemDate] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Vet Checkup');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;

    const newItem = {
      id: `tl-${Date.now()}`,
      title: newItemTitle,
      category: newItemCategory,
      date: newItemDate || 'Upcoming',
      time: '09:00 AM',
      status: 'Scheduled',
      vetClinic: 'Custom Care Reminder',
      icon: newItemCategory === 'Grooming' ? Scissors : newItemCategory === 'Vaccination' ? ShieldCheck : Stethoscope,
      notes: 'User scheduled milestone.'
    };

    setTimelineItems([newItem, ...timelineItems]);
    setNewItemTitle('');
    setNewItemDate('');
    setShowAddForm(false);

    if (onShowToast) {
      onShowToast({
        type: 'success',
        title: 'Milestone Added',
        message: `New milestone "${newItemTitle}" added to ${petName}'s timeline.`
      });
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="badge badge-sage" style={{ fontSize: '0.65rem' }}>
            <CheckCircle2 size={12} />
            <span>Completed</span>
          </span>
        );
      case 'Scheduled':
      case 'Upcoming':
        return (
          <span className="badge badge-caramel" style={{ fontSize: '0.65rem' }}>
            <Clock size={12} />
            <span>{status}</span>
          </span>
        );
      default:
        return (
          <span className="badge badge-terracotta" style={{ fontSize: '0.65rem' }}>
            <AlertCircle size={12} />
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <section style={{ marginBottom: 'var(--space-16)' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-8)'
        }}
      >
        <SectionHeading
          tag="Healthcare Log"
          title={`${petName}'s Health & Care Timeline`}
          description="Chronological history of vaccinations, vet consultations, grooming schedules, and routine preventive care."
          alignment="left"
        />

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn btn-outline-accent btn-sm"
        >
          <PlusCircle size={16} />
          <span>{showAddForm ? 'Close Form' : 'Log New Milestone'}</span>
        </button>
      </div>

      {/* Add Milestone Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddMilestone}
          style={{
            backgroundColor: '#FFFFFF',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--color-accent-border)',
            marginBottom: 'var(--space-8)',
            boxShadow: 'var(--shadow-sm)',
            animation: 'fadeInUp 200ms ease-out'
          }}
        >
          <h4 style={{ margin: '0 0 var(--space-4) 0', fontSize: 'var(--text-base)' }}>
            Add Custom Healthcare Milestone
          </h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-4)'
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '4px' }}>
                Milestone Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ear Cytology Check"
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '4px' }}>
                Category
              </label>
              <select
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value)}
              >
                <option value="Vet Checkup">Vet Checkup</option>
                <option value="Vaccination">Vaccination</option>
                <option value="Grooming">Grooming</option>
                <option value="Preventative">Preventative Chew</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '4px' }}>
                Target Date
              </label>
              <input
                type="date"
                value={newItemDate}
                onChange={(e) => setNewItemDate(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-sm">
            Save Milestone
          </button>
        </form>
      )}

      {/* Vertical Timeline Track */}
      <div
        style={{
          position: 'relative',
          paddingLeft: 'var(--space-4)',
          maxWidth: '820px',
          margin: '0 auto'
        }}
      >
        {/* Continuous Vertical Line */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            bottom: '16px',
            left: '26px',
            width: '2px',
            backgroundColor: 'var(--color-border)',
            zIndex: 0
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {timelineItems.map((item, idx) => {
            const IconComp = item.icon || Stethoscope;
            const isCompleted = item.status === 'Completed';

            return (
              <div
                key={item.id}
                className="timeline-item hover-lift"
                style={{
                  position: 'relative',
                  paddingLeft: '64px',
                  zIndex: 1
                }}
              >
                {/* Timeline Node Marker */}
                <div
                  style={{
                    position: 'absolute',
                    left: '8px',
                    top: '14px',
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: isCompleted ? 'var(--color-wellness)' : 'var(--color-accent)',
                    border: '3px solid #FAF7F2',
                    boxShadow: '0 2px 8px rgba(44, 24, 16, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF'
                  }}
                >
                  <IconComp size={18} />
                </div>

                {/* Timeline Card */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: 'var(--space-6)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                      marginBottom: '6px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="badge badge-cocoa" style={{ fontSize: '0.65rem' }}>
                        {item.category}
                      </span>
                      {getStatusBadge(item.status)}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-muted)',
                        fontWeight: 600
                      }}
                    >
                      <Calendar size={13} />
                      <span>{item.date} • {item.time}</span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: 'var(--text-base)', margin: '4px 0 6px 0' }}>
                    {item.title}
                  </h3>

                  <div
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-accent-hover)',
                      fontWeight: 600,
                      marginBottom: '8px'
                    }}
                  >
                    📍 {item.vetClinic}
                  </div>

                  <p
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.55,
                      margin: 0
                    }}
                  >
                    {item.notes}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

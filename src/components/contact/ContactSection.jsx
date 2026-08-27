import { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

/**
 * Contact Us Section with Responsive Google Maps Embed & Interactive Form
 */
export default function ContactSection({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiries',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setIsSubmitted(true);
    if (onShowToast) {
      onShowToast({
        type: 'success',
        title: 'Message Received',
        message: `Thank you ${formData.name}! Your message has been simulated successfully.`
      });
    }

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiries',
        message: ''
      });
    }, 3000);
  };

  return (
    <section className="section-padding" id="contact-section">
      <div className="container">
        <SectionHeading
          tag="Reach Out Anytime"
          title="Connect with the FurEver Care Sanctuary"
          description="Have questions about shelter adoptions, clinical nutrition, or volunteer foster opportunities? Our team is always here for you."
        />

        <div
          className="grid-2"
          style={{
            gap: 'var(--space-12)',
            alignItems: 'start',
            marginBottom: 'var(--space-12)'
          }}
        >
          {/* Left Column: Contact Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div
              className="card-warm"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-6)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px'
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-accent-soft)',
                  color: 'var(--color-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <MapPin size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: 'var(--text-base)', margin: '0 0 2px 0' }}>
                  Headquarters & Central Hospital
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                  742 Evergreen Terrace, Suite 100, Seattle, WA 98101
                </p>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent-hover)', fontWeight: 600, marginTop: '4px' }}>
                  Open 24 Hours for Urgent Inquiries
                </div>
              </div>
            </div>

            <div
              className="card-warm"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-6)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px'
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-wellness-soft)',
                  color: 'var(--color-wellness)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Phone size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: 'var(--text-base)', margin: '0 0 2px 0' }}>
                  Direct Phone Lines
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                  General Support: (800) 555-CARE (2273)
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                  Adoption Desk: (800) 555-PAWS (7297)
                </p>
              </div>
            </div>

            <div
              className="card-warm"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-6)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px'
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-info-soft)',
                  color: 'var(--color-info)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Mail size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: 'var(--text-base)', margin: '0 0 2px 0' }}>
                  Electronic Inquiries
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                  care@furevercare.org • adoptions@furevercare.org
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div
            className="card-premium"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-8)',
              border: '1px solid var(--color-border)'
            }}
          >
            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
              Send Us a Message
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
              Our support coordinators respond to all guardian and partner messages within one business day.
            </p>

            {isSubmitted ? (
              <div
                style={{
                  backgroundColor: 'var(--color-wellness-soft)',
                  border: '1px solid rgba(78, 110, 88, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-6)',
                  textAlign: 'center'
                }}
              >
                <CheckCircle2 size={36} color="var(--color-wellness)" style={{ margin: '0 auto 8px auto' }} />
                <h4 style={{ margin: '0 0 4px 0', color: 'var(--color-wellness-dark)' }}>
                  Message Sent (Simulated)
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                  Thank you for reaching out to FurEver Care! We have simulated your message delivery without external server storage.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '4px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '4px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '4px' }}>
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="General Inquiries">General Pet Care Inquiries</option>
                    <option value="Shelter Adoption">Adoption & Foster Inquiry</option>
                    <option value="Veterinary Consultation">Veterinary Health Support</option>
                    <option value="Community Drives">Community Events & Volunteering</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '4px' }}>
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we assist you and your companion?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <Send size={15} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Responsive Google Maps Embed */}
        <div
          style={{
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            border: '2px solid var(--color-border)',
            boxShadow: 'var(--shadow-md)',
            backgroundColor: 'var(--color-surface-warm)'
          }}
        >
          <div
            style={{
              padding: 'var(--space-3) var(--space-6)',
              backgroundColor: 'var(--color-surface)',
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)', fontWeight: 600 }}>
              <MapPin size={14} color="var(--color-accent)" />
              <span>FurEver Care Sanctuary & Central Veterinary Campus</span>
            </div>
            <span className="badge badge-sage" style={{ fontSize: '0.625rem' }}>
              Seattle, WA
            </span>
          </div>

          <div style={{ position: 'relative', height: '360px', width: '100%' }}>
            <iframe
              title="FurEver Care Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d86064.08868731776!2d-122.4194155!3d47.6131746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906ab3f905c4b1%3A0x96bf575ff75ab1aa!2sSeattle%2C%20WA!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

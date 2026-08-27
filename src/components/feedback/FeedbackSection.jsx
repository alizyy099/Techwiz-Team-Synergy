import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle2, Sparkles, Heart } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

/**
 * Community Feedback Center Component (UI-only simulation with client validation)
 */
export default function FeedbackSection({ onShowToast }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [testimonials, setTestimonials] = useState([
    {
      id: 'fb-1',
      name: 'Claire Henderson',
      role: 'Pet Parent to Barnaby',
      rating: 5,
      date: 'Aug 21, 2026',
      comment: 'The feeding portion calculator and the live care timeline completely revolutionized how I manage my retriever’s daily nutritional routine!'
    },
    {
      id: 'fb-2',
      name: 'Dr. Liam Vance',
      role: 'Visiting Veterinarian',
      rating: 5,
      date: 'Aug 18, 2026',
      comment: 'An exceptionally clean, thoughtful veterinary UI. Having clinical case studies and appointment schedules organized like this is brilliant.'
    },
    {
      id: 'fb-3',
      name: 'Sophia Patel',
      role: 'Foster Volunteer',
      rating: 5,
      date: 'Aug 12, 2026',
      comment: 'The adoption portal makes it so simple for our shelter foster families to showcase bonded pets and coordinate safe adoption fairs.'
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !feedback.trim()) return;

    const newFeedbackItem = {
      id: `fb-${Date.now()}`,
      name,
      role: 'Verified Pet Guardian',
      rating,
      date: 'Just Now',
      comment: feedback
    };

    setTestimonials([newFeedbackItem, ...testimonials]);
    setSubmitted(true);

    if (onShowToast) {
      onShowToast({
        type: 'success',
        title: 'Feedback Appreciated',
        message: `Thank you, ${name}! Your feedback has been recorded in the local session.`
      });
    }

    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setFeedback('');
      setRating(5);
    }, 3000);
  };

  return (
    <section className="section-padding" id="feedback-section">
      <div className="container">
        <SectionHeading
          tag="Voice of Our Community"
          title="Share Your Experience & Feedback"
          description="Your thoughts help us refine clinical tools, elevate shelter adoption experiences, and design a more compassionate world for pets."
        />

        <div
          className="grid-2"
          style={{
            gap: 'var(--space-12)',
            alignItems: 'start'
          }}
        >
          {/* Feedback Form Card */}
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
              Rate & Review FurEver Care
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
              We value honest reviews from pet owners, veterinary physicians, and shelter volunteers.
            </p>

            {submitted ? (
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
                  Thank You for Your Feedback!
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                  Your submission has been temporarily saved to this active demo session per SRS guidelines.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {/* Interactive Star Rating Selector */}
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '6px' }}>
                    Overall Rating *
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '2px',
                          color: (hoverRating || rating) >= star ? '#D99B52' : '#D1C2AF',
                          transition: 'transform var(--transition-fast)'
                        }}
                        className="hover-scale"
                        aria-label={`Rate ${star} out of 5 stars`}
                      >
                        <Star
                          size={28}
                          fill={(hoverRating || rating) >= star ? '#D99B52' : 'none'}
                        />
                      </button>
                    ))}
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-accent-hover)', marginLeft: '8px' }}>
                      {rating} of 5 Stars
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 'var(--space-4)'
                  }}
                >
                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '4px' }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jordan Miller"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '4px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jordan@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '4px' }}>
                    Your Experience & Comments *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you loved about FurEver Care or how we can improve..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <MessageSquare size={16} />
                  <span>Submit Feedback</span>
                </button>
              </form>
            )}
          </div>

          {/* Testimonials Stream */}
          <div>
            <div style={{ marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: 'var(--text-xl)', margin: 0 }}>
                Recent Community Reviews
              </h3>
              <span className="badge badge-caramel" style={{ fontSize: '0.65rem' }}>
                Verified Guardians
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="card-warm hover-lift"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-4) var(--space-6)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#D99B52' }}>
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={13} fill="#D99B52" />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>
                      {t.date}
                    </span>
                  </div>

                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.55, margin: '6px 0' }}>
                    "{t.comment}"
                  </p>

                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-primary)' }}>
                    {t.name}{' '}
                    <span style={{ fontWeight: 400, color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>
                      • {t.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

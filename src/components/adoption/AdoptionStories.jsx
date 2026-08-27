import { Quote } from 'lucide-react';
import storiesData from '../../data/adoptionStories.json';
import SectionHeading from '../common/SectionHeading';

/**
 * Heartwarming Adoption Success Stories Component
 */
export default function AdoptionStories() {
  return (
    <section style={{ marginBottom: 'var(--space-16)' }}>
      <SectionHeading
        tag="Forever Homes Transformed"
        title="Heartwarming Adoption Success Stories"
        description="Every rescue pet carries a story of resilience. Discover how second chances blossom into lifelong love and joyful companionship."
      />

      <div className="grid-3">
        {storiesData.map((story) => (
          <div
            key={story.id}
            className="card-premium hover-lift"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Split Before / After Image Composition */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                position: 'relative',
                aspectRatio: '16/9',
                backgroundColor: 'var(--color-surface-warm)'
              }}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={story.imageBefore}
                  alt={`${story.petName} Rescue Story`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '6px',
                    left: '6px',
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    color: '#FFFFFF',
                    fontSize: '0.625rem',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-xs)',
                    fontWeight: 700
                  }}
                >
                  Day 1 Rescue
                </span>
              </div>

              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={story.imageAfter}
                  alt={`${story.petName} in Forever Home`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '6px',
                    right: '6px',
                    backgroundColor: 'var(--color-accent)',
                    color: '#FFFFFF',
                    fontSize: '0.625rem',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-xs)',
                    fontWeight: 700
                  }}
                >
                  Forever Home
                </span>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <h3 style={{ fontSize: 'var(--text-lg)', margin: 0 }}>
                  {story.petName}
                </h3>
                <span className="badge badge-caramel" style={{ fontSize: '0.625rem' }}>
                  {story.adoptionDate}
                </span>
              </div>

              <div
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-accent-hover)',
                  fontWeight: 600,
                  marginBottom: 'var(--space-3)'
                }}
              >
                Adopted by {story.adopterName} • {story.location}
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
                {story.afterStory}
              </p>

              {/* Emotional Quote Bubble */}
              <div
                style={{
                  marginTop: 'auto',
                  backgroundColor: 'var(--color-surface-warm)',
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  borderLeft: '3px solid var(--color-accent)',
                  fontStyle: 'italic',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-primary)',
                  position: 'relative'
                }}
              >
                "{story.quote}"
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

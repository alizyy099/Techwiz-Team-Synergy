import { useState } from 'react';
import { Play, Clock, CheckCircle2 } from 'lucide-react';
import groomingData from '../../data/groomingVideos.json';
import SectionHeading from '../common/SectionHeading';
import Modal from '../common/Modal';

/**
 * Grooming Videos Masterclass Component
 */
export default function GroomingVideos() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section style={{ marginBottom: 'var(--space-16)' }}>
      <SectionHeading
        tag="Grooming & Hygiene Masterclass"
        title="Professional Home Grooming Tutorials"
        description="Step-by-step video masterclasses led by certified pet stylists to maintain healthy coats, tidy paws, and stress-free spa days."
      />

      <div className="grid-2">
        {groomingData.map((vid) => (
          <div
            key={vid.id}
            className="card-premium hover-lift"
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden'
            }}
          >
            {/* Video Thumbnail with Play Button Overlay */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '16/9',
                backgroundColor: 'var(--color-surface-warm)',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedVideo(vid)}
            >
              <img
                src={vid.thumbnail}
                alt={vid.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform var(--transition-slow)'
                }}
                className="hover-scale"
              />

              {/* Badges Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  display: 'flex',
                  gap: '6px'
                }}
              >
                <span className="badge badge-caramel" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                  {vid.category}
                </span>
                <span className="badge badge-sage" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                  {vid.difficulty}
                </span>
              </div>

              {/* Play Button Icon */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(44, 24, 16, 0.85)',
                  border: '2px solid rgba(255, 255, 255, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                  transition: 'transform var(--transition-fast)'
                }}
              >
                <Play size={22} fill="#FFFFFF" style={{ marginLeft: '3px' }} />
              </div>

              {/* Duration Tag */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                  color: '#FFFFFF',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-xs)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Clock size={12} />
                <span>{vid.duration}</span>
              </div>
            </div>

            {/* Video Content & Steps */}
            <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                {vid.title}
              </h3>
              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-4)',
                  lineHeight: 1.55
                }}
              >
                {vid.description}
              </p>

              {/* Step Highlights */}
              <div
                style={{
                  marginTop: 'auto',
                  padding: 'var(--space-3) var(--space-4)',
                  backgroundColor: 'var(--color-surface-warm)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-subtle)',
                  fontSize: 'var(--text-xs)'
                }}
              >
                <strong style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '4px' }}>
                  Key Stylist Steps:
                </strong>
                <ol style={{ paddingLeft: '16px', margin: 0, color: 'var(--color-text-secondary)' }}>
                  {vid.steps.slice(0, 2).map((s, idx) => (
                    <li key={idx} style={{ marginBottom: '2px' }}>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>

              <button
                onClick={() => setSelectedVideo(vid)}
                className="btn btn-outline btn-sm"
                style={{ marginTop: 'var(--space-4)', width: '100%' }}
              >
                <Play size={14} />
                <span>Watch Full Masterclass</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Player */}
      <Modal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        title={selectedVideo?.title || 'Grooming Masterclass'}
        maxWidth="760px"
      >
        {selectedVideo && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div
              style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                overflow: 'hidden',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#000'
              }}
            >
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <span className="badge badge-caramel">{selectedVideo.category}</span>
                <span className="badge badge-sage">Difficulty: {selectedVideo.difficulty}</span>
                <span className="badge badge-cocoa">Runtime: {selectedVideo.duration}</span>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                {selectedVideo.description}
              </p>

              <h4 style={{ fontSize: 'var(--text-base)', marginBottom: '8px' }}>
                Step-by-Step Grooming Protocol:
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedVideo.steps.map((st, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      fontSize: 'var(--text-xs)',
                      backgroundColor: 'var(--color-surface-warm)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    <CheckCircle2 size={16} color="var(--color-wellness)" style={{ marginTop: '1px', flexShrink: 0 }} />
                    <span><strong>Step {i + 1}:</strong> {st}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

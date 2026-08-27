import React, { useState } from 'react';
import { Play, Sparkles, Heart, ShieldCheck, Award, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import Modal from '../common/Modal';

/**
 * Hero Section — Warm editorial visual system inspired by Figma reference
 */
export default function Hero({ onGetStarted, onWatchStory }) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = React.useRef(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        paddingTop: 'var(--space-12)',
        paddingBottom: 'var(--space-16)',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Gradient Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(108, 92, 231, 0.18) 0%, rgba(251, 248, 255, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-8%',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 107, 74, 0.14) 0%, rgba(251, 248, 255, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container">
        <div
          className="hero-container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.95fr',
            gap: 'var(--space-12)',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1
          }}
        >
          {/* Left Column: Editorial Headline & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* Top Brand Pill */}
            <div style={{ display: 'inline-flex' }}>
              <span className="badge badge-caramel">
                <Sparkles size={13} />
                <span>Welcome to FurEver Care</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: 'var(--text-hero)',
                color: 'var(--color-primary)',
                lineHeight: 1.12,
                fontWeight: 700,
                letterSpacing: '-0.025em'
              }}
            >
              They Deserve{' '}
              <span
                className="text-gradient"
                style={{
                  fontStyle: 'italic'
                }}
              >
                Forever Love
              </span>
            </h1>

            {/* Supporting Copy */}
            <p
              style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--color-text-secondary)',
                maxWidth: '540px',
                lineHeight: 1.65
              }}
            >
              A holistic pet wellness ecosystem connecting compassionate pet parents,
              licensed veterinary physicians, and ethical shelter adoption networks under one
              thoughtfully crafted experience.
            </p>

            {/* CTAs */}
            <div
              className="hero-actions"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
                flexWrap: 'wrap'
              }}
            >
              <button onClick={onGetStarted} className="btn btn-primary btn-lg">
                <span>Get Started</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => setVideoModalOpen(true)}
                className="btn btn-outline-accent btn-lg"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <Play size={16} fill="var(--color-accent)" />
                <span>Watch Story</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div
              className="hero-badges-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-6)',
                paddingTop: 'var(--space-4)',
                borderTop: '1px solid var(--color-border-subtle)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={20} color="var(--color-wellness)" />
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-primary)' }}>
                  Certified Vet Network
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Heart size={20} color="var(--color-accent)" />
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-primary)' }}>
                  100% Ethical Adoption
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={20} color="var(--color-info)" />
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-primary)' }}>
                  Holistic Nutrition Plans
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Organic Composition with Dog + Cat and Floating Badge */}
          <div className="hero-image-wrapper" style={{ position: 'relative' }}>
            {/* Gradient Backdrop Shape */}
            <div
              style={{
                position: 'absolute',
                top: '-15px',
                right: '-15px',
                width: '100%',
                height: '100%',
                background: 'var(--gradient-brand-soft)',
                borderRadius: '42px 28px 72px 32px',
                zIndex: 0,
                transform: 'rotate(-2deg)'
              }}
            />

            {/* Live Autoplaying Video Frame */}
            <div
              style={{
                position: 'relative',
                borderRadius: '38px 24px 68px 28px',
                overflow: 'hidden',
                border: '4px solid #FFFFFF',
                boxShadow: 'var(--shadow-xl)',
                zIndex: 1,
                aspectRatio: '4/3.7',
                backgroundColor: 'var(--color-surface-subtle)'
              }}
            >
              <video
                ref={videoRef}
                className="hover-scale"
                src="/videos/barnaby.mp4"
                poster="/images/hero-img.png"
                autoPlay
                muted={muted}
                loop
                playsInline
                aria-label="Barnaby the golden retriever playing happily"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.8s ease'
                }}
              />

              {/* Live pill */}
              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 11px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(20, 11, 46, 0.55)',
                  backdropFilter: 'blur(6px)',
                  color: '#FFFFFF',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}
              >
                <span className="animate-pulse" style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#FF6B4A', display: 'inline-block' }} />
                Real Moments
              </div>

              {/* Sound toggle */}
              <button
                onClick={toggleSound}
                aria-label={muted ? 'Unmute video' : 'Mute video'}
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(20, 11, 46, 0.55)',
                  backdropFilter: 'blur(6px)',
                  color: '#FFFFFF'
                }}
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>

            {/* Floating Editorial Badge: "We care like family" */}
            <div
              className="animate-float"
              style={{
                position: 'absolute',
                bottom: '-22px',
                left: '-20px',
                backgroundColor: 'rgba(255, 255, 255, 0.96)',
                backdropFilter: 'blur(8px)',
                padding: '14px 20px',
                borderRadius: 'var(--radius-lg)',
                border: '1.5px solid var(--color-border)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-accent-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-accent)',
                  flexShrink: 0
                }}
              >
                <Heart size={22} fill="var(--color-accent)" />
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 700 }}>
                  Family Promise
                </div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-primary)' }}>
                  We care like family
                </div>
              </div>
            </div>

            {/* Secondary Floating Mini Badge */}
            <div
              style={{
                position: 'absolute',
                top: '-16px',
                right: '24px',
                backgroundColor: 'var(--color-primary)',
                color: '#FFFFFF',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                boxShadow: 'var(--shadow-md)',
                zIndex: 2,
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Sparkles size={14} color="var(--color-accent-border)" />
              <span>Premium Pet Care</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Story Modal */}
      <Modal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        title="FurEver Care — Our Story & Heart"
        maxWidth="740px"
      >
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
              src="https://www.youtube.com/embed/bvmvG7KNH9c?si=sIifTWAFMO9gTW-2"
              title="FurEver Care Story Video"
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
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
            Every companion animal deserves lifelong compassion, dignified healthcare, and wholesome nutrition.
            Discover how our network of volunteer veterinarians and shelter alliances transforms thousands of pet lives every year.
          </p>
        </div>
      </Modal>
    </section>
  );
}

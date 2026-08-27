import { useState } from 'react';
import { Award, Compass, Heart, Volume2, Sparkles } from 'lucide-react';
import trainingData from '../../data/trainingTips.json';
import SectionHeading from '../common/SectionHeading';

/**
 * Positive Reinforcement Training Masterclass Component
 */
export default function TrainingTips() {
  const [activeSound, setActiveSound] = useState(false);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Award': return Award;
      case 'Compass': return Compass;
      case 'Heart': return Heart;
      default: return Sparkles;
    }
  };

  // Simulated clicker sound marker
  const playClickerSound = () => {
    setActiveSound(true);
    // Simple Web Audio API synthetic click sound for instant tactile feedback
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (err) {
      console.log('Audio context not supported or user blocked audio.');
    }

    setTimeout(() => setActiveSound(false), 400);
  };

  return (
    <section style={{ marginBottom: 'var(--space-16)' }}>
      <SectionHeading
        tag="Behavioral Harmony & Training"
        title="Positive Reinforcement Masterclass"
        description="Build unbreakable trust, polite leash manners, and emotional confidence through humane, science-backed behavioral training."
      />

      {/* Interactive Clicker Simulator Tool */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-warm)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          padding: 'var(--space-6)',
          marginBottom: 'var(--space-8)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-4)'
        }}
      >
        <div style={{ maxWidth: '480px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Volume2 size={18} color="var(--color-accent)" />
            <h4 style={{ margin: 0, fontSize: 'var(--text-base)' }}>
              Interactive Clicker Marker Tool
            </h4>
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
            Test the acoustic clicker marker used in positive association training.
          </p>
        </div>

        <button
          onClick={playClickerSound}
          className="btn btn-accent btn-sm"
          style={{
            transform: activeSound ? 'scale(0.95)' : 'scale(1)',
            transition: 'transform 100ms ease'
          }}
        >
          <span>{activeSound ? 'CLICK! (Good Job)' : 'Press Clicker Marker'}</span>
        </button>
      </div>

      <div className="grid-3">
        {trainingData.map((item) => {
          const IconComp = getIcon(item.icon);

          return (
            <div
              key={item.id}
              className="card-premium hover-lift"
              style={{
                backgroundColor: '#FFFFFF',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-accent-soft)',
                  color: 'var(--color-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--space-4)'
                }}
              >
                <IconComp size={22} />
              </div>

              <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                <span className="badge badge-caramel" style={{ fontSize: '0.65rem' }}>
                  {item.category}
                </span>
                <span className="badge badge-cocoa" style={{ fontSize: '0.65rem' }}>
                  {item.difficulty}
                </span>
              </div>

              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-4)',
                  lineHeight: 1.55
                }}
              >
                {item.summary}
              </p>

              <div
                style={{
                  marginTop: 'auto',
                  backgroundColor: 'var(--color-surface-warm)',
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-subtle)'
                }}
              >
                <strong style={{ color: 'var(--color-primary)', display: 'block', fontSize: 'var(--text-xs)', marginBottom: '4px' }}>
                  Core Steps:
                </strong>
                <ol style={{ paddingLeft: '14px', margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                  {item.coreSteps.map((step, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

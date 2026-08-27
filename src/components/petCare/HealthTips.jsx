import { ShieldCheck, Activity, AlertCircle, Sun, CheckCircle2, HeartPulse } from 'lucide-react';
import healthTipsData from '../../data/healthTips.json';
import SectionHeading from '../common/SectionHeading';

/**
 * Health & Wellness Vault Component
 */
export default function HealthTips() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldCheck': return ShieldCheck;
      case 'Activity': return Activity;
      case 'AlertCircle': return AlertCircle;
      case 'Sun': return Sun;
      default: return HeartPulse;
    }
  };

  return (
    <section style={{ marginBottom: 'var(--space-16)' }}>
      <SectionHeading
        tag="Preventive Medicine & Vitals"
        title="Essential Pet Health & Wellness Guides"
        description="Crucial veterinary tips on dental hygiene, body condition scoring, vital signs monitoring, and seasonal safety."
      />

      <div className="grid-2">
        {healthTipsData.map((tip) => {
          const IconComp = getIcon(tip.icon);

          return (
            <div
              key={tip.id}
              className="card-premium hover-lift"
              style={{
                backgroundColor: '#FFFFFF',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: 'var(--space-4)'
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
                  <IconComp size={22} />
                </div>
                <div>
                  <span className="badge badge-sage" style={{ fontSize: '0.65rem', marginBottom: '2px' }}>
                    {tip.badge}
                  </span>
                  <h3 style={{ fontSize: 'var(--text-lg)', margin: 0 }}>
                    {tip.title}
                  </h3>
                </div>
              </div>

              {/* Summary */}
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-4)',
                  lineHeight: 1.55
                }}
              >
                {tip.summary}
              </p>

              {/* Bullet checklist */}
              <div
                style={{
                  marginTop: 'auto',
                  backgroundColor: 'var(--color-surface-warm)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-subtle)'
                }}
              >
                <div
                  style={{
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    marginBottom: '6px'
                  }}
                >
                  Clinical Recommendations:
                </div>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  {tip.bullets.map((b, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '6px',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-secondary)'
                      }}
                    >
                      <CheckCircle2
                        size={14}
                        color="var(--color-wellness)"
                        style={{ marginTop: '2px', flexShrink: 0 }}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

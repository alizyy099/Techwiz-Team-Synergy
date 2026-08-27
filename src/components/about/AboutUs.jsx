import React from 'react';
import { Heart, Award, ShieldCheck, Sparkles, Users, Compass, Eye } from 'lucide-react';
import teamData from '../../data/team.json';
import SectionHeading from '../common/SectionHeading';

/**
 * About Us Component: Story, Philosophy, Values, and Leadership Team
 */
export default function AboutUs() {
  const values = [
    {
      title: 'Empathy Without Exception',
      desc: 'We believe every animal has intrinsic worth, emotional complexity, and the right to gentle, dignified care.',
      icon: Heart
    },
    {
      title: 'Evidence-Based Medicine',
      desc: 'Our wellness guides and clinical standards rest on rigorous veterinary science, not fleeting pet-food fads.',
      icon: ShieldCheck
    },
    {
      title: 'Shelter Alliance Commitment',
      desc: 'We actively partner with non-profit rescue shelters to facilitate transparent, zero-barrier adoption matching.',
      icon: Users
    },
    {
      title: 'Lifelong Family Companionship',
      desc: 'From puppy socialization to graceful geriatric palliative support, we stand beside pet guardians at every step.',
      icon: Compass
    }
  ];

  return (
    <section className="section-padding" id="about-us">
      <div className="container">
        <SectionHeading
          tag="Our Heart & Mission"
          title="Rooted in Unconditional Compassion"
          description="FurEver Care was founded with a singular conviction: pets are not merely domestic animals; they are family members who deserve forever love."
        />

        {/* Narrative Grid */}
        <div
          className="grid-2"
          style={{
            alignItems: 'center',
            marginBottom: 'var(--space-16)',
            gap: 'var(--space-12)'
          }}
        >
          <div>
            <span className="badge badge-caramel" style={{ marginBottom: 'var(--space-3)' }}>
              The FurEver Care Philosophy
            </span>
            <h3 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>
              Transforming Pet Healthcare into a Warm, Accessible Sanctuary
            </h3>
            <p style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-4)', lineHeight: 1.7 }}>
              Too often, modern pet care is fragmented between disconnected clinics, bewildering nutritional claims,
              and overburdened rescue shelters. FurEver Care unifies these worlds into one harmonious digital ecosystem.
            </p>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
              Whether you are welcoming a rescue kitten into your first apartment, managing chronic arthritis in a beloved senior retriever,
              or searching for 24/7 toxicological advice in the dead of night, our platform provides calm, reliable, compassionate guidance.
            </p>
          </div>

          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                left: '-12px',
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--color-surface-subtle)',
                borderRadius: 'var(--radius-xl)',
                transform: 'rotate(2deg)',
                zIndex: 0
              }}
            />
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '3px solid #FFFFFF',
                boxShadow: 'var(--shadow-xl)',
                zIndex: 1
              }}
            >
              <img
                src="/images/about-img.jpe"
                alt="Two dogs playing happily in an open field"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        {/* Core Values Grid */}
        <div style={{ marginBottom: 'var(--space-16)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span className="badge badge-sage" style={{ marginBottom: '4px' }}>
              Guiding Principles
            </span>
            <h3 style={{ fontSize: 'var(--text-2xl)' }}>Our Core Values</h3>
          </div>

          <div className="grid-4">
            {values.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div
                  key={idx}
                  className="card-warm hover-lift"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-6)',
                    border: '1px solid var(--color-border)'
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
                      marginBottom: 'var(--space-4)'
                    }}
                  >
                    <IconComp size={22} />
                  </div>
                  <h4 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>
                    {val.title}
                  </h4>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leadership & Clinical Team */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span className="badge badge-caramel" style={{ marginBottom: '4px' }}>
              Meet The Guardians
            </span>
            <h3 style={{ fontSize: 'var(--text-2xl)' }}>Leadership & Clinical Directors</h3>
          </div>

          <div className="grid-4">
            {teamData.map((member) => (
              <div
                key={member.id}
                className="card-premium hover-lift"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ aspectRatio: '1/1', overflow: 'hidden', backgroundColor: 'var(--color-surface-warm)' }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    className="hover-scale"
                  />
                </div>
                <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h4 style={{ fontSize: 'var(--text-base)', margin: '0 0 2px 0' }}>
                    {member.name}
                  </h4>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent-hover)', fontWeight: 600, marginBottom: '4px' }}>
                    {member.role}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>
                    {member.credentials}
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginTop: 'auto' }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

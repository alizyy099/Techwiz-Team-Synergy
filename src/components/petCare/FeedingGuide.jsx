import React, { useState } from 'react';
import { Utensils, Calculator, Sparkles, Scale, Info, CheckCircle } from 'lucide-react';
import feedingGuidesData from '../../data/feedingGuides.json';
import SectionHeading from '../common/SectionHeading';

/**
 * Feeding Guide Component with Nutrition Tables and Interactive Portion Calculator
 */
export default function FeedingGuide() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [calcWeight, setCalcWeight] = useState(15); // in kg
  const [petStage, setPetStage] = useState('adult'); // puppy, adult, cat
  const [calcActivity, setCalcActivity] = useState('moderate'); // low, moderate, high

  const currentGuide = feedingGuidesData[activeCategoryIndex];

  // Interactive Calorie & Portion calculation
  const calculatePortion = () => {
    const weightInKg = parseFloat(calcWeight) || 10;
    let baseKcal = 0;

    if (petStage === 'puppy') {
      baseKcal = weightInKg * 110;
    } else if (petStage === 'cat') {
      baseKcal = weightInKg * 55;
    } else {
      // Adult dog
      baseKcal = weightInKg * 65;
    }

    // Activity multiplier
    let multiplier = 1.0;
    if (calcActivity === 'low') multiplier = 0.85;
    if (calcActivity === 'high') multiplier = 1.25;

    const finalKcal = Math.round(baseKcal * multiplier);
    const cupsEstimate = (finalKcal / 380).toFixed(1); // avg 380 kcal/cup

    return { finalKcal, cupsEstimate };
  };

  const { finalKcal, cupsEstimate } = calculatePortion();

  return (
    <section style={{ marginBottom: 'var(--space-16)' }}>
      <SectionHeading
        tag="Nutrition & Feeding Science"
        title="Tailored Nutrition & Portion Guidance"
        description="Evidence-based feeding charts and interactive calorie calculations designed for optimal vitality, coat health, and longevity."
      />

      {/* Category Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: 'var(--space-8)'
        }}
      >
        {feedingGuidesData.map((g, idx) => {
          const isSelected = activeCategoryIndex === idx;
          return (
            <button
              key={g.category}
              onClick={() => setActiveCategoryIndex(idx)}
              className="hover-scale"
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: isSelected ? 700 : 500,
                backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-surface)',
                color: isSelected ? '#FFFFFF' : 'var(--color-text)',
                border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                transition: 'all var(--transition-fast)'
              }}
            >
              {g.category}
            </button>
          );
        })}
      </div>

      {/* Guide Detail Card */}
      <div
        className="card-premium"
        style={{
          padding: 'var(--space-8)',
          marginBottom: 'var(--space-8)',
          backgroundColor: '#FFFFFF'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-6)',
            paddingBottom: 'var(--space-4)',
            borderBottom: '1px solid var(--color-border-subtle)'
          }}
        >
          <div>
            <span className="badge badge-caramel" style={{ marginBottom: '4px' }}>
              {currentGuide.target}
            </span>
            <h3 style={{ fontSize: 'var(--text-2xl)', margin: '4px 0' }}>
              {currentGuide.category}
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', maxWidth: '600px' }}>
              {currentGuide.description}
            </p>
          </div>

          <div
            style={{
              padding: 'var(--space-3) var(--space-4)',
              backgroundColor: 'var(--color-surface-warm)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              fontSize: 'var(--text-xs)'
            }}
          >
            <div style={{ color: 'var(--color-text-muted)', marginBottom: '2px' }}>
              Daily Feeding Rhythm
            </div>
            <strong style={{ color: 'var(--color-primary)' }}>
              {currentGuide.frequency}
            </strong>
          </div>
        </div>

        {/* Structured Feeding Table */}
        <div style={{ overflowX: 'auto', marginBottom: 'var(--space-6)' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 'var(--text-sm)',
              textAlign: 'left'
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: 'var(--color-surface-warm)',
                  borderBottom: '2px solid var(--color-border)'
                }}
              >
                <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-primary)' }}>
                  Pet Weight Range
                </th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-primary)' }}>
                  Recommended Daily Cups
                </th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-primary)' }}>
                  Est. Daily Calories
                </th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--color-primary)' }}>
                  Meal Distribution
                </th>
              </tr>
            </thead>
            <tbody>
              {currentGuide.table.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: '1px solid var(--color-border-subtle)',
                    backgroundColor: i % 2 === 0 ? 'transparent' : 'var(--color-bg)'
                  }}
                >
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>{row.weight}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--color-accent)', fontWeight: 700 }}>
                    {row.cupsPerDay}
                  </td>
                  <td style={{ padding: '12px 16px' }}>{row.calories}</td>
                  <td style={{ padding: '12px 16px' }}>{row.meals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key Nutritional Pillars & Pro Tips */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-4)',
            backgroundColor: 'var(--color-surface-warm)',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)'
          }}
        >
          <div>
            <div
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
                marginBottom: '8px'
              }}
            >
              Essential Nutritional Pillars
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {currentGuide.keyNutrients.map((n, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-secondary)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '6px'
                  }}
                >
                  <CheckCircle size={14} color="var(--color-wellness)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              borderLeft: '2px solid var(--color-accent-border)',
              paddingLeft: 'var(--space-4)'
            }}
          >
            <div
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Info size={14} />
              <span>Veterinary Feeding Tip</span>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              {currentGuide.proTips}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Portion Calculator Card */}
      <div
        className="card-premium"
        style={{
          background: 'linear-gradient(135deg, var(--color-bg) 0%, #FFFFFF 100%)',
          padding: 'var(--space-8)',
          border: '1.5px solid var(--color-accent-border)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-4)' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-accent-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-accent)'
            }}
          >
            <Calculator size={20} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: 'var(--text-lg)' }}>
              Interactive Daily Portion & Calorie Calculator
            </h4>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              Estimate exact nutritional intake based on current body weight & activity level
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-4)',
            alignItems: 'end',
            marginBottom: 'var(--space-6)'
          }}
        >
          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '6px' }}>
              Pet Life Stage
            </label>
            <select value={petStage} onChange={(e) => setPetStage(e.target.value)}>
              <option value="puppy">Growing Puppy (2-12 Mos)</option>
              <option value="adult">Adult Dog (1-7 Yrs)</option>
              <option value="cat">Feline / Cat (All Ages)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '6px' }}>
              Body Weight (kg): {calcWeight} kg ({Math.round(calcWeight * 2.204)} lbs)
            </label>
            <input
              type="range"
              min="1"
              max="60"
              step="0.5"
              value={calcWeight}
              onChange={(e) => setCalcWeight(e.target.value)}
              style={{ cursor: 'pointer', accentColor: 'var(--color-accent)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: '6px' }}>
              Daily Activity Level
            </label>
            <select value={calcActivity} onChange={(e) => setCalcActivity(e.target.value)}>
              <option value="low">Low (Couch cuddle / Senior)</option>
              <option value="moderate">Moderate (1-2 walks daily)</option>
              <option value="high">High (Active agility / Hikes)</option>
            </select>
          </div>
        </div>

        {/* Calculated Result Pill */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
            padding: 'var(--space-4) var(--space-6)',
            backgroundColor: 'var(--color-accent-soft)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-accent-border)'
          }}
        >
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent-hover)', fontWeight: 700 }}>
              ESTIMATED DAILY REQUIREMENT
            </div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-primary)' }}>
              {finalKcal} <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>kcal / day</span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent-hover)', fontWeight: 700 }}>
              APPROXIMATE DRY PORTION
            </div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-accent)' }}>
              ~{cupsEstimate} <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>cups / day</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

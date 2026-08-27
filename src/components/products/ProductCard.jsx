import { Star, ShoppingBag, Sparkles } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

/**
 * Reusable Product Card Component
 * Strictly encapsulates product card markup and micro-interactions.
 */
export default function ProductCard({ product, onBuyNow }) {
  return (
    <div
      className="card-premium hover-lift"
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        height: '100%'
      }}
    >
      {/* Product Image Frame */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '1/1',
          backgroundColor: 'var(--color-surface-warm)',
          overflow: 'hidden'
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform var(--transition-slow)'
          }}
          className="hover-scale"


        />

        {/* Category & Species Badges */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            alignItems: 'flex-start'
          }}


        >
          {product.badge && (
            <span
              className="badge badge-caramel"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: 'var(--shadow-xs)'
              }}


            >
              <Sparkles size={11} />
              <span>{product.badge}</span>
            </span>
          )}

          
          <span
            className="badge badge-cocoa"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              fontSize: '0.65rem'
            }}
          >
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Body Content */}
      <div
        style={{
          padding: 'var(--space-6)',
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}
      >
        {/* Rating & Review count */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: 'var(--space-2)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', color: '#D99B52' }}>
            <Star size={14} fill="#D99B52" />
          </div>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-primary)' }}>
            {product.rating}
          </span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            ({product.reviewCount || 95})
          </span>
        </div>

        {/* Product Title */}
        <h3
          style={{
            fontSize: 'var(--text-base)',
            fontWeight: 600,
            marginBottom: 'var(--space-2)',
            lineHeight: 1.35
          }}
        >
          {product.name}
        </h3>

        {/* Product Short Description */}
        <p
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-4)',
            lineHeight: 1.5,
            flex: 1
          }}
        >
          {product.description}
        </p>

        {/* Price & Buy Now Action Footer */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: 'var(--space-4)',
            borderTop: '1px solid var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px'
          }}
        >
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              {product.weight || 'Standard Size'}
            </div>
            <div
              style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                color: 'var(--color-primary)'
              }}
            >
              {formatCurrency(product.price)}
            </div>
          </div>

          <button
            onClick={() => onBuyNow(product)}
            className="btn btn-primary btn-sm"
            aria-label={`Buy ${product.name} now`}
          >
            <ShoppingBag size={14} />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}

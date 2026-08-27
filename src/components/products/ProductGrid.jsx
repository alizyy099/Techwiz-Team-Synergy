import { useState } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import productsData from '../../data/products.json';
import { filterAndSortProducts } from '../../utils/filterHelpers';
import { formatCurrency } from '../../utils/formatters';
import ProductCard from './ProductCard';
import SectionHeading from '../common/SectionHeading';
import EmptyState from '../common/EmptyState';
import Modal from '../common/Modal';

/**
 * Product Showcase Section with Multi-parameter Filter & Search
 */
export default function ProductGrid({ onShowToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [purchasingProduct, setPurchasingProduct] = useState(null);

  const categories = [
    'All',
    'Dog & Cat Food',
    'Toys',
    'Grooming Essentials',
    'Bedding & Apparel',
    'Health Supplements'
  ];

  const filteredProducts = filterAndSortProducts(productsData, {
    searchTerm,
    category: selectedCategory,
    sortBy
  });

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('default');
  };

  const handleBuyNow = (product) => {
    setPurchasingProduct(product);
  };

  return (
    <section className="section-padding" id="products-showcase">
      <div className="container">
        <SectionHeading
          tag="Curated Holistic Essentials"
          title="Premium Care Products for Every Companion"
          description="Veterinarian-approved organic nutrition, therapeutic bedding, gentle grooming botanical blends, and mental stimulation toys."
        />

        {/* Filter & Search Toolbar */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: 'var(--space-8)'
          }}
        >
          {/* Search Bar & Sort Row */}
          <div
            className="filter-bar"
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-4)'
            }}
          >
            {/* Search Input */}
            <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
              <input
                type="text"
                placeholder="Search products by title, formula, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '40px' }}
              />
              <Search
                size={18}
                color="var(--color-text-muted)"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '200px' }}>
              <ArrowUpDown size={16} color="var(--color-accent)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ cursor: 'pointer' }}
              >
                <option value="default">Featured / Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Top Rated</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Category Pill Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    whiteSpace: 'nowrap',
                    padding: '6px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: isSelected ? 700 : 500,
                    backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-surface-warm)',
                    color: isSelected ? '#FFFFFF' : 'var(--color-text)',
                    border: `1px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid Results */}
        {filteredProducts.length > 0 ? (
          <div className="grid-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Products Match Your Criteria"
            description={`We couldn't find any products matching "${searchTerm || selectedCategory}". Try exploring other categories.`}
            onReset={handleResetFilters}
            resetText="View All Products"
          />
        )}
      </div>

      {/* Non-Functional Demo Purchase Modal (SRS Requirement) */}
      <Modal
        isOpen={!!purchasingProduct}
        onClose={() => setPurchasingProduct(null)}
        title="Product Order Preview"
        maxWidth="500px"
      >
        {purchasingProduct && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-4)',
                backgroundColor: 'var(--color-surface-warm)',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-md)',
                alignItems: 'center'
              }}
            >
              <img
                src={purchasingProduct.image}
                alt={purchasingProduct.name}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: 'var(--radius-md)',
                  objectFit: 'cover'
                }}
              />
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: 'var(--text-sm)' }}>
                  {purchasingProduct.name}
                </h4>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  Category: {purchasingProduct.category}
                </div>
                <div style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {formatCurrency(purchasingProduct.price)}
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'var(--color-accent-soft)',
                border: '1px solid var(--color-accent-border)',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-primary)'
              }}
            >
              <strong>Academic Specification Notice:</strong> In compliance with the competition SRS,
              all product checkouts and "Buy Now" actions are demonstration-only without payment gateway or server-side orders.
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: 'var(--space-2)' }}>
              <button
                onClick={() => setPurchasingProduct(null)}
                className="btn btn-primary"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

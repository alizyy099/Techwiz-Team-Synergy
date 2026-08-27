import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, User, ArrowRight, Sparkles } from 'lucide-react';
import blogData from '../../data/blogPosts.json';
import SectionHeading from '../common/SectionHeading';
import Modal from '../common/Modal';

/**
 * Pet Care Blog & Wellness Journal Component
 */
export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Behavior & Psychology', 'Geriatric Care', 'Nutrition & Dermatology', 'Safety & First Aid'];

  const filteredPosts = blogData.filter((post) => {
    if (activeCategory === 'All') return true;
    return post.category === activeCategory;
  });

  return (
    <section className="section-padding" id="blog-section">
      <div className="container">
        <SectionHeading
          tag="Knowledge & Wellness Journal"
          title="Clinical Pet Care Insights & Articles"
          description="In-depth, veterinarian-authored guides on pet behavior, preventive nutrition, senior care modifications, and emergency readiness."
        />

        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: 'var(--space-8)'
          }}
        >
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: isSelected ? 700 : 500,
                  backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-surface)',
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

        {/* Article Cards Grid */}
        <div className="grid-2">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="card-premium hover-lift"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '16/9',
                  backgroundColor: 'var(--color-surface-warm)',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedPost(post)}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  className="hover-scale"
                />
                <span
                  className="badge badge-caramel"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)'
                  }}
                >
                  {post.category}
                </span>
              </div>

              <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-muted)',
                    marginBottom: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} color="var(--color-accent)" />
                    <span>{post.date}</span>
                  </div>
                  <span>•</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} />
                    <span>{post.readTime}</span>
                  </div>
                  <span>•</span>
                  <span>By {post.author}</span>
                </div>

                <h3
                  style={{
                    fontSize: 'var(--text-lg)',
                    marginBottom: 'var(--space-3)',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedPost(post)}
                >
                  {post.title}
                </h3>

                <p
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: 'var(--space-4)',
                    flex: 1
                  }}
                >
                  {post.excerpt}
                </p>

                <button
                  onClick={() => setSelectedPost(post)}
                  className="btn btn-outline-accent btn-sm"
                  style={{ width: '100%' }}
                >
                  <span>Read Full Article</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Article Reader Modal */}
      <Modal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        title={selectedPost?.title || 'Article View'}
        maxWidth="720px"
      >
        {selectedPost && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ aspectRatio: '16/9', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span className="badge badge-caramel">{selectedPost.category}</span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                {selectedPost.date} • {selectedPost.readTime} • Author: {selectedPost.author}
              </span>
            </div>

            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.8, color: 'var(--color-text)' }}>
              {selectedPost.content}
            </p>

            <div
              style={{
                backgroundColor: 'var(--color-surface-warm)',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-secondary)'
              }}
            >
              <strong>Veterinary Review:</strong> This article was reviewed by the FurEver Care Clinical Advisory Board.
              Always consult your primary care veterinary physician regarding individual diagnostics and therapies.
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

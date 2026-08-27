import React from 'react';

/**
 * Reusable Section Header with Category Tag, Title, and Description
 */
export default function SectionHeading({
  tag,
  title,
  description,
  alignment = 'center',
  className = ''
}) {
  const isCenter = alignment === 'center';

  return (
    <div
      className={`section-header-block ${className}`}
      style={{
        textAlign: alignment,
        margin: isCenter ? '0 auto var(--space-12) auto' : '0 0 var(--space-8) 0',
        maxWidth: isCenter ? '720px' : '100%'
      }}
    >
      {tag && (
        <span
          className="section-tag"
          style={{
            justifyContent: isCenter ? 'center' : 'flex-start'
          }}
        >
          {tag}
        </span>
      )}
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
    </div>
  );
}

import React, { useState } from 'react';
import { Heart, Search, MapPin, Filter } from 'lucide-react';
import petsData from '../../data/pets.json';
import { filterPets } from '../../utils/filterHelpers';
import SectionHeading from '../common/SectionHeading';
import EmptyState from '../common/EmptyState';
import AdoptionModal from './AdoptionModal';

export default function AdoptablePetGallery({ onShowToast }) {
  const [speciesFilter, setSpeciesFilter] = useState('All');
  const [ageFilter, setAgeFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPetForAdoption, setSelectedPetForAdoption] = useState(null);
  const [hoveredPetId, setHoveredPetId] = useState(null);

  const filteredPets = filterPets(petsData, {
    species: speciesFilter,
    ageCategory: ageFilter,
    searchTerm: searchTerm
  });

  const handleReset = () => {
    setSpeciesFilter('All');
    setAgeFilter('All');
    setSearchTerm('');
  };

  const handleMouseEnter = (petId, event) => {
    setHoveredPetId(petId);

    const video = event.currentTarget.querySelector('video');

    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const handleMouseLeave = (event) => {
    setHoveredPetId(null);

    const video = event.currentTarget.querySelector('video');

    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <section style={{ marginBottom: 'var(--space-16)' }}>
      <SectionHeading
        tag="Adoption & Rescue Network"
        title="Meet Our Adoptable Companions"
        description="Every rescue pet is microchipped, fully vaccinated, spayed/neutered, and eager to bring unconditional warmth into your home."
      />

      {/* Filter and Search Bar */}
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
          {/* Search */}
          <div
            style={{
              position: 'relative',
              flex: 1,
              minWidth: '240px'
            }}
          >
            <input
              type="text"
              placeholder="Search pets by name, breed, or shelter location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '40px' }}
            />

            <Search
              size={18}
              color="var(--color-text-muted)"
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            />
          </div>

          {/* Age Filter */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              minWidth: '180px'
            }}
          >
            <Filter
              size={16}
              color="var(--color-accent)"
            />

            <select
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
            >
              <option value="All">All Ages</option>
              <option value="Puppy">Puppy / Kitten</option>
              <option value="Young">Young (1-3 Yrs)</option>
              <option value="Adult">Adult (4+ Yrs)</option>
            </select>
          </div>
        </div>

        {/* Species Filters */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap'
          }}
        >
          {['All', 'Dog', 'Cat', 'Rabbit'].map((spec) => {
            const isSelected = speciesFilter === spec;

            return (
              <button
                key={spec}
                onClick={() => setSpeciesFilter(spec)}
                style={{
                  padding: '6px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: isSelected ? 700 : 500,
                  backgroundColor: isSelected
                    ? 'var(--color-accent)'
                    : 'var(--color-surface-warm)',
                  color: isSelected
                    ? '#FFFFFF'
                    : 'var(--color-text)',
                  border: isSelected
                    ? '1px solid var(--color-accent)'
                    : '1px solid var(--color-border)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {spec === 'All' ? 'All Species' : `${spec}s`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pet Cards */}
      {filteredPets.length > 0 ? (
        <div className="grid-3">
          {filteredPets.map((pet) => {
            const isHovered = hoveredPetId === pet.id;

            return (
              <div
                key={pet.id}
                className="card-premium hover-lift"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Image / Video Area */}
                <div
                  onMouseEnter={(event) => handleMouseEnter(pet.id, event)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    position: 'relative',
                    aspectRatio: '4 / 3',
                    backgroundColor: 'var(--color-surface-warm)',
                    overflow: 'hidden'
                  }}
                >
                  {/* Pet Image */}
                  <img
                    src={pet.image}
                    alt={pet.name}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: isHovered && pet.video ? 0 : 1,
                      transition: 'opacity 0.4s ease'
                    }}
                  />

                  {/* Pet Video */}
                  {pet.video && (
                    <video
                      src={pet.video}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.90s ease-in-out',
                        pointerEvents: 'none'
                      }}
                    />
                  )}

                  {/* Species and Gender Badges */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      display: 'flex',
                      gap: '6px',
                      zIndex: 2
                    }}
                  >
                    <span
                      className="badge badge-caramel"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)'
                      }}
                    >
                      {pet.species}
                    </span>

                    <span
                      className="badge badge-cocoa"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)'
                      }}
                    >
                      {pet.gender}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div
                  style={{
                    padding: 'var(--space-6)',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1
                  }}
                >
                  {/* Name and Age */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '4px'
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 'var(--text-xl)',
                        margin: 0
                      }}
                    >
                      {pet.name}
                    </h3>

                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-accent-hover)',
                        fontWeight: 700
                      }}
                    >
                      {pet.age}
                    </span>
                  </div>

                  {/* Breed and Size */}
                  <div
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-secondary)',
                      fontWeight: 600,
                      marginBottom: 'var(--space-2)'
                    }}
                  >
                    {pet.breed} • {pet.size}
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.55,
                      marginBottom: 'var(--space-3)',
                      flex: 1
                    }}
                  >
                    {pet.description}
                  </p>

                  {/* Compatibility Tags */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '4px',
                      flexWrap: 'wrap',
                      marginBottom: 'var(--space-4)'
                    }}
                  >
                    {pet.goodWith &&
                      pet.goodWith.map((tag, index) => (
                        <span
                          key={index}
                          className="badge badge-sage"
                          style={{
                            fontSize: '0.62rem',
                            padding: '2px 8px'
                          }}
                        >
                          Good with {tag}
                        </span>
                      ))}
                  </div>

                  {/* Shelter Location */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-muted)',
                      marginBottom: 'var(--space-4)'
                    }}
                  >
                    <MapPin
                      size={13}
                      color="var(--color-accent)"
                    />

                    <span>{pet.location}</span>
                  </div>

                  {/* Adoption Button */}
                  <button
                    onClick={() => setSelectedPetForAdoption(pet)}
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%' }}
                  >
                    <Heart
                      size={14}
                      fill="#FFFFFF"
                    />

                    <span>
                      Meet & Apply for {pet.name}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No Adoptable Pets Found"
          description="We couldn't find any adoptable pets matching your current filters. Try changing species or resetting."
          onReset={handleReset}
          resetText="View All Adoptable Pets"
        />
      )}

      {/* Adoption Modal */}
      <AdoptionModal
        pet={selectedPetForAdoption}
        onClose={() => setSelectedPetForAdoption(null)}
        onShowToast={onShowToast}
      />
    </section>
  );
}
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import './PetCard.css'

function PetCard({ pet }) {
  const videoRef = useRef(null)

  const handleMouseEnter = () => {
    if (videoRef.current && pet.video) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <article
      className="pet-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pet-card__media">

        {/* Normal image */}
        <img
          src={pet.image}
          alt={`${pet.name} - ${pet.breed}`}
          className="pet-card__image"
        />

        {/* Hover video */}
        {pet.video && (
          <video
            ref={videoRef}
            src={pet.video}
            muted
            loop
            playsInline
            preload="metadata"
            className="pet-card__video"
            aria-hidden="true"
          />
        )}

        {/* Hover overlay */}
        <div className="pet-card__overlay">
          <span className="pet-card__eyebrow">
            {pet.species}
          </span>

          <Link
            to={`/adopt/${pet.id}`}
            className="pet-card__adopt-button"
            onClick={(event) => event.stopPropagation()}
          >
            Adopt Me
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Status */}
        <span className="pet-card__status">
          Ready for a home
        </span>
      </div>

      <div className="pet-card__content">

        <div className="pet-card__heading">
          <div>
            <h3>{pet.name}</h3>
            <p>{pet.breed}</p>
          </div>

          <span className="pet-card__heart">
            ♡
          </span>
        </div>

        <div className="pet-card__meta">
          <span>{pet.age}</span>
          <span>•</span>
          <span>{pet.gender}</span>
        </div>

        <div className="pet-card__personality">
          {pet.personality?.slice(0, 2).map((trait) => (
            <span key={trait}>
              {trait}
            </span>
          ))}
        </div>

      </div> 
    </article>
  )
}

export default PetCard


















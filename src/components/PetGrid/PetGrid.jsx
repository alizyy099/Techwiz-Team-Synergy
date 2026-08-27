import pets from '../data/pets.json'
import PetCard from './PetCard'
import './PetGrid.css'

function PetGrid() {
  return (
    <section className="pets-section" id="adoptable-pets">
      <div className="pets-section__header">
        <div>
          <span className="section-kicker">
            Find your companion
          </span>

          <h2>
            Meet the pets
            <br />
            waiting for you.
          </h2>
        </div>

        <p>
          Every animal deserves a safe place to call home.
          Explore their personalities and find your perfect match.
        </p>
      </div>

      <div className="pets-grid">
        {pets.map((pet) => (
          <PetCard
            key={pet.id}
            pet={pet}
          />
        ))}
      </div>
    </section>
  )
}

export default PetGrid
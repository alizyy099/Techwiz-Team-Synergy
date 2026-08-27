/**
 * Client-side search and filtering utilities
 */

/**
 * Filter products based on search term, category, and sort order
 */
export function filterAndSortProducts(products, { searchTerm = '', category = 'All', sortBy = 'default' }) {
  let result = [...products];

  // Search filter (name, description, species)
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        (p.category && p.category.toLowerCase().includes(term)) ||
        (p.species && p.species.toLowerCase().includes(term))
    );
  }

  // Category filter
  if (category && category !== 'All') {
    result = result.filter((p) => p.category === category);
  }

  // Sorting
  switch (sortBy) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'rating-desc':
      result.sort((a, b) => b.rating - a.rating);
      break;
    default:
      // default JSON order
      break;
  }

  return result;
}

/**
 * Filter adoptable pets based on species, ageCategory, and breed/name search
 */
export function filterPets(pets, { species = 'All', ageCategory = 'All', searchTerm = '' }) {
  let result = [...pets];

  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase().trim();
    result = result.filter(
      (pet) =>
        pet.name.toLowerCase().includes(term) ||
        pet.breed.toLowerCase().includes(term) ||
        pet.location.toLowerCase().includes(term) ||
        pet.description.toLowerCase().includes(term)
    );
  }

  if (species && species !== 'All') {
    result = result.filter((pet) => pet.species.toLowerCase() === species.toLowerCase());
  }

  if (ageCategory && ageCategory !== 'All') {
    result = result.filter((pet) => pet.ageCategory.toLowerCase() === ageCategory.toLowerCase());
  }

  return result;
}

export const CATEGORY_EMOJI = {
  Mountains: "🏔️",
  Beaches: "🏖️",
  Cities: "🏙️",
  Nature: "🌿",
};

export const FAVOURITES_KEY = "tde_favourites";

export function loadFavourites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVOURITES_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function saveFavourites(ids) {
  try {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(ids));
  } catch {
    /* storage may be blocked; app still works without persistence */
  }
}

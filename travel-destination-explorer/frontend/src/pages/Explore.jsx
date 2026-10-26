import SearchFilter from "../components/SearchFilter.jsx";
import DestinationGrid from "../components/DestinationGrid.jsx";
import { EmptyState } from "../components/StatusMessages.jsx";

export default function Explore({
  destinations, categories, search, onSearchChange, category, onCategoryChange,
  favourites, onToggleFavourite, onView,
}) {
  // Search by name OR location, then filter by category
  const term = search.trim().toLowerCase();
  const results = destinations.filter((d) => {
    const matchesSearch = !term || d.name.toLowerCase().includes(term) || d.location.toLowerCase().includes(term);
    const matchesCategory = category === "All" || d.category === category;
    return matchesSearch && matchesCategory;
  });

  const reset = () => { onSearchChange(""); onCategoryChange("All"); };

  return (
    <section className="container section">
      <h2 className="section-title">Explore Destinations</h2>
      <SearchFilter search={search} onSearchChange={onSearchChange}
                    categories={categories} category={category} onCategoryChange={onCategoryChange} />
      <p className="result-count" aria-live="polite">
        Showing {results.length} of {destinations.length} destinations
      </p>
      {results.length === 0 ? (
        <EmptyState
          title="No destinations found"
          message="We couldn't find a match. Try a different name, place or category."
          action={<button className="btn btn-primary" onClick={reset}>Show all destinations</button>}
        />
      ) : (
        <DestinationGrid destinations={results} favourites={favourites}
                         onToggleFavourite={onToggleFavourite} onView={onView} />
      )}
    </section>
  );
}

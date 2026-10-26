export default function SearchFilter({ search, onSearchChange, categories, category, onCategoryChange }) {
  return (
    <div className="filters">
      <input
        type="search"
        className="search-input"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search destinations..."
        aria-label="Search destinations by name or location"
      />
      <div className="chips" role="group" aria-label="Filter by category">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            className={`chip-btn ${category === c ? "active" : ""}`}
            onClick={() => onCategoryChange(c)}
            aria-pressed={category === c}
          >
            {c === "All" ? "All Destinations" : c}
          </button>
        ))}
      </div>
    </div>
  );
}

import Hero from "../components/Hero.jsx";
import DestinationGrid from "../components/DestinationGrid.jsx";

export default function Home({ destinations, favourites, onToggleFavourite, onView, onSearch, onNavigate }) {
  const featured = destinations.slice(0, 3);
  return (
    <>
      <Hero onSearch={onSearch} />
      <section className="container section">
        <h2 className="section-title">Featured destinations</h2>
        {featured.length > 0 && (
          <DestinationGrid destinations={featured} favourites={favourites}
                           onToggleFavourite={onToggleFavourite} onView={onView} />
        )}
        <div className="center">
          <button className="btn btn-primary" onClick={() => onNavigate("explore")}>
            Explore all destinations
          </button>
        </div>
      </section>
    </>
  );
}

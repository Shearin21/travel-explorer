import DestinationGrid from "../components/DestinationGrid.jsx";
import { EmptyState } from "../components/StatusMessages.jsx";

export default function Favourites({ destinations, favourites, onToggleFavourite, onView, onNavigate }) {
  const saved = destinations.filter((d) => favourites.includes(d.id));
  return (
    <section className="container section">
      <h2 className="section-title">Your Favourites</h2>
      {saved.length === 0 ? (
        <EmptyState
          title="No favourites yet"
          message="Tap the heart on any destination to save it here."
          action={<button className="btn btn-primary" onClick={() => onNavigate("explore")}>Explore destinations</button>}
        />
      ) : (
        <DestinationGrid destinations={saved} favourites={favourites}
                         onToggleFavourite={onToggleFavourite} onView={onView} />
      )}
    </section>
  );
}

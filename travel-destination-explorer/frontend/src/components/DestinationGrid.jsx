import DestinationCard from "./DestinationCard.jsx";

export default function DestinationGrid({ destinations, favourites, onToggleFavourite, onView }) {
  return (
    <div className="grid">
      {destinations.map((d) => (
        <DestinationCard
          key={d.id}
          destination={d}
          isFavourite={favourites.includes(d.id)}
          onToggleFavourite={onToggleFavourite}
          onView={onView}
        />
      ))}
    </div>
  );
}

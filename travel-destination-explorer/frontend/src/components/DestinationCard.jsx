import { useState } from "react";
import { CATEGORY_EMOJI } from "../services/helpers.js";

export function DestinationImage({ destination, className }) {
  const [failed, setFailed] = useState(false);
  if (failed || !destination.image_url) {
    return (
      <div className={`img-placeholder cat-${destination.category} ${className || ""}`} role="img"
           aria-label={`${destination.name} (photo unavailable)`}>
        <span>{CATEGORY_EMOJI[destination.category] || "📍"}</span>
        <small>{destination.name}</small>
      </div>
    );
  }
  return (
    <img
      className={className}
      src={destination.image_url}
      alt={destination.name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export default function DestinationCard({ destination, isFavourite, onToggleFavourite, onView }) {
  return (
    <article className="card">
      <div className="card-media">
        <DestinationImage destination={destination} className="card-img" />
        <span className="chip chip-overlay">{destination.category}</span>
        <button
          className={`fav-btn ${isFavourite ? "on" : ""}`}
          onClick={() => onToggleFavourite(destination.id)}
          aria-pressed={isFavourite}
          aria-label={isFavourite ? `Remove ${destination.name} from favourites` : `Add ${destination.name} to favourites`}
        >
          {isFavourite ? "♥" : "♡"}
        </button>
      </div>
      <div className="card-body">
        <h3>{destination.name}</h3>
        <p className="location">📍 {destination.location}</p>
        <p className="desc">{destination.short_description}</p>
        <ul className="meta">
          <li><strong>Budget:</strong> {destination.budget}</li>
          <li><strong>Best time:</strong> {destination.best_time}</li>
        </ul>
        <button className="btn btn-primary" onClick={() => onView(destination.id)}>
          View Details
        </button>
      </div>
    </article>
  );
}

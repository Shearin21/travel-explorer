import { useEffect, useState } from "react";
import { getDestination } from "../services/api.js";
import { DestinationImage } from "./DestinationCard.jsx";
import { Loader, ErrorMessage } from "./StatusMessages.jsx";

// Fetches ONE destination from GET /api/destinations/{id} when opened.
export default function DetailsModal({ id, isFavourite, onToggleFavourite, onClose }) {
  const [destination, setDestination] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setDestination(null);
    setError("");
    getDestination(id)
      .then((data) => !cancelled && setDestination(data))
      .catch((err) => !cancelled && setError(err.message));
    return () => { cancelled = true; };
  }, [id]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label="Destination details"
           onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close details">✕</button>
        {error && <ErrorMessage message={error} />}
        {!error && !destination && <Loader />}
        {destination && (
          <>
            <DestinationImage destination={destination} className="modal-img" />
            <div className="modal-body">
              <span className="chip">{destination.category}</span>
              <h2>{destination.name}</h2>
              <p className="location">📍 {destination.location}</p>
              <p className="long-desc">{destination.description}</p>
              <dl className="facts">
                <div><dt>Estimated budget</dt><dd>{destination.budget}</dd></div>
                <div><dt>Best time to visit</dt><dd>{destination.best_time}</dd></div>
                <div><dt>Category</dt><dd>{destination.category}</dd></div>
              </dl>
              <button
                className={`btn ${isFavourite ? "btn-accent" : "btn-primary"}`}
                onClick={() => onToggleFavourite(destination.id)}
              >
                {isFavourite ? "♥ Remove from favourites" : "♡ Add to favourites"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";

export default function Hero({ onSearch }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSearch(text.trim());
  };

  return (
    <section className="hero">
      <div className="container hero-content">
        <h1>Travel Destination Explorer</h1>
        <p>
          Discover beautiful places across India. Search destinations, filter by category,
          read details and save your favourites for your next trip.
        </p>
        <form className="hero-search" onSubmit={submit} role="search">
          <input
            type="search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search destinations..."
            aria-label="Search destinations"
          />
          <button type="submit" className="btn btn-accent">Search</button>
        </form>
      </div>
    </section>
  );
}

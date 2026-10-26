const LINKS = [
  { id: "home", label: "Home" },
  { id: "explore", label: "Explore Destinations" },
  { id: "favourites", label: "Favourites" },
];

export default function Navbar({ page, onNavigate, favouriteCount }) {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <button className="brand" onClick={() => onNavigate("home")} aria-label="Go to home page">
          ✈️ <span>Travel Destination Explorer</span>
        </button>
        <nav aria-label="Main navigation">
          <ul className="nav-links">
            {LINKS.map((link) => (
              <li key={link.id}>
                <button
                  className={`nav-link ${page === link.id ? "active" : ""}`}
                  onClick={() => onNavigate(link.id)}
                  aria-current={page === link.id ? "page" : undefined}
                >
                  {link.label}
                  {link.id === "favourites" && favouriteCount > 0 && (
                    <span className="badge">{favouriteCount}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

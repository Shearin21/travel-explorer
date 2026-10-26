import { useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import DetailsModal from "./components/DetailsModal.jsx";
import { Loader, ErrorMessage } from "./components/StatusMessages.jsx";
import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import Favourites from "./pages/Favourites.jsx";
import { getDestinations, getCategories } from "./services/api.js";
import { loadFavourites, saveFavourites } from "./services/helpers.js";

export default function App() {
  const [page, setPage] = useState("home");
  const [destinations, setDestinations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useState(loadFavourites);

  // Load data from the FastAPI backend
  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [dest, cats] = await Promise.all([getDestinations(), getCategories()]);
      setDestinations(dest);
      setCategories(cats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // Save favourites to localStorage whenever they change
  useEffect(() => { saveFavourites(favourites); }, [favourites]);

  const toggleFavourite = (id) =>
    setFavourites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const navigate = (target) => { setPage(target); window.scrollTo({ top: 0 }); };

  const handleHeroSearch = (text) => { setSearch(text); setCategory("All"); navigate("explore"); };

  const common = { favourites, onToggleFavourite: toggleFavourite, onView: setSelectedId };

  let content;
  if (loading) content = <div className="container section"><Loader /></div>;
  else if (error) content = <div className="container section"><ErrorMessage message={error} onRetry={loadData} /></div>;
  else if (page === "explore")
    content = <Explore destinations={destinations} categories={categories} search={search}
                       onSearchChange={setSearch} category={category} onCategoryChange={setCategory} {...common} />;
  else if (page === "favourites")
    content = <Favourites destinations={destinations} onNavigate={navigate} {...common} />;
  else
    content = <Home destinations={destinations} onSearch={handleHeroSearch} onNavigate={navigate} {...common} />;

  return (
    <>
      <Navbar page={page} onNavigate={navigate} favouriteCount={favourites.length} />
      <main>{content}</main>
      <footer className="footer">
        <div className="container">Travel Destination Explorer · React + FastAPI + SQLite</div>
      </footer>
      {selectedId !== null && (
        <DetailsModal
          id={selectedId}
          isFavourite={favourites.includes(selectedId)}
          onToggleFavourite={toggleFavourite}
          onClose={() => setSelectedId(null)}
        />
      )}
    </>
  );
}

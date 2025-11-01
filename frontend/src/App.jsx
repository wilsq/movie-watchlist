import { useState } from "react";

function App() {
  const [query, setQuery] = useState(""); // Käyttäjän haku
  const [results, setResults] = useState([]); // hakutulokset
  const [error, setError] = useState(""); // mahdollinen virheviesti

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      console.log("Haetaan:", query); // ✅ Debug 1

      const res = await fetch(`http://localhost:5000/api/omdb?title=${query}`);

      console.log("Backend status:", res.status); // ✅ Debug 2
      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Jotain meni pieleen");
        setResults([]);
        return;
      }
      const data = await res.json();
      console.log("Saadut tiedot:", data); // ✅ Debug 3
      setResults(data);
      setError("");
    } catch (err) {
      setError("Virhe palvelinyhteydessä");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-3xl font-bold text-red-500">Movie Watchlist</h1>

      {/* 🔍 Hakukenttä */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Hae elokuvaa..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Hae</button>
      </form>

      {/* ⚠️ Virheviestin näyttäminen */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {results && results.length > 0 && (
        <div>
          {results.map((movie) => (
            <div key={movie.imdbID}>
              <strong>{movie.Title}</strong> ({movie.Year})
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

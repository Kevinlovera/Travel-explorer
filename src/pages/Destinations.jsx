
import { useEffect, useState } from "react";
import { getDestinations } from "../services/destinationService";
import DestinationCard from "../components/DestinationCard";

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDestinations() {
      try {
        const data = await getDestinations();
        setDestinations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadDestinations();
  }, []);

  const filteredDestinations = destinations.filter(destination =>
    `${destination.name} ${destination.country}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="container section">

      <div className="page-heading">
        <span className="section-label">ENCUENTRA TU DESTINO</span>
        <h1>Explora nuestros destinos</h1>
        <p>Descubre lugares increíbles alrededor del mundo.</p>
      </div>

      <input
        type="search"
        className="search-input"
        placeholder="Buscar por ciudad o país..."
        value={search}
        onChange={event => setSearch(event.target.value)}
      />

      {loading && <p>Cargando destinos...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <>
          <p className="results-count">
            {filteredDestinations.length} destinos encontrados
          </p>

          {filteredDestinations.length > 0 ? (
            <div className="destination-grid">
              {filteredDestinations.map(destination => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </div>
          ) : (
            <p>No encontramos destinos con esa búsqueda.</p>
          )}
        </>
      )}

    </main>
  );
}

export default Destinations;

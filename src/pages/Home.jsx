
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDestinations } from "../services/destinationService";
import DestinationCard from "../components/DestinationCard";

function Home() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDestinations() {
      try {
        const data = await getDestinations();
        setDestinations(data.filter(item => item.featured));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadDestinations();
  }, []);

  return (
    <main>

      <section className="hero">
        <div className="container hero-content">

          <span className="hero-label">
            TU PRÓXIMA AVENTURA COMIENZA AQUÍ
          </span>

          <h1>
            El mundo está esperando
            <span> por ti.</span>
          </h1>

          <p>
            Explora destinos increíbles, compara vuelos
            y encuentra el hotel perfecto para tu próxima aventura.
          </p>

          <Link to="/destinos" className="primary-button">
            Explorar destinos →
          </Link>

        </div>
      </section>

      <section className="section container">

        <div className="section-heading">
          <div>
            <span className="section-label">DESCUBRE EL MUNDO</span>
            <h2>Destinos destacados</h2>
            <p>Algunos lugares que podrían convertirse en tu próximo viaje.</p>
          </div>

          <Link to="/destinos" className="text-link">
            Ver todos →
          </Link>
        </div>

        {loading && <p>Cargando destinos...</p>}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <div className="destination-grid">
            {destinations.map(destination => (
              <DestinationCard
                key={destination.id}
                destination={destination}
              />
            ))}
          </div>
        )}

      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Tu próxima historia comienza con un viaje.</h2>
          <p>Encuentra el destino que siempre has querido conocer.</p>
          <Link to="/destinos" className="primary-button">
            Comenzar ahora
          </Link>
        </div>
      </section>

    </main>
  );
}

export default Home;

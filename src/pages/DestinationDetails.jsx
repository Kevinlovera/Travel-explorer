
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { getDestinationById } from "../services/destinationService";
import { getTravelOptions } from "../services/travelService";

import FlightCard from "../components/FlightCard";
import HotelCard from "../components/HotelCard";

function DestinationDetails() {
  const { id } = useParams();

  const [destination, setDestination] = useState(null);
  const [travelOptions, setTravelOptions] = useState({
    flights: [],
    hotels: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDetails() {
      setLoading(true);
      setError("");

      try {
        const [destinationData, travelData] = await Promise.all([
          getDestinationById(id),
          getTravelOptions(id)
        ]);

        setDestination(destinationData);
        setTravelOptions(travelData);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadDetails();
  }, [id]);

  if (loading) {
    return <main className="container section">Cargando información...</main>;
  }

  if (error) {
    return (
      <main className="container section">
        <p className="error-message">{error}</p>
        <Link to="/destinos">Volver a destinos</Link>
      </main>
    );
  }

  if (!destination) {
    return <main className="container section">Destino no encontrado.</main>;
  }

  return (
    <main className="container section">

      <Link to="/destinos" className="text-link">
        ← Volver a destinos
      </Link>

      <div className="detail-hero">
        <img src={destination.image} alt={destination.name} />

        <div>
          <span className="section-label">{destination.country}</span>
          <h1>{destination.name}</h1>
          <p>{destination.description}</p>
        </div>
      </div>

      <section className="detail-section">
        <h2>Actividades populares</h2>

        <div className="activities">
          {destination.activities.map(activity => (
            <span key={activity} className="activity-tag">
              {activity}
            </span>
          ))}
        </div>
      </section>

      <section className="detail-section">
        <h2>✈ Vuelos disponibles</h2>

        {travelOptions.flights.length > 0 ? (
          <div className="travel-grid">
            {travelOptions.flights.map(flight => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        ) : (
          <p>No hay vuelos disponibles.</p>
        )}
      </section>

      <section className="detail-section">
        <h2>🏨 Hoteles disponibles</h2>

        {travelOptions.hotels.length > 0 ? (
          <div className="travel-grid">
            {travelOptions.hotels.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <p>No hay hoteles disponibles.</p>
        )}
      </section>

    </main>
  );
}

export default DestinationDetails;

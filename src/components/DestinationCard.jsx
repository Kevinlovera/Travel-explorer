
import { Link } from "react-router-dom";

function DestinationCard({ destination }) {
  return (
    <article className="destination-card">

      <img
        src={destination.image}
        alt={destination.name}
        className="destination-image"
      />

      <div className="destination-content">

        <span className="country-label">
          {destination.country}
        </span>

        <h3>{destination.name}</h3>

        <p>{destination.description}</p>

        <div className="activities">
          {destination.activities.slice(0, 2).map(activity => (
            <span key={activity} className="activity-tag">
              {activity}
            </span>
          ))}
        </div>

        <Link
          to={`/destinos/${destination.id}`}
          className="card-button"
        >
          Ver vuelos y hoteles →
        </Link>

      </div>
    </article>
  );
}

export default DestinationCard;
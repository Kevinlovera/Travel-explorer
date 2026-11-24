
function FlightCard({ flight }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0
    }).format(price);

  return (
    <article className="travel-card">

      <div className="travel-card-header">
        <span className="travel-icon">✈</span>
        <span className="availability">
          {flight.availableSeats} asientos disponibles
        </span>
      </div>

      <h3>{flight.airline}</h3>

      <p>Salida: {flight.departureDate}</p>
      <p>Regreso: {flight.returnDate}</p>

      <div className="price">
        {formatPrice(flight.price)}
      </div>

    </article>
  );
}

export default FlightCard;
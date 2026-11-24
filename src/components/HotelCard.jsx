
function HotelCard({ hotel }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0
    }).format(price);

  return (
    <article className="travel-card">

      <div className="travel-card-header">
        <span className="travel-icon">🏨</span>
        <span className="availability">
          {hotel.availableRooms} habitaciones disponibles
        </span>
      </div>

      <h3>{hotel.name}</h3>

      <p>Clasificación: {"★".repeat(hotel.stars)}</p>

      <div className="price">
        {formatPrice(hotel.pricePerNight)}
        <small> / noche</small>
      </div>

    </article>
  );
}

export default HotelCard;
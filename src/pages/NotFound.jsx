
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="container section not-found">

      <h1>404</h1>
      <h2>Página no encontrada</h2>

      <p>Lo sentimos, no pudimos encontrar la página que buscas.</p>

      <Link to="/" className="primary-button">
        Volver al inicio
      </Link>

    </main>
  );
}

export default NotFound;

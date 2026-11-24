
const API_URL = "http://localhost:3001";

export async function getDestinations() {
  const response = await fetch(`${API_URL}/destinations`);

  if (!response.ok) {
    throw new Error("No se pudieron obtener los destinos");
  }

  return await response.json();
}

export async function getDestinationById(id) {
  const response = await fetch(`${API_URL}/destinations/${id}`);

  if (!response.ok) {
    throw new Error("No se encontró el destino");
  }

  return await response.json();
}
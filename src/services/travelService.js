
const GRAPHQL_URL = "http://localhost:4000/graphql";

export async function getTravelOptions(destinationId) {
  const query = `
    query GetTravelOptions($destinationId: ID!) {
      travelOptions(destinationId: $destinationId) {
        flights {
          id
          airline
          departureDate
          returnDate
          price
          availableSeats
        }

        hotels {
          id
          name
          stars
          pricePerNight
          availableRooms
        }
      }
    }
  `;

  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      variables: {
        destinationId
      }
    })
  });

  if (!response.ok) {
    throw new Error("No se pudieron consultar los viajes");
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.travelOptions;
}
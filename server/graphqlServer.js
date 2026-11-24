
import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";

// Datos simulados de vuelos y hoteles
const travelData = {
  flights: [
    {
      id: "f1",
      destinationId: "1",
      airline: "LATAM Airlines",
      departureDate: "2026-12-10",
      returnDate: "2026-12-20",
      price: 450000,
      availableSeats: 12
    },
    {
      id: "f2",
      destinationId: "1",
      airline: "Sky Airline",
      departureDate: "2026-12-15",
      returnDate: "2026-12-25",
      price: 380000,
      availableSeats: 8
    },
    {
      id: "f3",
      destinationId: "2",
      airline: "Air France",
      departureDate: "2027-01-10",
      returnDate: "2027-01-20",
      price: 850000,
      availableSeats: 5
    },
    {
      id: "f4",
      destinationId: "3",
      airline: "Japan Airlines",
      departureDate: "2027-02-05",
      returnDate: "2027-02-20",
      price: 1200000,
      availableSeats: 7
    },
    {
      id: "f5",
      destinationId: "4",
      airline: "LATAM Airlines",
      departureDate: "2027-01-15",
      returnDate: "2027-01-25",
      price: 520000,
      availableSeats: 10
    },
    {
      id: "f6",
      destinationId: "5",
      airline: "JetSMART",
      departureDate: "2026-12-05",
      returnDate: "2026-12-12",
      price: 65000,
      availableSeats: 15
    }
  ],
  hotels: [
    {
      id: "h1",
      destinationId: "1",
      name: "Copacabana Palace",
      stars: 5,
      pricePerNight: 180000,
      availableRooms: 4
    },
    {
      id: "h2",
      destinationId: "1",
      name: "Rio Beach Hotel",
      stars: 4,
      pricePerNight: 85000,
      availableRooms: 8
    },
    {
      id: "h3",
      destinationId: "2",
      name: "Hotel Paris Central",
      stars: 4,
      pricePerNight: 150000,
      availableRooms: 6
    },
    {
      id: "h4",
      destinationId: "3",
      name: "Tokyo Sakura Hotel",
      stars: 5,
      pricePerNight: 130000,
      availableRooms: 5
    },
    {
      id: "h5",
      destinationId: "4",
      name: "Cancun Paradise Resort",
      stars: 5,
      pricePerNight: 210000,
      availableRooms: 3
    },
    {
      id: "h6",
      destinationId: "5",
      name: "Hotel Santiago Centro",
      stars: 3,
      pricePerNight: 55000,
      availableRooms: 10
    }
  ]
};

// Esquema GraphQL
const typeDefs = /* GraphQL */ `
  type Flight {
    id: ID!
    destinationId: ID!
    airline: String!
    departureDate: String!
    returnDate: String!
    price: Float!
    availableSeats: Int!
  }

  type Hotel {
    id: ID!
    destinationId: ID!
    name: String!
    stars: Int!
    pricePerNight: Float!
    availableRooms: Int!
  }

  type TravelOptions {
    flights: [Flight!]!
    hotels: [Hotel!]!
  }

  type Query {
    travelOptions(destinationId: ID!): TravelOptions!
  }
`;

// Resolvers: determinan cómo se obtienen los datos
const resolvers = {
  Query: {
    travelOptions: (_, { destinationId }) => ({
      flights: travelData.flights.filter(
        flight => flight.destinationId === destinationId
      ),
      hotels: travelData.hotels.filter(
        hotel => hotel.destinationId === destinationId
      )
    })
  }
};

// Crear servidor GraphQL
const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers
  })
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log("GraphQL disponible en http://localhost:4000/graphql");
});
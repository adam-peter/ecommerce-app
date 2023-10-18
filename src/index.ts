import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { products } from "./data";

const typeDefs = `#graphql
type Product {
  id: ID!
  name: String!
  description: String!
  quantity: Int!
  price: Float!
  image: String!
  onSale: Boolean!
}

input ProductInput {
  id: ID!
}

type Query {
  products: [Product!]!
  product(input: ProductInput): Product
}
`;

const resolvers = {
  Query: {
    products: () => {
      return products;
    },
    product: (_, { input }) => {
      return products.find((product) => product.id === input.id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

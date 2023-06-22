/**
 * Apollo Client configuration
 */
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
  uri: "https://rickandmortyapi.com/graphql",
});

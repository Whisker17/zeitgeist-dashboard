import { GraphQLClient } from "graphql-request";

const endpoint = "https://processor.zeitgeist.pm/graphql";

const graphQLClient = new GraphQLClient(endpoint);

export default graphQLClient;

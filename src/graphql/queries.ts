import { gql } from "graphql-request";

// Get TVL
export const GET_TVL = gql`
  {
    query_poolsVolume {
      pools(where: { poolStatus_eq: "Active" }) {
        ztgQty
        volume
        poolId
      }
    }
  }
`;

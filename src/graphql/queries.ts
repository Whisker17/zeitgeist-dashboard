import { gql } from "graphql-request";

// Get TVL
export const GET_TVL = gql`
  {
    query_poolsVolume {
      pools {
        poolId
        ztgQty
        poolStatus
      }
    }
  }
`;

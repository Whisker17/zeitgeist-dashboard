import SDK from "@zeitgeistpm/sdk";
import { APPCounts, MarketsTags } from "../models/app";
import { GithubRepo } from "../models/github-repo";
import { NpmDownloadsWithoutLabel } from "../models/npm-downloads";
import { user, UsersWithDiffs } from "../models/users";
import { create, mainnetIndexer } from "@zeitgeistpm/sdk-next";
import Decimal from "decimal.js";
import { Price, TokenInfos } from "../models/overviews";
import { TransactionsWithoutLabel } from "../models/transactions";

const ZEITGEIST_RPC_URL = "wss://ws-internal.zeitgeist.pm";
const ZEITGEIST_GQL_URL = "https://processor.zeitgeist.pm/graphql";
const ZEITGEIST_API_URL = "http://localhost:3000/api/v1";
//const ZEITGEIST_API_URL = "https://api.zeitgeist.pm/api/v1";
// TODO
// Need to integrate these apis to ours
const ZEITGEIST_PRO_URL = "https://pro-api.zeitgeist.pm";
const NPM_REGISTRY_URL = "https://api.npmjs.org/downloads";

// Todo
// Need to implement this api by using our api
const fetchGithubRepo = (
  organization: string,
  name: string
): Promise<GithubRepo> =>
  fetch(`${ZEITGEIST_API_URL}/dev/github-metrics/${organization}/${name}`).then(
    (response: Response) => {
      if (!response.ok) {
        throw new Error(`${response.statusText}${organization}/${name}`);
      }
      return response.json();
    }
  );

const fetchActiveMarketsCount = async (): Promise<number> => {
  const sdk = await create(mainnetIndexer());

  const res = await sdk.context.indexer.marketStatusCount({ status: "Active" });
  return res.markets.length;
};

// TODO
// different from what I got from graphql
const fetchMarketCount = async (): Promise<number> => {
  const sdk = await SDK.initialize(ZEITGEIST_RPC_URL);

  const res = await sdk.models.getMarketCount();
  return res;
};

const fetchTotalLiquidity = async (): Promise<number> => {
  const sdk = await create(mainnetIndexer());

  const pools = await sdk.model.swaps.listPools({});
  const saturatedIndex = await sdk.model.swaps.saturatedPoolsIndex(pools);
  const total =
    pools?.reduce((acc, pool) => {
      const saturatedData = saturatedIndex?.[pool.poolId];
      if (
        saturatedData &&
        saturatedData.market.status === "Active" &&
        saturatedData.liquidity
      ) {
        return acc.plus(saturatedData.liquidity);
      }
      return acc;
    }, new Decimal(0)) ?? new Decimal(0);
  return total.div(10 ** 10).toNumber();
};

const fetchAddressCount = async (date: String): Promise<UsersWithDiffs> => {
  return fetch(`${ZEITGEIST_API_URL}/node/addressLists/2022-05-15/${date}`)
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      return new Array<user>();
    });
};

const fetchTxLists = async (
  date: String
): Promise<TransactionsWithoutLabel> => {
  return fetch(`${ZEITGEIST_API_URL}/node/txLists/2022-05-15/${date}`)
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      return new Array<user>();
    });
};

const fetchTransactionsCount = (): Promise<number> => {
  return fetch(`${ZEITGEIST_API_URL}/node/tx-perblock/total`)
    .then((response: Response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      return 0;
    });
};

const fetchTokenCirculation = (): Promise<number> => {
  return fetch(`${ZEITGEIST_API_URL}/api/v1/token/stats`)
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }
      return response.json();
    })
    .then((response) => {
      return response.circulatingSupply;
    });
};

const fetchTokenInfos = (): Promise<TokenInfos> => {
  return fetch(`${ZEITGEIST_API_URL}/token/stats`)
    .then((response: any) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      return {} as TokenInfos;
    });
};

const fetchAPPCounts = (name: string): Promise<APPCounts> => {
  return fetch(`${ZEITGEIST_PRO_URL}/api/${name}`)
    .then((response: Response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      return 0;
    });
};

const fetchNpmDownloads = (
  name: string,
  date: string
): Promise<NpmDownloadsWithoutLabel> =>
  fetch(`${NPM_REGISTRY_URL}/range/${date}/${name}`)
    .then((response: Response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      return 0;
    });

const fetchTags = async (active: boolean): Promise<MarketsTags> => {
  return fetch(`${ZEITGEIST_API_URL}/app/getTagLists/${active}`)
    .then((response: any) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      return {} as TokenInfos;
    });
};

export const MetricsApi = {
  fetchGithubRepo,
  fetchMarketCount,
  fetchActiveMarketsCount,
  fetchTotalLiquidity,
  fetchAddressCount,
  fetchTxLists,
  fetchTokenCirculation,
  fetchTransactionsCount,
  fetchTokenInfos,
  fetchAPPCounts,
  fetchNpmDownloads,
  fetchTags,
};

import SDK from "@zeitgeistpm/sdk";
import { APPCounts, MarketsTags } from "../models/app";
import { GithubRepo } from "../models/github-repo";
import { NpmDownloadsWithoutLabel } from "../models/npm-downloads";
import { getDiffs, user, UsersWithDiffs } from "../models/users";
import * as d3 from "d3";
import { create, mainnetIndexer } from "@zeitgeistpm/sdk-next";
import Decimal from "decimal.js";
import { gql, GraphQLClient } from "graphql-request";
import { TokenInfos } from "../models/overviews";

const ZEITGEIST_RPC_URL = "wss://ws-internal.zeitgeist.pm";
const ZEITGEIST_GQL_URL = "https://processor.zeitgeist.pm/graphql";
const ZEITGEIST_SUBSCAN_URL = "https://zeitgeist.api.subscan.io";
const ZEITGEIST_API_URL = "https://api.zeitgeist.pm";
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
  fetch(
    `https://api.starknet-db.com/github-metrics/${organization}/${name}`
  ).then((response: Response) => {
    if (!response.ok) {
      throw new Error(`${response.statusText}${organization}/${name}`);
    }
    return response.json();
  });

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
  const user = new Array<user>();
  const active = await fetch(`${ZEITGEIST_SUBSCAN_URL}/api/scan/daily`, {
    method: "POST",
    headers: {
      "x-api-keys": String(process.env.SUBSCAN_API_KEY),
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers":
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Allow-Method, Access-Control-Request-Headers",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    },
    body: JSON.stringify({
      start: "2022-06-15",
      end: `${date}`,
      format: "day",
      category: "ActiveAccount",
    }),
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((response: any) => {
      response.data.list.forEach((value: any) => {
        user.push({
          day: value.time_utc.slice(0, 10),
          active: value.total,
          users: 0,
          total: 0,
        });
      });
      return user;
    })
    .catch((error) => {
      console.log(error);
      return new Array<user>();
    });

  const newAccount = await fetch(`${ZEITGEIST_SUBSCAN_URL}/api/scan/daily`, {
    method: "POST",
    headers: {
      "x-api-keys": String(process.env.SUBSCAN_API_KEY),
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers":
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Allow-Method, Access-Control-Request-Headers",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    },
    body: JSON.stringify({
      start: "2022-06-15",
      end: `${date}`,
      format: "day",
      category: "NewAccount",
    }),
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((response: any) => {
      response.data.list.forEach((value: any, index: number) => {
        active[index].users = value.total;
        if (index == 0) {
          active[index].total = value.total;
        } else {
          active[index].total = active[index - 1].total + value.total;
        }
      });
      return active;
    })
    .then(function (data: user[]) {
      const res: UsersWithDiffs = { total: 0 } as UsersWithDiffs;

      res.diffs = getDiffs(data);
      res.users = data;
      res.total = data[data.length - 1].total!;
      return res;
    })
    .then((res) => {
      return res;
    });
  return newAccount;
};

const fetchTransactionsCount = (): Promise<number> => {
  return fetch(`${ZEITGEIST_SUBSCAN_URL}/api/scan/metadata`, {
    headers: {
      "x-api-keys": String(process.env.SUBSCAN_API_KEY),
      "Access-Control-Allow-Headers":
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Allow-Method, Access-Control-Request-Headers",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    },
  })
    .then((response: Response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((response) => {
      return response.data.count_transfer;
    })
    .catch((error) => {
      console.log(error);
      return 0;
    });
};

const fetchTokenInfos = (): Promise<TokenInfos> => {
  const token: TokenInfos = {} as TokenInfos;
  return fetch(`${ZEITGEIST_SUBSCAN_URL}/api/scan/token`, {
    headers: {
      "x-api-keys": String(process.env.SUBSCAN_API_KEY),
      "Access-Control-Allow-Headers":
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Allow-Method, Access-Control-Request-Headers",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    },
  })
    .then((response: any) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((response) => {
      const ztg = response.data.detail.ZTG;
      token.price = Number(ztg.price);
      token.price_change = Number(ztg.price_change);
      token.total_issuance = Number(ztg.total_issuance) / 10 ** 10;
      token.free_balance = Number(ztg.free_balance) / 10 ** 10;
      token.available_balance = Number(ztg.available_balance) / 10 ** 10;
      token.locked_balance = Number(ztg.locked_balance) / 10 ** 10;
      token.reserved_balance = Number(ztg.reserved_balance) / 10 ** 10;
      token.bonded_locked_balance =
        Number(ztg.bonded_locked_balance) / 10 ** 10;
      token.democracy_locked_balance =
        Number(ztg.democracy_locked_balance) / 10 ** 10;
      token.vesting_balance = Number(ztg.vesting_balance) / 10 ** 10;
      return token;
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
  const tagsQuery = active
    ? gql`
        query totalTagsQuery {
          markets(where: { status_eq: "Active" }) {
            tags
          }
        }
      `
    : gql`
        query totalTagsQuery {
          markets {
            tags
          }
        }
      `;
  const endPoint = new GraphQLClient(ZEITGEIST_GQL_URL);
  const res = await endPoint.request<{
    markets: {
      tags: string[];
    }[];
  }>(tagsQuery);

  let i = 0;
  var tagsMaps = res.markets.reduce((arr, curr) => {
    if (curr.tags === null || curr.tags.length === 0) {
      i++;
    } else {
      curr.tags.forEach((index) => {
        if (!arr.has(index)) {
          arr.set(index, 1);
        } else {
          arr.set(index, arr.get(index) + 1);
        }
      });
    }

    return arr;
  }, new Map());
  tagsMaps.set("Others", i);
  return { metrics: Array.from(tagsMaps, ([tag, count]) => ({ tag, count })) };
};

export const MetricsApi = {
  fetchGithubRepo,
  fetchMarketCount,
  fetchActiveMarketsCount,
  fetchTotalLiquidity,
  fetchAddressCount,
  fetchTransactionsCount,
  fetchTokenInfos,
  fetchAPPCounts,
  fetchNpmDownloads,
  fetchTags,
};

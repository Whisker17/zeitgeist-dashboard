import SDK from "@zeitgeistpm/sdk";
import { APPCounts } from "../models/app";
import { GithubRepo } from "../models/github-repo";
import { NpmDownloadsWithoutLabel } from "../models/npm-downloads";
import { getDiffs, user, UsersWithDiffs } from "../models/users";
import * as d3 from "d3";

const ZEITGEIST_RPC_URL = "wss://ws-internal.zeitgeist.pm";
const ZEITGEIST_GQL_URL = "https://processor.zeitgeist.pm/graphql";
const ZEITGEIST_SUBSCAN_URL = "https://zeitgeist.api.subscan.io/";
const ZEITGEIST_API_URL = "https://api.zeitgeist.pm/";
// TODO
// Need to integrate these apis to ours
const ZEITGEIST_PRO_URL = "https://pro-api.zeitgeist.pm";
const NPM_REGISTRY_URL = "https://api.npmjs.org/downloads/";

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

const fetchMarketCount = async (): Promise<number> => {
  const sdk = await SDK.initialize(ZEITGEIST_RPC_URL);

  const res = await sdk.models.getMarketCount();
  return res;
};

const fetchTVL = async (): Promise<number> => {
  const sdk = await SDK.initialize(ZEITGEIST_RPC_URL);

  const res = await sdk.models.getMarketCount();
  return res;
};

const fetchAddressCount = (): Promise<UsersWithDiffs> => {
  let total = 0;
  const dataSource =
    "https://raw.githubusercontent.com/Whisker17/zeitgeist-dashboard/test/data/charts/Daily-Active-Account.csv";
  return d3
    .csv(dataSource)
    .then(function (data) {
      const res: UsersWithDiffs = {} as UsersWithDiffs;
      const uss: user[] = [];
      data.forEach((index) => {
        if (
          index.Active !== undefined &&
          index.New !== undefined &&
          index.Date !== undefined
        ) {
          uss.push({
            users: Number(index.New),
            day: index.Date,
            active: Number(index.Active),
          });
          total += Number(index.New);
        }
      });
      res.diffs = getDiffs(uss);
      res.users = uss;
      res.total = total;
      return res;
    })
    .then((res) => {
      return res;
    });
};

const fetchTransactionsCount = (): Promise<number> => {
  return fetch(`${ZEITGEIST_SUBSCAN_URL}/api/scan/metadata`, {
    headers: {
      "x-api-keys": String(process.env.SUBSCAN_API_KEY),
    },
  })
    .then((response: Response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return 0;
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

export const MetricsApi = {
  fetchGithubRepo,
  fetchMarketCount,
  fetchTVL,
  fetchAddressCount,
  fetchTransactionsCount,
  fetchAPPCounts,
  fetchNpmDownloads,
};

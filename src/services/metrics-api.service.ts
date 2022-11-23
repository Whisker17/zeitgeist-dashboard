import SDK from "@zeitgeistpm/sdk";
import { NpmDownloadsWithoutLabel } from "../models/npm-downloads";

const ZEITGEIST_RPC_URL = "wss://ws-internal.zeitgeist.pm";
const ZEITGEIST_GQL_URL = "https://processor.zeitgeist.pm/graphql";
const ZEITGEIST_SUBSCAN_URL = "https://zeitgeist.api.subscan.io/";
const ZEITGEIST_API_URL = "https://api.zeitgeist.pm/";
const NPM_REGISTRY_URL = "https://api.npmjs.org/downloads/";

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

const fetchAddressCount = (): Promise<number> =>
  fetch(`${ZEITGEIST_API_URL}/api/v1/token/holders`)
    .then((response: Response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      return 0;
    });

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
  fetchMarketCount,
  fetchTVL,
  fetchAddressCount,
  fetchTransactionsCount,
  fetchNpmDownloads,
};

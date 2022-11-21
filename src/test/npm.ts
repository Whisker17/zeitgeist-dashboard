import { MetricsApi } from "../services/metrics-api.service";
const ZEITGEIST_API_URL = "https://api.zeitgeist.pm/";

// const res = MetricsApi.fetchNpmDownloads("@zeitgeistpm/sdk", "2022-11-15");

const result = new Date(
  Date.now() -
    1 * 864e5 -
    new Date(Date.now() - 1 * 864e5).getTimezoneOffset() * 6e4
)
  .toISOString()
  .split("T")[0];

console.log("Yesterday is ", result);

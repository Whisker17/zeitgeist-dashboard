import { MetricsApi } from "../services/metrics-api.service";

const yesterday = new Date(
  Date.now() -
    1 * 864e5 -
    new Date(Date.now() - 1 * 864e5).getTimezoneOffset() * 6e4
)
  .toISOString()
  .split("T")[0];

const res = MetricsApi.fetchNpmDownloads("@zeitgeistpm/sdk", yesterday);
console.log(res);

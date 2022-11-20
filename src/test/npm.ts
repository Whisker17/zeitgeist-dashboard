import { MetricsApi } from "../services/metrics-api.service";
const ZEITGEIST_API_URL = "https://api.zeitgeist.pm/";

// const res = MetricsApi.fetchNpmDownloads("@zeitgeistpm/sdk", "2022-11-15");

const res = fetch(`${ZEITGEIST_API_URL}/api/v1/token/holders`)
  .then((response: Response) => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  })
  .catch((error) => {
    console.log(error);
    return 0;
  });

// const result = new Date(
//   Date.now() -
//     1 * 864e5 -
//     new Date(Date.now() - 1 * 864e5).getTimezoneOffset() * 6e4
// )
//   .toISOString()
//   .split("T")[0];

console.log("Yesterday is ", res);

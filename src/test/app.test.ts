import { MetricsApi } from "../services/metrics-api.service";

async function main() {
  const res = MetricsApi.fetchAPPCounts("trades");
  console.log(res);
}

main().catch((error) => {
  console.log("ERROR");
  console.log(error);
});

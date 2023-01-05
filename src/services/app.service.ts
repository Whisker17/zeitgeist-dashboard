import { MarketsTags } from "../models/app";

export const toFilterTagsChart = (
  marketsTags: MarketsTags,
  filter: boolean
): MarketsTags => {
  if (filter) {
    marketsTags.metrics.splice(
      marketsTags.metrics.findIndex((item) => item.tag === "Others"),
      1
    );
  }
  return marketsTags;
};

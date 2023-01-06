import { MarketsTags } from "../models/app";

export const toFilterTagsChart = (
  marketsTags: MarketsTags,
  filter: boolean
): MarketsTags => {
  if (filter) {
    const index = marketsTags.metrics.findIndex(
      (item) => item.tag === "Others"
    );
    if (index !== -1) {
      marketsTags.metrics.splice(index, 1);
    }
  }
  return marketsTags;
};

export interface APPCounts {
  message: { count: number; date: string }[];
}

export interface APPCountsChart {
  message: { start: string; end: string; count: number }[];
}

export interface MarketsTags {
  metrics: { tag: string; count: number }[];
}

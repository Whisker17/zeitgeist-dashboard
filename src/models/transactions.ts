export interface TransactionsWithoutLabel {
  txs: { txs: number; day: string }[];
}

export interface Transactions {
  label: string;
  txs: { txs: number; day: string }[];
}

export interface TransactionsChart {
  label: string;
  txs: { start: string; end: string; txs: number }[];
}

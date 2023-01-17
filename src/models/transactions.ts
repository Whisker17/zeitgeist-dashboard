export interface tx {
  txCount: number;
  amount: number;
  day: string;
  totalTxsCount?: number;
  totalTxsAmount?: number;
}

export interface TransactionsWithoutLabel {
  txs: tx[];
  totalTxsCount: number;
  totalTxsAmount: number;
}

export interface Transactions {
  label: string;
  txs: tx[];
}

export interface TransactionsChart {
  label: string;
  txs: { start: string; end: string; txs: number; amount: number }[];
}

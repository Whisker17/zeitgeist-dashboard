import { Transactions, TransactionsChart } from "../models/transactions";

export const toTransactionsChart = (
  transactions: Transactions,
  cumulative?: boolean
): TransactionsChart => {
  transactions.txs.splice(0, transactions.txs.length % 7);
  const weeks: { txCount: number; day: string; amount: number }[][] = [];
  transactions.txs.forEach((tx) => {
    const lastIndex = weeks.length - 1;
    if (lastIndex === -1) {
      weeks[0] = [tx];
    } else if (weeks[lastIndex].length < 7) {
      weeks[lastIndex] = [...weeks[lastIndex], tx];
    } else {
      weeks[lastIndex + 1] = [tx];
    }
  });
  let txs = weeks.map((week) => ({
    start: week[0].day,
    end: week[week.length - 1].day,
    txs: week
      .map((day) => day.txCount)
      .reduce((previousValue, currentValue) => previousValue + currentValue),
    amount: week
      .map((day) => day.amount)
      .reduce((previousValue, currentValue) => previousValue + currentValue),
  }));
  if (cumulative) {
    let count = 0;
    let amount = 0;
    txs = txs.map((item) => {
      count += item.txs;
      amount += item.amount;
      return { ...item, txs: count, amount: amount };
    });
  }
  return {
    label: transactions.label,
    txs,
  };
};

import { APPCounts, APPCountsChart } from "../models/app";
import type { NpmDownloads, NpmDownloadsChart } from "../models/npm-downloads";

export const toNpmDownloadsChart = (
  npmDownloads: NpmDownloads,
  cumulative?: boolean
): NpmDownloadsChart => {
  npmDownloads.downloads.splice(0, npmDownloads.downloads.length % 7);
  const weeks: { downloads: number; day: string }[][] = [];
  npmDownloads.downloads.forEach((download) => {
    const lastIndex = weeks.length - 1;
    if (lastIndex === -1) {
      weeks[0] = [download];
    } else if (weeks[lastIndex].length < 7) {
      weeks[lastIndex] = [...weeks[lastIndex], download];
    } else {
      weeks[lastIndex + 1] = [download];
    }
  });
  let downloads = weeks.map((week) => ({
    start: week[0].day,
    end: week[week.length - 1].day,
    downloads: week
      .map((day) => day.downloads)
      .reduce((previousValue, currentValue) => previousValue + currentValue),
  }));
  if (cumulative) {
    let count = 0;
    downloads = downloads.map((item) => {
      count += item.downloads;
      return { ...item, downloads: count };
    });
  }
  return {
    package: npmDownloads.package,
    label: npmDownloads.label,
    downloads,
  };
};

export const toAPPCountsWeeklyChart = (
  appCounts: APPCounts,
  cumulative?: boolean
): APPCountsChart => {
  appCounts.message.splice(0, appCounts.message.length % 7);
  const weeks: { count: number; date: string }[][] = [];
  appCounts.message.forEach((count) => {
    const lastIndex = weeks.length - 1;
    if (lastIndex === -1) {
      weeks[0] = [count];
    } else if (weeks[lastIndex].length < 7) {
      weeks[lastIndex] = [...weeks[lastIndex], count];
    } else {
      weeks[lastIndex + 1] = [count];
    }
  });
  let message = weeks.map((week) => ({
    start: week[0].date,
    end: week[week.length - 1].date,
    count: week
      .map((day) => day.count)
      .reduce((previousValue, currentValue) => previousValue + currentValue),
  }));
  if (cumulative) {
    let ct = 0;
    message = message.map((item) => {
      ct += item.count;
      return { ...item, count: ct };
    });
  }
  return {
    message,
  };
};

export const toAPPCountsDailyChart = (
  appCounts: APPCounts,
  cumulative?: boolean
): APPCountsChart => {
  let message = appCounts.message.map((day) => ({
    start: appCounts.message[0].date,
    end: day.date,
    count: day.count,
  }));
  if (cumulative) {
    let ct = 0;
    message = message.map((item) => {
      ct += item.count;
      return { ...item, count: ct };
    });
  }
  return {
    message,
  };
};

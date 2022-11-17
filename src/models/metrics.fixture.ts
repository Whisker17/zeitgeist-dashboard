import type { GithubRepo } from "./github-repo";
import type { NpmDownloads, NpmDownloadsChart } from "./npm-downloads";

const zeitgeistSDK = "zeitgeistpm/sdk";

export const aGitHubRepo = (): GithubRepo => ({
  id: "418545583",
  name: "starknet.js",
  fullName: "0xs34n/starknet.js",
  url: "https://github.com/0xs34n/starknet.js",
  description: "JavaScript library for StarkNet",
  homepage: "https://www.starknetjs.com",
  openIssuesCount: 16,
  forksCount: 39,
  stargazersCount: 152,
  subscribersCount: 11,
});

export const aNpmDownloads = (): NpmDownloads => ({
  start: "2022-11-02",
  end: "2022-11-15",
  package: "@zeitgeistpm/sdk",
  label: zeitgeistSDK,
  downloads: [
    {
      downloads: 137,
      day: "2022-11-02",
    },
    {
      downloads: 40,
      day: "2022-11-03",
    },
    {
      downloads: 74,
      day: "2022-11-04",
    },
    {
      downloads: 59,
      day: "2022-11-05",
    },
    {
      downloads: 113,
      day: "2022-11-06",
    },
    {
      downloads: 226,
      day: "2022-11-07",
    },
    {
      downloads: 162,
      day: "2022-11-08",
    },
    {
      downloads: 33,
      day: "2022-11-09",
    },
    {
      downloads: 246,
      day: "2022-11-10",
    },
    {
      downloads: 79,
      day: "2022-11-11",
    },
    {
      downloads: 15,
      day: "2022-11-12",
    },
    {
      downloads: 26,
      day: "2022-11-13",
    },
    {
      downloads: 211,
      day: "2022-11-14",
    },
    {
      downloads: 188,
      day: "2022-11-15",
    },
  ],
});

export const aNpmDownloadsChart = (): NpmDownloadsChart => ({
  package: "@zeitgeistpm/sdk",
  label: zeitgeistSDK,
  downloads: [
    {
      start: "2022-11-02",
      end: "2022-11-08",
      downloads: 811,
    },
    {
      start: "2022-11-09",
      end: "2022-11-15",
      downloads: 798,
    },
  ],
});

export const aCumulativeNpmDownloadsChart = (): NpmDownloadsChart => ({
  package: "@zeitgeistpm/sdk",
  label: zeitgeistSDK,
  downloads: [
    {
      start: "2022-11-02",
      end: "2022-11-08",
      downloads: 811,
    },
    {
      start: "2022-11-09",
      end: "2022-11-15",
      downloads: 1609,
    },
  ],
});

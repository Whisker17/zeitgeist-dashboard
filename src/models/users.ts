import { diffs } from "./utils";

export interface user {
  active: number;
  users: number;
  day: string;
}

export interface UsersWithoutLabel {
  users: user[];
}

export interface Users {
  label: string;
  users: user[];
}

export interface UsersChart {
  label: string;
  users: { active: number; start: string; end: string; users: number }[];
}

export interface UsersWithDiffs {
  users: user[];
  diffs: { diffsForTotal: diffs; diffsForActive: diffs };
}

export function getDiffs(data: user[]) {
  let diffsForTotal: diffs = <diffs>{};
  let diffsForActive: diffs = <diffs>{};
  switch (true) {
    case data.length < 7:
      diffsForTotal.day =
        data[data.length - 1].users - data[data.length - 2].users;
      diffsForTotal.week =
        diffsForTotal.month =
        diffsForTotal.ever =
          data[data.length - 1].users - data[0].users;

      diffsForActive.day =
        data[data.length - 1].active - data[data.length - 2].active;
      diffsForActive.week =
        diffsForActive.month =
        diffsForActive.ever =
          data[data.length - 1].active - data[0].active;
      break;
    case data.length >= 7 && data.length < 30:
      diffsForTotal.day =
        data[data.length - 1].users - data[data.length - 2].users;
      diffsForTotal.week =
        data[data.length - 1].users - data[data.length - 8].users;
      diffsForTotal.month = diffsForTotal.ever =
        data[data.length - 1].users - data[0].users;

      diffsForActive.day =
        data[data.length - 1].active - data[data.length - 2].active;
      diffsForActive.week =
        data[data.length - 1].active - data[data.length - 8].active;
      diffsForActive.month = diffsForActive.ever =
        data[data.length - 1].active - data[0].active;
      break;
    case data.length >= 30:
      diffsForTotal.day =
        data[data.length - 1].users - data[data.length - 2].users;
      diffsForTotal.week =
        data[data.length - 1].users - data[data.length - 8].users;
      diffsForTotal.month =
        data[data.length - 1].users - data[data.length - 31].users;
      diffsForTotal.ever = data[data.length - 1].users - data[0].users;

      diffsForActive.day =
        data[data.length - 1].active - data[data.length - 2].active;
      diffsForActive.week =
        data[data.length - 1].active - data[data.length - 8].active;
      diffsForActive.month =
        data[data.length - 1].active - data[data.length - 31].active;
      diffsForActive.ever = data[data.length - 1].active - data[0].active;
      break;
  }
  return { diffsForTotal, diffsForActive };
}

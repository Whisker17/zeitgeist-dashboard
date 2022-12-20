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
  total: number;
  users: user[];
  diffs: { diffsForTotal: diffs; diffsForActive: diffs };
}

// TODO
// Need to refactor
export function getDiffs(data: user[]) {
  let diffsForTotal: diffs = <diffs>{};
  let diffsForActive: diffs = <diffs>{};

  diffsForTotal.day = data[data.length - 1].users;

  let total = 0;

  if (data.length < 7) {
    data.forEach((value) => {
      total += value.users;
    });

    diffsForTotal.week = diffsForTotal.month = diffsForTotal.ever = total;
  } else if (data.length >= 7 && data.length < 30) {
    data
      .slice()
      .reverse()
      .forEach((value, index) => {
        total += value.users;
        if (index === 6) {
          diffsForTotal.week = total;
        }
      });
    diffsForTotal.month = diffsForTotal.ever = total;
  } else if (data.length >= 30) {
    data
      .slice()
      .reverse()
      .forEach((value, index) => {
        total += value.users;
        if (index === 6) {
          diffsForTotal.week = total;
        } else if (index === 29) {
          diffsForTotal.month = total;
        }
      });
    diffsForTotal.ever = total;
  }

  switch (true) {
    case data.length < 7:
      diffsForActive.day =
        data[data.length - 1].active - data[data.length - 2].active;
      diffsForActive.week =
        diffsForActive.month =
        diffsForActive.ever =
          data[data.length - 1].active - data[0].active;
      break;
    case data.length >= 7 && data.length < 30:
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

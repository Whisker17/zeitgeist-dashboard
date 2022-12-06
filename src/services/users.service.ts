import { active } from "d3";
import { Users, UsersChart } from "../models/users";

export const toUsersChart = (
  users: Users,
  cumulative?: boolean
): UsersChart => {
  users.users.splice(0, users.users.length % 7);
  const weeks: { active: number; users: number; day: string }[][] = [];
  users.users.forEach((user) => {
    const lastIndex = weeks.length - 1;
    if (lastIndex === -1) {
      weeks[0] = [user];
    } else if (weeks[lastIndex].length < 7) {
      weeks[lastIndex] = [...weeks[lastIndex], user];
    } else {
      weeks[lastIndex + 1] = [user];
    }
  });
  let uss = weeks.map((week) => ({
    start: week[0].day,
    end: week[week.length - 1].day,
    users: week
      .map((day) => day.users)
      .reduce((previousValue, currentValue) => previousValue + currentValue),
    active: week
      .map((day) => day.active)
      .reduce((previousValue, currentValue) => previousValue + currentValue),
  }));
  if (cumulative) {
    let count = 0;
    let actives = 0;
    uss = uss.map((item) => {
      count += item.users;
      actives += item.active;
      return { ...item, users: count, active: actives };
    });
  }
  return {
    label: users.label,
    users: uss,
  };
};

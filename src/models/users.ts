export interface UsersWithoutLabel {
  users: { active: number; users: number; day: string }[];
}

export interface Users {
  label: string;
  users: { active: number; users: number; day: string }[];
}

export interface UsersChart {
  label: string;
  users: { active: number; start: string; end: string; users: number }[];
}

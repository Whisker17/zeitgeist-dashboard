export interface Tag {
  key?: string;
  value: string;
  label: string;
  icon: string;
}

export enum MetricsCategory {
  OVERVIEWS = "overviews",
  USERS = "users",
  TRANSACTIONS = "transactions",
  APPLICATIONS = "applications",
  DEVS = "devs",
}

export const allMetricsTags: Tag[] = [
  {
    value: MetricsCategory.OVERVIEWS,
    label: "Overviews",
    icon: "home",
  },
  {
    value: MetricsCategory.USERS,
    label: "Users",
    icon: "people-group",
  },
  {
    value: MetricsCategory.TRANSACTIONS,
    label: "Transactions",
    icon: "pen",
  },
  {
    value: MetricsCategory.APPLICATIONS,
    label: "Applications",
    icon: "gamepad",
  },
  {
    value: MetricsCategory.DEVS,
    label: "Devs",
    icon: "screwdriver-wrench",
  },
];

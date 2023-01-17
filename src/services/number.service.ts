export const formatCompactNumber = (value: number | string): string => {
  if (typeof value === "string") {
    if (value === "Soon" || value.charAt(value.length - 1) == "%") return value;
  }

  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(Number(value));
};

export const getYesterday = (): string => {
  return new Date(
    Date.now() -
      1 * 864e5 -
      new Date(Date.now() - 1 * 864e5).getTimezoneOffset() * 6e4
  )
    .toISOString()
    .split("T")[0];
};

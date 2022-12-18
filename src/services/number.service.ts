export const formatCompactNumber = (value: number | string): string => {
  if (value === "Soon") return value;
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(Number(value));
};

export const formatCompactNumber = (value: number | string): string => {
  if (value === "Soon") return value;
  if (typeof value === "string") return parseFloat(value).toFixed(4);
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
};

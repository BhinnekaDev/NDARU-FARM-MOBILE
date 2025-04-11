export const addressFormatter = (value: string): string => {
  return value.replace(/[^A-Za-z0-9\s,.\-\/#]/g, "").slice(0, 100);
};

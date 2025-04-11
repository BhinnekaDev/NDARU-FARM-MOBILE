export const numberFormatter = (value: string, maxLength: number): string => {
  return value.replace(/[^0-9]/g, "").slice(0, maxLength);
};

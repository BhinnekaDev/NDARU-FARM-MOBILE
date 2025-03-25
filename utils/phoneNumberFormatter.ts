export const formatPhoneNumber = (input: string): string => {
  if (input === "+") return "+62";

  let formatted = input.replace(/[^\d+]/g, "");

  if (formatted.startsWith("+")) {
    formatted = "+" + formatted.slice(1).replace(/\D/g, "");
    if (!formatted.startsWith("+62")) return "+62";
  } else {
    formatted = formatted.replace(/\D/g, "");
    if (!formatted.startsWith("0")) return "";
  }

  const maxLength = formatted.startsWith("+62") ? 14 : 12;
  formatted = formatted.length > maxLength ? formatted.slice(0, maxLength) : formatted;

  if (formatted.startsWith("+62")) {
    return formatted.replace(/(\+62)(\d{1,3})?(\d{1,4})?(\d{1,4})?/, (_match, p1, p2, p3, p4) => {
      return [p1, p2, p3, p4].filter(Boolean).join(" ");
    });
  }

  if (formatted.startsWith("0")) {
    return formatted.replace(/(\d{4})(\d{1,4})?(\d{1,4})?/, (_match, p1, p2, p3) => {
      return [p1, p2, p3].filter(Boolean).join(" ");
    });
  }

  return formatted;
};

export const ACCENTS = {
  blue: "#0047FF",
  orange: "#FF5C00",
  yellow: "#FFD600",
  pink: "#FF66D8",
};

// readable text color on a given accent bg
export const onAccentText = (hex) => {
  const light = ["#FFD600", "#FF66D8"];
  return light.includes(hex?.toUpperCase()) ? "#1A1A1A" : "#F4F1EA";
};

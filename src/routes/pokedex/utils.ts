// Predefined color name-to-RGB mapping
const colorNames: Record<string, number[]> = {
  black: [0, 0, 0],
  white: [255, 255, 255],
  red: [255, 0, 0],
  green: [0, 128, 0],
  blue: [0, 0, 255],
  yellow: [255, 255, 0],
  cyan: [0, 255, 255],
  magenta: [255, 0, 255],
  gray: [128, 128, 128],
  orange: [255, 165, 0],
  purple: [128, 0, 128],
  pink: [255, 192, 203],
  brown: [165, 42, 42]
};

export function getTextColor(backgroundColor: string) {
  // Convert named color to RGB
  let rgb: number[];
  if (colorNames[backgroundColor.toLowerCase()]) {
    rgb = colorNames[backgroundColor.toLowerCase()];
  } else {
    throw new Error(`Unknown color name: ${backgroundColor}`);
  }

  // Normalize RGB values
  const [rNorm, gNorm, bNorm] = rgb.map((v) => v / 255);

  // Calculate luminance
  const luminance = 0.2126 * rNorm + 0.7152 * gNorm + 0.0722 * bNorm;

  // Return text color based on luminance
  return luminance > 0.5 ? 'black' : 'white';
}

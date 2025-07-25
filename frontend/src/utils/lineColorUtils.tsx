export const LRT_LINE_COLORS: Record<string, string> = {
  Red: '#FF0000',
  Green: '#00FF00',
  Blue: '#0000FF',
};

export const LRT_DEFAULT_COLOR = '#999999';

// แปลง HEX → RGBA
export function hexToRgba(hex: string, opacity: number): string {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

import { Feature, Geometry } from 'geojson';
import { PathOptions } from 'leaflet';

// สร้างสีจากชื่อ (display_name)
function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return `#${'00000'.substring(0, 6 - c.length) + c}`;
}

// ฟังก์ชันสร้างสี fill ที่อ่อนลงจาก stroke
function lightenColor(hexColor: string, percent: number): string {
  const num = parseInt(hexColor.replace('#', ''), 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;

  r = Math.min(255, Math.floor(r + (255 - r) * percent));
  g = Math.min(255, Math.floor(g + (255 - g) * percent));
  b = Math.min(255, Math.floor(b + (255 - b) * percent));

  return `rgb(${r}, ${g}, ${b})`;
}

// ฟังก์ชันคืน style สำหรับแต่ละ feature
function getStyle(feature?: Feature<Geometry, any>): PathOptions {
  if (!feature) return {};
  
  const properties = feature.properties as { display_name?: string } | undefined;
  const displayName = properties?.display_name || 'unknown';
  const strokeColor = stringToColor(displayName);
  const fillColor = lightenColor(strokeColor, 0.6);

  return {
    color: strokeColor,
    fillColor: fillColor,
    weight: 3,
    opacity: 1,
    fillOpacity: 0.6,
  };
}

export const boundmunStyles = {
  getStyle,
};
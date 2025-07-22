  import { Feature, Geometry } from 'geojson';
  import { PathOptions } from 'leaflet';
  import { stringToColor, lightenColor } from '@/utils/labelColorUtils';

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
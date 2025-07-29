import { Feature, Geometry } from 'geojson';
import { PathOptions } from 'leaflet';
import { stringToColor, lightenColor } from '@/utils/labelColorUtils';

function getStyle(feature?: Feature<Geometry, any>): PathOptions {
  if (!feature) return {};
  
  const properties = feature.properties as { display_data?: string } | undefined;
  const displayData = properties?.display_data || 'unknown';
  const strokeColor = stringToColor(displayData);
  const fillColor = lightenColor(strokeColor, 0.6);

  return {
    color: strokeColor,
    fillColor: fillColor,
    weight: 3,
    opacity: 1,
    fillOpacity: 0.6,
  };
}

export const ruralargiStyles = {
  getStyle,
};
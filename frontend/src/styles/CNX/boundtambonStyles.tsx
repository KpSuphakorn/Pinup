import { Feature, Geometry } from 'geojson';
import { PathOptions } from 'leaflet';
import { stringToColor, lightenColor } from '@/utils/labelColorUtils';

function getStyle(feature?: Feature<Geometry, any>): PathOptions {
  if (!feature) return {};

  const properties = feature.properties as { tambon_th?: string } | undefined;
  const tambonName = properties?.tambon_th || 'unknown';
  const strokeColor = stringToColor(tambonName);
  const fillColor = lightenColor(strokeColor, 0.6);

  return { 
    color: strokeColor,
    fillColor: fillColor,
    weight: 3,
    opacity: 1,
    fillOpacity: 0.6,
  };
}

export const boundtambonStyles = {
  getStyle,
};
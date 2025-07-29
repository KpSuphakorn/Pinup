import { Feature, Geometry } from 'geojson';
import { PathOptions } from 'leaflet';

function getStyle(feature?: Feature<Geometry, any>): PathOptions {
  if (!feature) return {};

  const strokeColor = '#008c1eff'
  const fillColor = '#ccefd3ff';

  return {
    color: strokeColor,
    fillColor: fillColor,
    weight: 3,
    opacity: 1,
    fillOpacity: 0.6,
  };
}

export const recreatenvStyles = {
  getStyle,
};
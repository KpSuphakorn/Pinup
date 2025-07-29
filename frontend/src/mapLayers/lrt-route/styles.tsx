import { Feature, Geometry } from 'geojson';
import { PathOptions } from 'leaflet';
import { LRT_LINE_COLORS, LRT_DEFAULT_COLOR } from '@/utils/lineColorUtils';

function getStyle(feature?: Feature<Geometry, any>): PathOptions {
  if (!feature) return {};

  const lineKey = feature?.properties?.line || '';
  const color = LRT_LINE_COLORS[lineKey] || LRT_DEFAULT_COLOR;

  return {
    color,
    weight: 5,
    opacity: 1.0,
  };
}

export const LRTrouteStyles = {
  getStyle,
  colorMap: LRT_LINE_COLORS,
  defaultColor: LRT_DEFAULT_COLOR,
};

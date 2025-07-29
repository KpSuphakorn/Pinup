import { Feature, Geometry } from 'geojson';
import { PathOptions } from 'leaflet';

const BUS_LINE_COLOR = '#ff6200ff';

function getStyle(feature?: Feature<Geometry, any>): PathOptions {
  if (!feature) return {};

  return {
    color: BUS_LINE_COLOR,
    weight: 5,
    opacity: 1.0,
    dashArray: feature.geometry.type === 'LineString' ? '' : '6,4',
  };
}

export const busrouteStyles = {
  getStyle,
  color: BUS_LINE_COLOR,
};
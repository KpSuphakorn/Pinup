import { Feature, Geometry } from 'geojson';
import { PathOptions } from 'leaflet';

function getStyle(feature?: Feature<Geometry, any>): PathOptions {
  if (!feature) return {};

  const colors = '#90bddfff';

  return {
    color: colors,
    fillColor: colors,
    weight: 2,
    opacity: 1,
    fillOpacity: 0.5,
  };
}

export const lowdenseresareaStyles = {
  getStyle,
};
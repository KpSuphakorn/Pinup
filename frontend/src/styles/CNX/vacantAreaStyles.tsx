import { Feature, Geometry } from 'geojson';
import { PathOptions } from 'leaflet';

function getStyle(feature?: Feature<Geometry, any>): PathOptions {
  if (!feature) return {};


  return {
    color: "#FF0000",
    fillColor: "#FF0000",
    weight: 3,
    opacity: 1,
    fillOpacity: 0.6,
  };
}

export const vacantAreaStyles = {
  getStyle,
};
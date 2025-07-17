import { Feature, Geometry } from 'geojson';
import { PathOptions } from 'leaflet';
import { stringToColor, lightenColor } from '@/utils/labelColorUtils';
import { BoundTambonData } from '@/types';

function getStyle(feature?: Feature<Geometry, any>): PathOptions {
  if (!feature) return {};

  // ใช้ค่าง่ายๆ ก่อน
  return {
    color: '#3388ff',
    fillColor: '#3388ff',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.3,
  };
}

export const boundtambonStyles = {
  getStyle,
};
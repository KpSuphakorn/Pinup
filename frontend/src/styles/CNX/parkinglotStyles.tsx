import { Feature, Geometry } from 'geojson';
import { PathOptions } from 'leaflet';

// ฟังก์ชันเลือกสีตาม type
function getColorByType(type: string): { stroke: string; fill: string } {
  switch (type) {
    case 'ลานจอดรถ':
      return { stroke: '#1E90FF', fill: '#1E90FF66' }; // น้ำเงิน + โปร่ง
    case 'อาคารจอดรถ':
      return { stroke: '#FFA500', fill: '#FFA50066' }; // ส้ม + โปร่ง
    default:
      return { stroke: '#888888', fill: '#CCCCCC66' }; // สีเทา default
  }
}

// สร้าง style สำหรับพื้นที่จอดรถ
function getStyle(feature?: Feature<Geometry, any>): PathOptions {
  if (!feature) return {};

  const properties = feature.properties as {
    type?: string;
  } | undefined;

  const type = properties?.type || 'unknown';
  const colors = getColorByType(type);

  return {
    color: colors.stroke,
    fillColor: colors.fill,
    weight: 2,
    opacity: 1,
    fillOpacity: 0.5,
  };
}

export const parkinglotStyles = {
  getStyle,
};
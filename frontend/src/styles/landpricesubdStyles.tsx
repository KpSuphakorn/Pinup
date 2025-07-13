import { LandPriceSubdRange, LandPriceSubdRangeData } from '@/types';
import { Feature, Geometry } from 'geojson';

// สีสำหรับแต่ละช่วงราคาที่ดิน (10 ช่วง - จากสีอ่อนมากไปสีเข้มมาก)
const LANDPRICE_COLORS = [
    { fill: '#FFF3E0', stroke: '#FF9800' },  // ช่วง 1 (มากที่สุด) - สีส้มอ่อนมาก
    { fill: '#FFE0B2', stroke: '#FF9800' },  // ช่วง 2
    { fill: '#FFCC80', stroke: '#FF9800' },  // ช่วง 3
    { fill: '#FFB74D', stroke: '#F57C00' },  // ช่วง 4
    { fill: '#FFA726', stroke: '#F57C00' },  // ช่วง 5
    { fill: '#FF9800', stroke: '#E65100' },  // ช่วง 6
    { fill: '#FB8C00', stroke: '#E65100' },  // ช่วง 7
    { fill: '#F57C00', stroke: '#BF360C' },  // ช่วง 8
    { fill: '#EF6C00', stroke: '#BF360C' },  // ช่วง 9
    { fill: '#E65100', stroke: '#BF360C' },  // ช่วง 10 (น้อยที่สุด) - สีส้มเข้มมาก
];

const DEFAULT_COLOR = { fill: '#F5F5F5', stroke: '#9E9E9E' };

// ฟังก์ชันสำหรับหาช่วงราคาที่ดินที่ถูกต้อง
function getLandPriceRangeIndex(landPrice: number, ranges: LandPriceSubdRange[]): number {
  if (!ranges || ranges.length === 0) return -1;
  
  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i];
    if (landPrice >= range.min && landPrice <= range.max) {
      return i;
    }
  }
  
  // หากไม่พบช่วงที่ตรงกัน ให้ใช้ช่วงที่ใกล้เคียงที่สุด
  if (landPrice < ranges[0].min) return 0;
  if (landPrice > ranges[ranges.length - 1].max) return ranges.length - 1;
  
  return -1;
}

// ฟังก์ชันสำหรับสร้าง style ตามราคาที่ดิน
function getStyle(feature?: Feature, rangeData?: LandPriceSubdRangeData) {
  const landPrice = feature?.properties?.land_price || 0;
  console.log('rangeData:', rangeData);
//   console.log('land_price:', feature?.properties?.land_price);
  console.log('ranges in LandPriceSubd getStyle:', rangeData?.ranges);
  
  if (!rangeData || !rangeData.ranges || rangeData.ranges.length === 0) {
    return {
      color: DEFAULT_COLOR.stroke,
      fillColor: DEFAULT_COLOR.fill,
      weight: 2,
      fillOpacity: 0.7,
      opacity: 1,
      dashArray: undefined
    };
  }
  
  const rangeIndex = getLandPriceRangeIndex(Number(landPrice), rangeData.ranges);
  const colors = rangeIndex >= 0 && rangeIndex < LANDPRICE_COLORS.length 
    ? LANDPRICE_COLORS[rangeIndex] 
    : DEFAULT_COLOR;
  
  return {
    color: colors.stroke,
    fillColor: colors.fill,
    weight: 2,
    fillOpacity: 0.7,
    opacity: 1,
    dashArray: undefined
  };
}

// ฟังก์ชันสำหรับสร้าง style function ที่ใช้กับ GeoJSON
function createStyleFunction(rangeData: LandPriceSubdRangeData) {
  return (feature?: Feature) => getStyle(feature, rangeData);
}

// ฟังก์ชันสำหรับสร้าง tooltip หรือ popup - แก้ไขให้ดูแลเรื่อง label
function getLandPriceInfo(feature?: Feature) {
  const properties = feature?.properties || {};
  const landPrice = properties.land_price || 0;
  
  // ตรวจสอบ label จากหลายฟิลด์ที่เป็นไปได้
  const label = properties.label || properties.name || properties.district || properties.subdistrict || '';
  const province = properties.province || '';
  const district = properties.district || '';
  const subdistrict = properties.subdistrict || '';
  
  // สร้าง full address โดยตรวจสอบว่ามีข้อมูลหรือไม่
  const addressParts = [subdistrict, district, province].filter(part => part && part.trim() !== '');
  const fullAddress = addressParts.length > 0 ? addressParts.join(', ') : 'ไม่ระบุที่อยู่';
  
  return {
    landPrice: Number(landPrice),
    formattedLandPrice: Number(landPrice).toLocaleString('th-TH'),
    label: label.trim(),
    province: province.trim(),
    district: district.trim(),
    subdistrict: subdistrict.trim(),
    fullAddress
  };
}

// ฟังก์ชันสำหรับสร้าง legend items
function getLegendItems(rangeData: LandPriceSubdRangeData) {
  if (!rangeData || !rangeData.ranges) {
    return [];
  }
  
  // เรียงลำดับจากมากไปน้อย (สีอ่อนไปสีเข้ม)
  return rangeData.ranges.map((range, index) => ({
    range: range.range,
    label: range.label,
    color: LANDPRICE_COLORS[index]?.fill || DEFAULT_COLOR.fill,
    stroke: LANDPRICE_COLORS[index]?.stroke || DEFAULT_COLOR.stroke,
    min: range.min,
    max: range.max
  }));
}

export const landpricesubdStyles = {
  getStyle,
  getLandPriceInfo,
  getLegendItems,
  createStyleFunction,
  LANDPRICE_COLORS,
  DEFAULT_COLOR
};
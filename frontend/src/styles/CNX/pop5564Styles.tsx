import { Pop5564Range, Pop5564RangeData } from '@/types';
import { Feature, Geometry } from 'geojson';

// สีสำหรับแต่ละช่วง (10 ช่วง - จากสีอ่อนมากไปสีเข้มมาก)
const CNX_POP5564_COLORS = [
    { fill: '#F3E5F5', stroke: '#8E24AA' },  // ช่วง 1 (มากที่สุด) - สีม่วงอ่อนมาก
    { fill: '#E1BEE7', stroke: '#8E24AA' },  // ช่วง 2
    { fill: '#CE93D8', stroke: '#8E24AA' },  // ช่วง 3
    { fill: '#BA68C8', stroke: '#7B1FA2' },  // ช่วง 4
    { fill: '#AB47BC', stroke: '#7B1FA2' },  // ช่วง 5
    { fill: '#9C27B0', stroke: '#6A1B9A' },  // ช่วง 6
    { fill: '#8E24AA', stroke: '#6A1B9A' },  // ช่วง 7
    { fill: '#7B1FA2', stroke: '#4A148C' },  // ช่วง 8
    { fill: '#6A1B9A', stroke: '#4A148C' },  // ช่วง 9
    { fill: '#4A148C', stroke: '#311B92' },  // ช่วง 10 (น้อยที่สุด) - สีม่วงเข้มมาก
];

const DEFAULT_COLOR = { fill: '#F5F5F5', stroke: '#9E9E9E' };

// ฟังก์ชันสำหรับหาช่วงประชากรที่ถูกต้อง
function getPop5564RangeIndex(population: number, ranges: Pop5564Range[]): number {
  if (!ranges || ranges.length === 0) return -1;
  
  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i];
    if (population >= range.min && population <= range.max) {
      return i;
    }
  }
  
  // หากไม่พบช่วงที่ตรงกัน ให้ใช้ช่วงที่ใกล้เคียงที่สุด
  if (population < ranges[0].min) return 0;
  if (population > ranges[ranges.length - 1].max) return ranges.length - 1;
  
  return -1;
}

// ฟังก์ชันสำหรับสร้าง style ตามจำนวนประชากร
function getStyle(feature?: Feature, rangeData?: Pop5564RangeData) {
  const population = feature?.properties?.population || 0;
  console.log('ranges in CNX Population getStyle:', rangeData?.ranges);
  
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
  
  const rangeIndex = getPop5564RangeIndex(Number(population), rangeData.ranges);
  const colors = rangeIndex >= 0 && rangeIndex < CNX_POP5564_COLORS.length 
    ? CNX_POP5564_COLORS[rangeIndex] 
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
function createStyleFunction(rangeData: Pop5564RangeData) {
  return (feature?: Feature) => getStyle(feature, rangeData);
}

// ฟังก์ชันสำหรับสร้าง legend items
function getLegendItems(rangeData: Pop5564RangeData) {
  if (!rangeData || !rangeData.ranges) {
    return [];
  }
  
  // เรียงลำดับจากมากไปน้อย (สีอ่อนไปสีเข้ม)
  return rangeData.ranges.map((range, index) => ({
    range: range.range,
    label: range.label,
    color: CNX_POP5564_COLORS[index]?.fill || DEFAULT_COLOR.fill,
    stroke: CNX_POP5564_COLORS[index]?.stroke || DEFAULT_COLOR.stroke,
    min: range.min,
    max: range.max
  }));
}

export const pop5564Styles = {
  getStyle,
  getLegendItems,
  createStyleFunction,
  CNX_POP5564_COLORS,
  DEFAULT_COLOR
};
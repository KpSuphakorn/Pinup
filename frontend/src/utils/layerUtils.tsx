export type LayerOption = 'none' | 'osm' | 'zoning' | 'population' | 'landprice';

export interface LayerOptionData {
  value: LayerOption;
  label: string;
  description: string;
}

export const layerOptions: LayerOptionData[] = [
  { value: 'none', label: 'ไม่แสดงข้อมูล', description: 'แสดงแค่แผนที่เปล่า' },
  { value: 'osm', label: 'ข้อมูล OSM', description: 'แสดงข้อมูลจาก OpenStreetMap' },
  { value: 'zoning', label: 'ข้อมูล Zoning', description: 'แสดงข้อมูลการแบ่งเขต' },
  { value: 'population', label: 'ข้อมูลประชากร', description: 'แสดงข้อมูลความหนาแน่นประชากร' },
  { value: 'landprice', label: 'ข้อมูลราคาที่ดิน', description: 'แสดงข้อมูลราคาที่ดิน' }
];

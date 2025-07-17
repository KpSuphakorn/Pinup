export type LayerOption = 'none' | 'osm' | 'zoning' | 'population' | 'landprice' | 'boundmun';

export interface LayerOptionData {
  value: LayerOption;
  label: string;
  description: string;
  center: 'bangkok' | 'chiangmai'; // เพิ่มข้อมูลตำแหน่ง center สำหรับแต่ละ layer ที่นี่
}

export const layerOptions: LayerOptionData[] = [
  { value: 'none', label: 'ไม่แสดงข้อมูล', description: 'แสดงแค่แผนที่เปล่า', center: 'bangkok' },
  { value: 'osm', label: 'ข้อมูล OSM', description: 'แสดงข้อมูลจาก OpenStreetMap', center: 'bangkok' },
  { value: 'zoning', label: 'ข้อมูล Zoning', description: 'แสดงข้อมูลการแบ่งเขต', center: 'bangkok' },
  { value: 'population', label: 'ข้อมูลประชากร', description: 'แสดงข้อมูลความหนาแน่นประชากร', center: 'bangkok' },
  { value: 'landprice', label: 'ข้อมูลราคาที่ดิน', description: 'แสดงข้อมูลราคาที่ดิน', center: 'bangkok' },
  { value: 'boundmun', label: 'ขอบเขตเทศบาล', description: 'แสดงขอบเขตเขตเทศบาล', center: 'chiangmai' },
];

// กำหนด global layers ที่ไม่ติดพื้นที่
export const globalLayers: LayerOption[] = ['osm', 'zoning'];

// พิกัด center สำหรับแต่ละพื้นที่
export const centerCoordinates: Record<'bangkok' | 'chiangmai', [number, number]> = {
  bangkok: [13.7563, 100.5018],
  chiangmai: [18.7904, 98.9847],
};

// Utility: หาค่า center ตาม layer ที่เลือก
export function getMapCenterByLayers(layers: LayerOption[]): [number, number] {
  // ตัด global layers ออก
  const areaLayers = layers.filter(layer => !globalLayers.includes(layer));

  if (areaLayers.length === 0) {
    // ถ้าไม่มีพื้นที่จริงๆ เลือก default เป็น กรุงเทพ
    return centerCoordinates.bangkok;
  }

  // หาค่า center ของพื้นที่ที่เลือก (ไม่รวม global layers)
  const centers = [...new Set(
    areaLayers.map(layer => {
      const match = layerOptions.find(opt => opt.value === layer);
      return match?.center || 'bangkok';
    })
  )];

  // เอา center แรก (ถ้ามีหลายค่า อาจต้องเพิ่ม logic ภายหลัง)
  const center = centers[0];

  return centerCoordinates[center];
}
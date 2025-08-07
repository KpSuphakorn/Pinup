export type LayerOption = 'none' | 'osm' | 'zoning' | 'population' | 'landprice' | 'boundmun' | 'boundtambon' | 'boundamphoe' | 'boundprovince' | 'gatecount' | 'busstop' | 'busroute' | 'LRTroute' | 'road' | 'parkinglot' | 'ruralargi' | 'recreatenv' | 'artcult' | 'lowdenseresarea' | 'meddenseresarea' | 'highdenseresarea';

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
  { value: 'boundtambon', label: 'ขอบเขตตำบล', description: 'แสดงขอบเขตตำบล', center: 'chiangmai' },
  { value: 'boundamphoe', label: 'ขอบเขตอำเภอ', description: 'แสดงขอบเขตอำเภอ', center: 'chiangmai' },
  { value: 'boundprovince', label: 'ขอบเขตจังหวัด', description: 'แสดงขอบเขตจังหวัด', center: 'chiangmai' },
  { value: 'gatecount', label: 'ปริมาณคนเดินผ่าน', description: 'แสดงข้อมูลจำนวนคนเดินผ่านจากการสำรวจ', center: 'chiangmai' },
  { value: 'busstop', label: 'ป้ายรถประจำทาง', description: 'แสดงข้อมูลป้ายรถประจำทาง', center: 'chiangmai' },
  { value: 'busroute', label: 'เส้นทางรถประจำทาง', description: 'แสดงเส้นทางการเดินทางของรถประจำทาง', center: 'chiangmai' },
  { value: 'LRTroute', label: 'เส้นทางรถไฟรางเบา (LRT)', description: 'แสดงเส้นทางการเดินทางของรถไฟรางเบา', center: 'chiangmai' },
  { value: 'road', label: 'ถนน', description: 'แสดงถนน', center: 'chiangmai' },
  { value: 'parkinglot', label: 'ที่จอดรถ', description: 'แสดงที่จอดรถ', center: 'chiangmai' },
  { value: 'ruralargi', label: 'ชนบทและเกษตรกรรม', description: 'แสดงผังเมืองชนบทและเกษตรกรรม', center: 'chiangmai' },
  { value: 'recreatenv', label: 'นันทนาการและอนุรักษ์สิ่งแวดล้อม', description: 'แสดงที่โล่งเพื่อนันทนาการและการอนุรักษ์คุณภาพสิ่งแวดล้อม', center: 'chiangmai' },
  { value: 'artcult', label: 'ที่อนุรักษ์ศิลปะวัฒนธรรมไทย', description: 'แสดงที่อนุรักษ์เพื่อส่งเสริมเอกลักษณ์ศิลปะวัฒนธรรมไทย', center: 'chiangmai' },
  { value: 'lowdenseresarea', label: 'ที่อยู่อาศัยหนาแน่นน้อย', description: 'แสดงพื้นที่ที่อยู่อาศัยหนาแน่นน้อย', center: 'chiangmai' },
  { value: 'meddenseresarea', label: 'ที่อยู่อาศัยหนาแน่นปานกลาง', description: 'แสดงพื้นที่ที่อยู่อาศัยหนาแน่นปานกลาง', center: 'chiangmai' },
  { value: 'highdenseresarea', label: 'ที่อยู่อาศัยหนาแน่นมากและพาณิชยกรรม', description: 'แสดงพื้นที่ที่อยู่อาศัยหนาแน่นมากและพาณิชยกรรม', center: 'chiangmai' },
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
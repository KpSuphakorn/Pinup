import { Feature, Geometry } from 'geojson';

const FEATURE_LABELS = {
  highway: 'ถนน',
  landuse: 'การใช้ที่ดิน',
  boundary: 'ขอบเขต',
  building: 'อาคาร',
  amenity: 'สิ่งอำนวยความสะดวก'
} as const;

const ROAD_TYPES = {
  primary: 'ถนนหลัก',
  secondary: 'ถนนรอง',
  tertiary: 'ถนนสาม',
  trunk: 'ถนนใหญ่',
  residential: 'ถนนในชุมชน'
} as const;

const LANDUSE_TYPES = {
  residential: 'เขตที่อยู่อาศัย',
  commercial: 'เขตพาณิชย์',
  industrial: 'เขตอุตสาหกรรม',
  retail: 'เขตค้าปลีก',
  forest: 'ป่าไม้',
  grass: 'ทุ่งหญ้า',
  recreation_ground: 'สนามกีฬา/นันทนาการ',
  cemetery: 'สุสาน',
  education: 'สถาบันการศึกษา'
} as const;

const AMENITY_TYPES = {
  school: 'โรงเรียน',
  hospital: 'โรงพยาบาล',
  police: 'สถานีตำรวจ',
  fire_station: 'สถานีดับเพลิง',
  place_of_worship: 'สถานที่ศักดิ์สิทธิ์'
} as const;

function getFeatureDescription(props: Record<string, any>) {
  const { highway, landuse, boundary, building, amenity } = props;
  
  if (highway) {
    return {
      type: FEATURE_LABELS.highway,
      description: ROAD_TYPES[highway as keyof typeof ROAD_TYPES] || highway
    };
  }
  
  if (landuse) {
    return {
      type: FEATURE_LABELS.landuse,
      description: LANDUSE_TYPES[landuse as keyof typeof LANDUSE_TYPES] || landuse
    };
  }
  
  if (boundary) {
    return {
      type: FEATURE_LABELS.boundary,
      description: boundary === 'administrative' ? 'ขอบเขตการปกครอง' : 'ขอบเขตอื่นๆ'
    };
  }
  
  if (building) {
    return {
      type: FEATURE_LABELS.building,
      description: building === 'yes' ? 'อาคารทั่วไป' : building
    };
  }
  
  if (amenity) {
    return {
      type: FEATURE_LABELS.amenity,
      description: AMENITY_TYPES[amenity as keyof typeof AMENITY_TYPES] || amenity
    };
  }
  
  return {
    type: 'Unknown',
    description: 'ไม่ระบุประเภท'
  };
}

export function createOsmPopup(feature: Feature<Geometry, any>) {
  const props = feature.properties || {};
  const { name, id } = props;
  const { type, description } = getFeatureDescription(props);
  
  return `
    <div style="font-family: Arial, sans-serif; min-width: 200px;">
      <h4 style="margin: 0 0 10px 0; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        ${type}
      </h4>
      <p style="margin: 5px 0; font-size: 14px;">
        <strong>ประเภท:</strong> ${description}
      </p>
      ${name ? `<p style="margin: 5px 0; font-size: 14px;"><strong>ชื่อ:</strong> ${name}</p>` : ''}
      ${id ? `<p style="margin: 5px 0; font-size: 12px; color: #666;"><strong>ID:</strong> ${id}</p>` : ''}
    </div>
  `;
}

export function createZoningPopup(feature: Feature<Geometry, any>) {
  const props = feature.properties || {};
  
  return `
    <div style="font-family: Arial, sans-serif; min-width: 200px;">
      <h4 style="margin: 0 0 10px 0; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        เขตโซนนิ่ง
      </h4>
      <p style="margin: 5px 0; font-size: 14px;">
        <strong>ID:</strong> ${props.id}
      </p>
      <p style="margin: 5px 0; font-size: 14px;">
        <strong>ชื่อเขต:</strong> ${props.name}
      </p>
    </div>
  `;
}
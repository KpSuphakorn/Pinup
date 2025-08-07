import { Feature, Geometry } from 'geojson';
import { stringToColor, addOpacityToHexColor, lightenColor, getParkingLotPopupColor } from '@/utils/labelColorUtils';
import { LRT_LINE_COLORS, LRT_DEFAULT_COLOR, hexToRgba } from '@/utils/lineColorUtils';

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

// ฟังก์ชันสำหรับจัดรูปแบบตัวเลข
function formatNumber(num: number): string {
  return num.toLocaleString('th-TH');
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

export function createPopulationPopup(feature: Feature<Geometry, any>) {
  const props = feature.properties || {};
  const { id, population, label, province, district, subdistrict } = props;

  const displayLabel = label || district || subdistrict || 'ไม่ระบุชื่อพื้นที่';
  const validLabel = displayLabel && displayLabel.toString().trim() !== '' ? displayLabel.toString().trim() : null;

  return `
    <div style="font-family: Arial, sans-serif; min-width: 250px;">
      <h4 style="margin: 0 0 10px 0; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        ข้อมูลประชากร
      </h4>
      <div style="margin: 10px 0;">
        <p style="margin: 5px 0; font-size: 16px; font-weight: bold; color: #2563eb;">
          <strong>ความหนาแน่นประชากร:</strong> ${population ? formatNumber(population) : 'ไม่ระบุ'} คน
        </p>
        ${validLabel ? `<p style="margin: 5px 0; font-size: 14px; color: #059669; font-weight: 500;"><strong>จำนวนประชากร:</strong> ${validLabel}</p>` : ''}
      </div>
      <div style="margin: 10px 0; padding-top: 8px; border-top: 1px solid #eee;">
        <h5 style="margin: 0 0 5px 0; font-size: 14px; color: #555;">ที่อยู่:</h5>
        ${province ? `<p style="margin: 2px 0; font-size: 13px;"><strong>จังหวัด:</strong> ${province}</p>` : ''}
        ${district ? `<p style="margin: 2px 0; font-size: 13px;"><strong>อำเภอ:</strong> ${district}</p>` : ''}
        ${subdistrict ? `<p style="margin: 2px 0; font-size: 13px;"><strong>ตำบล:</strong> ${subdistrict}</p>` : ''}
      </div>
    </div>
  `;
}

export function createLandPriceSubdPopup(feature: Feature<Geometry, any>) {
  const props = feature.properties || {};
  const { land_price, label, province, district, subdistrict } = props;

  const displayLabel = label || district || subdistrict || 'ไม่ระบุชื่อพื้นที่';
  const validLabel = displayLabel && displayLabel.toString().trim() !== '' ? displayLabel.toString().trim() : null;

  return `
    <div style="font-family: Arial, sans-serif; min-width: 250px;">
      <h4 style="margin: 0 0 10px 0; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        ข้อมูลราคาที่ดินตามแขวง
      </h4>
      <div style="margin: 10px 0;">
        <p style="margin: 5px 0; font-size: 16px; font-weight: bold; color: #2563eb;">
          <strong>ราคาที่ดิน:</strong> ${land_price ? formatNumber(land_price) : 'ไม่ระบุ'} บาท/ตร.ว.
        </p>
        ${validLabel ? `<p style="margin: 5px 0; font-size: 14px; color: #059669; font-weight: 500;"><strong>พื้นที่:</strong> ${validLabel}</p>` : ''}
      </div>
      <div style="margin: 10px 0; padding-top: 8px; border-top: 1px solid #eee;">
        <h5 style="margin: 0 0 5px 0; font-size: 14px; color: #555;">ที่อยู่:</h5>
        ${province ? `<p style="margin: 2px 0; font-size: 13px;"><strong>จังหวัด:</strong> ${province}</p>` : ''}
        ${district ? `<p style="margin: 2px 0; font-size: 13px;"><strong>อำเภอ:</strong> ${district}</p>` : ''}
        ${subdistrict ? `<p style="margin: 2px 0; font-size: 13px;"><strong>ตำบล:</strong> ${subdistrict}</p>` : ''}
      </div>
    </div>
  `;
}

export function createBoundMunPopup(feature: Feature<Geometry, any>) {
  const props = feature.properties || {};
  const display_name = props.display_name;

  const baseColor = display_name ? stringToColor(display_name) : '#ddd';
  const lightColor = lightenColor(baseColor, 0.2);

  return `
    <div style="font-family: Arial, sans-serif; min-width: 250px;">
      <h4 style="margin: 0 0 10px 0; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        ขอบเขตเทศบาล
      </h4>
      <div style="margin: 10px 0;">
        ${display_name ? `<p style="margin: 5px 0; font-size: 16px; font-weight: bold; color: ${lightColor}; padding: 4px 8px; border-radius: 4px;">
          ${display_name}
        </p>` : ''}
      </div>
    </div>
  `;
}

export function createBoundTambonPopup(feature: Feature<Geometry, any>) {
  const props = feature.properties || {};
  const { display_multiline = [] } = props;

  return `
    <div style="font-family: Arial, sans-serif; min-width: 260px;">
      <h4 style="margin: 0 0 10px 0; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        ขอบเขตตำบล
      </h4>
      <div style="margin: 10px 0;">
        ${display_multiline
      .map((item: any) => {
        const { label, th, en, highlight } = item;
        const baseStyle = `
              margin: 6px 0;
              font-size: ${highlight ? '15px' : '13px'};
              font-weight: ${highlight ? 'bold' : 'normal'};
              padding: ${highlight ? '6px 8px' : '0'};
              background-color: ${highlight ? addOpacityToHexColor(stringToColor(th), 0.1) : 'transparent'};
              border-radius: ${highlight ? '6px' : '0'};
              color: ${highlight ? stringToColor(th) : lightenColor(th, 0.5)};
            `;
        return `
              <div style="${baseStyle}">
                <strong>${label}:</strong> ${th} (${en})
              </div>
            `;
      })
      .join('')}
      </div>
    </div>
  `;
}

export function createBoundAmphoePopup(feature: Feature<Geometry, any>) {
  const props = feature.properties || {};
  const { display_name } = props;

  const baseColor = display_name ? stringToColor(display_name) : '#ddd';

  return `
    <div style="font-family: Arial, sans-serif; min-width: 250px;">
      <h4 style="margin: 0 0 10px 0; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        ขอบเขตอำเภอ
      </h4>
      <div style="margin: 10px 0;">
        ${display_name ? `<p style="margin: 5px 0; font-size: 16px; font-weight: bold; color: ${baseColor}; padding: 4px 8px; border-radius: 4px;">
          ${display_name}
        </p>` : ''}
      </div>
    </div>
  `;
}

export function createBoundProvincePopup(feature: Feature<Geometry, any>) {
  const props = feature.properties || {};
  const { display_name } = props;

  const baseColor = display_name ? stringToColor(display_name) : '#ddd';

  return `
    <div style="font-family: Arial, sans-serif; min-width: 300px;">
      <h4 style="margin: 0 0 10px 0; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        ขอบเขตจังหวัด
      </h4>
      <div style="margin: 10px 0;">
        ${display_name ? `<p style="margin: 5px 0; font-size: 14px; font-weight: bold; color: ${baseColor}; padding: 4px 4px; border-radius: 4px;">
          ${display_name}
        </p>` : ''}
      </div>
    </div>
  `;
}

export function createGateCountPopup(feature: Feature<Geometry, any>): string {
  const props = feature.properties || {};

  return `
    <div style="
      position: relative;
      min-width: 220px;
      padding: 6px 10px;
      font-family: Arial, sans-serif;
    ">

      <h4 style="
        margin: 0 0 8px 0;
        font-size: 16px;
        font-weight: bold;
        color: #094381ff;
        padding-right: 24px;
      ">
        ${props.display_name || ''}
      </h4>

      <hr style="
        border-top: 1px solid #ddd;
        margin: 6px 0 10px;
      " />

      <ul style="
        padding-left: 18px;
        margin: 0 0 10px 0;
        font-size: 14px;
        color: #333;
      ">
        ${Object.values(props.statistics || {}).map((stat: any) => `
          <li>${stat.label}: <strong>${stat.count}</strong> คน</li>
        `).join('')}
      </ul>

      <p style="
        margin: 0;
        font-size: 13px;
        color: #555;
      ">
        ${props.description || ''}
      </p>
    </div>
  `;
}

export function createBusStopPopup(feature: Feature<Geometry, any>): string {
  const props = feature.properties || {};

  return `
    <div style="
      position: relative;
      min-width: 220px;
      padding: 6px 5px;
      font-family: Arial, sans-serif;
    ">

      <h4 style="
        margin: 0 0 8px 0;
        font-size: 16px;
        font-weight: bold;
        color: #856208ff;
      ">
        ${props.display_name || ''}
      </h4>
    </div>
  `;
}

export function createBusRoutePopup(feature: Feature<Geometry, any>): string {
  const props = feature.properties || {};
  const name = props.name || 'ไม่ทราบชื่อ';
  const summary = props.segments_summary || '';
  const total = props.total_distance_display || '';

  return `
    <div style="
      min-width: 240px;
      font-family: Arial, sans-serif;
      font-size: 12.5px;
      color: #333;
    ">
      <div style="
        background-color: rgba(255, 165, 0, 0.3);
        padding: 6px 10px;
        border-radius: 4px;
        margin-bottom: 8px;
      ">
        <h4 style="
          margin: 0;
          font-size: 14px;
          font-weight: bold;
        ">${name}</h4>
      </div>

      <div style="line-height: 1.4;">
        <strong>รวม:</strong> ${total}<br/>
        <strong>รายละเอียด:</strong> ${summary}
      </div>
    </div>
  `;
}

export function createLRTRoutePopup(feature: Feature<Geometry, any>): string {
  const props = feature.properties || {};
  const displayName = props.display_name || 'ไม่ทราบชื่อ';
  const displayDistance = props.total_distance_display || '';
  const lineKey = props.line || '';
  const baseColor = LRT_LINE_COLORS[lineKey] || LRT_DEFAULT_COLOR;

  const bgColor = hexToRgba(baseColor, 0.3);

  return `
    <div style="min-width: 220px; font-family: Arial, sans-serif;">
      <div style="font-weight: bold; font-size: 14px; background: ${bgColor}; padding: 4px 8px; border-radius: 4px;">
        ${displayName}
      </div>
      <div style="font-size: 12px; color: #333; margin-top: 6px;">
        <strong>ระยะทางรวม:</strong> ${displayDistance}
      </div>
    </div>
  `;
}

export function createRoadPopup(feature: Feature<Geometry, any>): string {
  const props = feature.properties || {};
  const displayName_TH = props.name_th || 'ไม่ทราบชื่อ';
  const displayName_EN = props.name_en || 'unknown';
  const displayDistance = props.len_km || '';

  const baseColor = displayName_TH ? stringToColor(displayName_TH) : '#ddd';
  const bgColor = hexToRgba(baseColor, 0.3);

  return `
    <div style="min-width: 220px; font-family: Arial, sans-serif;">
      <div style="font-weight: bold; font-size: 14px; background: ${bgColor}; padding: 4px 8px; border-radius: 4px;">
        ${displayName_TH} (${displayName_EN})
      </div>
      <div style="font-size: 12px; color: #333; margin-top: 6px;">
        <strong>ระยะทาง:</strong> ${displayDistance}
      </div>
    </div>
  `;
}

export function createParkingLotPopup(feature: Feature<Geometry, any>): string {
  const props = feature.properties || {};

  const name = props.name || 'ไม่ทราบชื่อ';
  const type = props.type || 'ไม่ทราบประเภท';
  const capacity = props.capacity ?? 'ไม่ระบุ';
  const storey = props.storey ?? 'ไม่ระบุ';
  const area = props.area_m2 ?? 'ไม่ระบุ';

  const bgColor = getParkingLotPopupColor(type);

  return `
    <div style="min-width: 220px; font-family: Arial, sans-serif;">
      <div style="
        font-weight: bold;
        font-size: 14px;
        background: ${bgColor};
        padding: 6px 10px;
        border-radius: 6px;
      ">
        ${name}
      </div>
      <div style="font-size: 12px; color: #333; margin-top: 6px;">
        <div><strong>ประเภท:</strong> ${type}</div>
        <div><strong>ความจุ:</strong> ${capacity} คัน</div>
        <div><strong>จำนวนชั้น:</strong> ${storey} ชั้น</div>
        <div><strong>พื้นที่:</strong> ${area} ตร.ม.</div>
      </div>
    </div>
  `;
}

export function createRuralArgiPopup(feature: Feature<Geometry, any>) {
  const props = feature.properties || {};
  const display_data = props.display_data;

  const baseColor = display_data ? stringToColor(display_data) : '#ddd';
  const lightColor = lightenColor(baseColor, 0.2);

  return `
    <div style="font-family: Arial, sans-serif; min-width: 250px;">
      <h4 style="margin: 0 0 10px 0; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        ผังเมือง: ชนบทและเกษตรกรรม
      </h4>
      <div style="margin: 10px 0;">
        ${display_data ? `<p style="margin: 5px 0; font-size: 14px; font-weight: bold; color: ${lightColor}; padding: 4px 8px; border-radius: 4px;">
          ${display_data}
        </p>` : ''}
      </div>
    </div>
  `;
}

export function createRecreatEnvPopup(feature: Feature<Geometry, any>) {
  const props = feature.properties || {};
  const display_data = props.display_data;

  const lightColor = '#ccefd3ff';

  return `
    <div style="font-family: Arial, sans-serif; min-width: 250px;">
      <h4 style="margin: 0 0 10px 0; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        ผังเมือง: ที่โล่งเพื่อนันทนาการและการอนุรักษ์คุณภาพสิ่งแวดล้อม
      </h4>
      <div style="margin: 10px 0;">
        ${display_data ? `<p style="
          margin: 5px 0;
          font-size: 14px;
          font-weight: bold;
          background-color: ${lightColor};
          padding: 6px 10px;
          border-radius: 6px;
        ">
          ${display_data}
        </p>` : ''}
      </div>
    </div>
  `;
}

export function createArtCultPopup(feature: Feature<Geometry, any>) {
  const props = feature.properties || {};
  const display_data = props.display_data;

  const baseColor = stringToColor('วัฒนธรรม');
  const lightColor = lightenColor(baseColor, 0.8);

  return `
    <div style="font-family: Arial, sans-serif; min-width: 250px;">
      <h4 style="margin: 0 0 10px 0; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        ผังเมือง: ที่อนุรักษ์เพื่อส่งเสริมเอกลักษณ์ศิลปะวัฒนธรรมไทย
      </h4>
      <div style="margin: 10px 0;">
        ${display_data ? `<p style="
          margin: 5px 0;
          font-size: 14px;
          font-weight: bold;
          background-color: ${lightColor};
          padding: 6px 10px;
          border-radius: 6px;
        ">
          ${display_data}
        </p>` : ''}
      </div>
    </div>
  `;
}

export function createLowDenseResAreaPopup(feature: Feature<Geometry, any>): string {
  const props = feature.properties || {};

  const elevation = props.elevation ?? 'ไม่ทราบระดับชั้น';
  const area = props.area_km2 ?? 'ไม่ระบุ';
  const bgColor = '#fffeacff';

  return `
    <div style="min-width: 220px; font-family: Arial, sans-serif;">
      <div style="
        font-weight: bold;
        font-size: 14px;
        background: ${bgColor};
        padding: 6px 10px;
        border-radius: 6px;
      ">
        ${area} ตร.กม.
      </div>
      <div style="font-size: 12px; color: #333; margin-top: 6px;">
        <div><strong>ระดับ:</strong> ${elevation}</div>
      </div>
    </div>
  `;
}

export function createMedDenseResAreaPopup(feature: Feature<Geometry, any>): string {
  const props = feature.properties || {};

  const elevation = props.elevation ?? 'ไม่ทราบระดับชั้น';
  const area = props.area_km2 ?? 'ไม่ระบุ';
  const bgColor = '#ffd6acff';

  return `
    <div style="min-width: 220px; font-family: Arial, sans-serif;">
      <div style="
        font-weight: bold;
        font-size: 14px;
        background: ${bgColor};
        padding: 6px 10px;
        border-radius: 6px;
      ">
        ${area} ตร.กม.
      </div>
      <div style="font-size: 12px; color: #333; margin-top: 6px;">
        <div><strong>ระดับ:</strong> ${elevation}</div>
      </div>
    </div>
  `;
}

export function createEducationPopup(feature: Feature<Geometry, any>): string {
  const props = feature.properties || {};
  const display_data = props.display_data || 'ไม่ระบุ';
  const elevation = props.elevation ?? 'ไม่ทราบระดับชั้น';
  const name = props.NAME || props.name || 'ไม่ระบุชื่อ';
  const type = props.TYPE || props.type || 'ไม่ระบุประเภท';
  const province = props.PROVINCE || props.province || '';
  const district = props.DISTRICT || props.district || '';
  const subdistrict = props.SUBDISTRICT || props.subdistrict || '';

  const baseColor = stringToColor('การศึกษา');
  const lightColor = lightenColor(baseColor, 0.8);

  return `
    <div style="font-family: Arial, sans-serif; min-width: 250px;">
      <h4 style="margin: 0 0 10px 0; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        ผังเมือง: สถานศึกษา
      </h4>
      <div style="margin: 10px 0;">
        <p style="
          margin: 5px 0;
          font-size: 14px;
          font-weight: bold;
          background-color: ${lightColor};
          padding: 6px 10px;
          border-radius: 6px;
        ">
          ${name}
        </p>
        <p style="margin: 5px 0; font-size: 12px; color: #333;">
          <strong>ประเภท:</strong> ${type}
        </p>
        <p style="margin: 5px 0; font-size: 12px; color: #333;">
          <strong>ระดับ:</strong> ${elevation}
        </p>
        ${display_data !== name ? `<p style="margin: 5px 0; font-size: 12px; color: #333;">
          <strong>ข้อมูลเพิ่มเติม:</strong> ${display_data}
        </p>` : ''}
      </div>
      ${province || district || subdistrict ? `
      <div style="margin: 10px 0; padding-top: 8px; border-top: 1px solid #eee;">
        <h5 style="margin: 0 0 5px 0; font-size: 14px; color: #555;">ที่อยู่:</h5>
        ${province ? `<p style="margin: 2px 0; font-size: 13px;"><strong>จังหวัด:</strong> ${province}</p>` : ''}
        ${district ? `<p style="margin: 2px 0; font-size: 13px;"><strong>อำเภอ:</strong> ${district}</p>` : ''}
        ${subdistrict ? `<p style="margin: 2px 0; font-size: 13px;"><strong>ตำบล:</strong> ${subdistrict}</p>` : ''}
      </div>` : ''}
    </div>
  `;
}

export function createGovernmentPopup(feature: Feature<Geometry, any>): string {
  const props = feature.properties || {};
  const display_data = props.display_data || 'ไม่ระบุ';
  const elevation = props.elevation ?? 'ไม่ทราบระดับชั้น';
  const name = props.NAME || props.name || 'หน่วยงานรัฐบาล';
  const type = props.TYPE || props.type || 'ไม่ระบุประเภท';
  const province = props.PROVINCE || props.province || '';
  const district = props.DISTRICT || props.district || '';
  const subdistrict = props.SUBDISTRICT || props.subdistrict || '';

  const baseColor = stringToColor('หน่วยงานรัฐบาล');
  const lightColor = lightenColor(baseColor, 0.8);

  return `
    <div style="font-family: Arial, sans-serif; min-width: 250px;">
      <h4 style="margin: 0 0 10px 0; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        ผังเมือง: หน่วยงานรัฐบาล
      </h4>
      <div style="margin: 10px 0;">
        <p style="
          margin: 5px 0;
          font-size: 14px;
          font-weight: bold;
          background-color: ${lightColor};
          padding: 6px 10px;
          border-radius: 6px;
        ">
          ${name}
        </p>
        <p style="margin: 5px 0; font-size: 12px; color: #333;">
          <strong>ประเภท:</strong> ${type}
        </p>
        <p style="margin: 5px 0; font-size: 12px; color: #333;">
          <strong>ระดับ:</strong> ${elevation}
        </p>
        ${display_data !== name ? `<p style="margin: 5px 0; font-size: 12px; color: #333;">
          <strong>ข้อมูลเพิ่มเติม:</strong> ${display_data}
        </p>` : ''}
      </div>
      ${province || district || subdistrict ? `
      <div style="margin: 10px 0; padding-top: 8px; border-top: 1px solid #eee;">
        <h5 style="margin: 0 0 5px 0; font-size: 14px; color: #555;">ที่อยู่:</h5>
        ${province ? `<p style="margin: 2px 0; font-size: 13px;"><strong>จังหวัด:</strong> ${province}</p>` : ''}
        ${district ? `<p style="margin: 2px 0; font-size: 13px;"><strong>อำเภอ:</strong> ${district}</p>` : ''}
        ${subdistrict ? `<p style="margin: 2px 0; font-size: 13px;"><strong>ตำบล:</strong> ${subdistrict}</p>` : ''}
      </div>` : ''}
    </div>
  `;
}
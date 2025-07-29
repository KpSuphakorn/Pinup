export interface DisplayMultilineItem {
  label: string; // เช่น "ตำบล", "อำเภอ", "จังหวัด"
  th: string; // ชื่อภาษาไทย
  en: string; // ชื่อภาษาอังกฤษ
  highlight: boolean; // ใช้เพื่อแสดงว่า row ของ label ไหนควรเน้น
}

export interface BoundTambonData {
  id: number;

  tambon_th: string;
  tambon_en: string;

  amphoe_th: string;
  amphoe_en: string;

  province_th: string;
  province_en: string;

  display_multiline: DisplayMultilineItem[];
}

export interface BoundTambonFeature {
  type: "Feature";
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
  properties: BoundTambonData;
}

export interface BoundTambonGeoJSON {
  type: "FeatureCollection";
  features: BoundTambonFeature[];
}

import { Feature, Geometry, FeatureCollection } from 'geojson';

export interface ZoningData {
  feature: Feature<Geometry, { id: number; name: string }>;
}

export interface OsmFeature {
  type: 'Feature';
  properties: {
    id: string;
    highway?: string;
    landuse?: string;
    name?: string;
    boundary?: string;
    building?: string;
    amenity?: string;
  };
  geometry: Geometry;
}

export interface MapLayersProps {
  osmData?: FeatureCollection<Geometry, any> | null;
  zoningData?: ZoningData | null;
  populationData?: PopulationGeoJSON | null;
  populationRangeData?: PopulationRangeData | null;
  landpricesubdData?: LandPriceSubdGeoJSON | null;
  landpricesubdRangeData?: LandPriceSubdRangeData | null;
  boundmunData?: BoundMunGeoJSON | null;
  boundtambonData?: BoundTambonGeoJSON | null;
  boundamphoeData?: BoundAmphoeGeoJSON | null;
  boundprovinceData?: BoundProvinceGeoJSON | null;
  landId?: string;
  isLoading: boolean;
}

export interface PopulationData {
  id: number;
  population: number;
  label: string;
  province: string;
  district: string;
  subdistrict: string;
}

export interface PopulationFeature {
  type: 'Feature';
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  properties: PopulationData;
}

export interface PopulationGeoJSON {
  type: 'FeatureCollection';
  features: PopulationFeature[];
}

export interface PopulationRange {
  range: number;
  min: number;
  max: number;
  label: string;
}

export interface PopulationRangeData {
  min: number;
  max: number;
  avg: number;
  ranges: PopulationRange[];
  total_ranges: number;
}

export interface LandPriceSubdData {
  id: number;
  land_price: number;
  label: string;
  province: string;
  district: string;
  subdistrict: string;
}

export interface LandPriceSubdFeature {
  type: 'Feature';
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  properties: LandPriceSubdData;
}

export interface LandPriceSubdGeoJSON {
  type: 'FeatureCollection';
  features: LandPriceSubdFeature[];
}

export interface LandPriceSubdRange {
  range: number;
  min: number;
  max: number;
  label: string;
}

export interface LandPriceSubdRangeData {
  min: number;
  max: number;
  avg: number;
  ranges: LandPriceSubdRange[];
  total_ranges: number;
}

export interface LegendItem {
  color: string;
  label: string;
  min: number | string;
  max: number | string;
}

export interface LayerStyle {
  getLegendItems: (data: any) => LegendItem[];
}

export interface LayerConfig {
  key: string;
  displayName: string;
  style: LayerStyle;
  rangeData?: any;
}

export interface RangeLegendProps {
  selectedLayerKeys?: string[];
  populationRangeData?: any;
  landpricesubdRangeData?: any;
  // สำหรับเพิ่ม layer ใหม่ในอนาคต
  [key: string]: any;
}

export type LegendLayerKey = string;

export interface BoundMunData {
  id: number;
  name_th: string;
  name_en: string;
  display_name: string;
}

export interface BoundMunFeature {
  type: 'Feature';
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  properties: BoundMunData;
}

export interface BoundMunGeoJSON {
  type: 'FeatureCollection';
  features: BoundMunFeature[];
}

export interface DisplayMultilineItem {
  label: string;       // เช่น "ตำบล", "อำเภอ", "จังหวัด"
  th: string;          // ชื่อภาษาไทย
  en: string;          // ชื่อภาษาอังกฤษ
  highlight: boolean;  // ใช้เพื่อแสดงว่า row ของ label ไหนควรเน้น
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
  type: 'Feature';
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  properties: BoundTambonData;
}

export interface BoundTambonGeoJSON {
  type: 'FeatureCollection';
  features: BoundTambonFeature[];
}

export interface BoundAmphoeData {
  amphoe_th: string;
  amphoe_en: string;
  display_name: string;
}

export interface BoundAmphoeFeature {
  type: 'Feature';
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  properties: BoundAmphoeData;
}

export interface BoundAmphoeGeoJSON {
  type: 'FeatureCollection';
  features: BoundAmphoeFeature[];
}

export interface BoundProvinceData {
  prov_th: string;
  prov_en: string;
  area_km2: number;
  display_name: string;
}

export interface BoundProvinceFeature {
  type: 'Feature';
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  properties: BoundProvinceData;
}

export interface BoundProvinceGeoJSON {
  type: 'FeatureCollection';
  features: BoundProvinceFeature[];
}
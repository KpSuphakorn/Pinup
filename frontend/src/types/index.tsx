import { Feature, Geometry, FeatureCollection, LineString, MultiLineString } from 'geojson';

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
  gatecountData?: GateCountGeoJSON | null;
  busstopData?: BusStopGeoJSON | null;
  busrouteData?: BusRouteGeoJSON | null;
  LRTrouteData?: LRTRouteGeoJSON | null;
  roadData?: RoadGeoJSON | null;
  parkinglotData?: ParkingLotGeoJSON | null;
  ruralargiData?: RuralArgiGeoJSON | null;
  recreatenvData?: RecreatEnvGeoJSON | null;
  artcultData?: ArtCultGeoJSON | null;
  lowdenseresareaData?: LowDenseResAreaGeoJSON | null;
  meddenseresareaData?: MedDenseResAreaGeoJSON | null;
  treasuryAreaData?: TreasuryAreaGeoJSON | null;
  vacantAreaData?: VacantAreaGeoJSON | null;
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

export interface GateCountStatistics {
  weekday_morning: {
    count: number;
    per_10h: number;
  };
  weekday_evening: {
    count: number;
    per_10h: number;
  };
  weekday_night: {
    count: number;
    per_10h: number;
  };
  total: {
    count: number;
    per_10h: number;
  };
}

export interface GateCountData {
  gate_code: string;
  zone: number;
  point_name: string;
  display_name: string;
  statistics: GateCountStatistics;
  label: string;
  description: string;
}

export interface GateCountFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number, number?, number?];
  };
  properties: GateCountData;
}

export interface GateCountGeoJSON {
  type: 'FeatureCollection';
  features: GateCountFeature[];
}

export interface BusStopData {
  name: string;
  display_name: string;
}

export interface BusStopFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number, number?, number?];
  };
  properties: BusStopData;
}

export interface BusStopGeoJSON {
  type: 'FeatureCollection';
  features: BusStopFeature[];
}

export interface BusRouteSegment {
  segment_number: number;
  length_meters: number;
  distance_display: string;
  coordinates: number[][];
}

export interface BusRouteData {
  name: string;
  total_length_meters: number;
  total_distance_display: string;
  display_name: string;
  geometry_type: 'LineString' | 'MultiLineString';
  segments: BusRouteSegment[];
  segments_summary: string;
}

export type BusRouteFeature =
  | Feature<LineString, BusRouteData>
  | Feature<MultiLineString, BusRouteData>;

export interface BusRouteGeoJSON {
  type: 'FeatureCollection';
  features: BusRouteFeature[];
}

export interface LRTRouteData {
  name: string;
  line: string;
  total_length_meters: number;
  total_distance_display: string;
  display_name: string;
}

export interface LRTRouteFeature {
  type: 'Feature';
  geometry: {
    type: 'LineString';
    coordinates: [number, number][];
  };
  properties: LRTRouteData;
}

export interface LRTRouteGeoJSON {
  type: 'FeatureCollection';
  features: LRTRouteFeature[];
}

export interface RoadData {
  name_th: string;
  name_en: string,
  len_km: number;
}

export interface RoadFeature {
  type: 'Feature';
  geometry: {
    type: 'LineString';
    coordinates: [number, number][];
  };
  properties: RoadData;
}

export interface RoadGeoJSON {
  type: 'FeatureCollection';
  features: RoadFeature[];
}

export interface ParkingLotData {
  name: string;
  area: number;
  capacity: number;
  storey: number;
  type: string;
}

export type ParkingLotGeometry =
  | {
    type: 'Polygon';
    coordinates: number[][][];
  }
  | {
    type: 'MultiPolygon';
    coordinates: number[][][][];
  };

export interface ParkingLotFeature {
  type: 'Feature';
  geometry: ParkingLotGeometry;
  properties: ParkingLotData;
}

export interface ParkingLotGeoJSON {
  type: 'FeatureCollection';
  features: ParkingLotFeature[];
}

export interface RuralArgiData {
  elevation: number;
  area: number;
  display_data: string;
}

export type RuralArgiGeometry =
  | {
    type: 'Polygon';
    coordinates: number[][][];
  }
  | {
    type: 'MultiPolygon';
    coordinates: number[][][][];
  };

export interface RuralArgiFeature {
  type: 'Feature';
  geometry: RuralArgiGeometry;
  properties: RuralArgiData;
}

export interface RuralArgiGeoJSON {
  type: 'FeatureCollection';
  features: RuralArgiFeature[];
}

export interface RecreatEnvData {
  elevation: number;
  display_data: string;
}

export interface RecreatEnvFeature {
  type: 'Feature';
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  properties: RecreatEnvData;
}

export interface RecreatEnvGeoJSON {
  type: 'FeatureCollection';
  features: RecreatEnvFeature[];
}

export interface ArtCultData {
  elevation: number;
  display_data: string;
}

export interface ArtCultFeature {
  type: 'Feature';
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  properties: ArtCultData;
}

export interface ArtCultGeoJSON {
  type: 'FeatureCollection';
  features: ArtCultFeature[];
}

export interface LowDenseResAreaData {
  elevation: number;
  area: number;
}

export type LowDenseResAreaGeometry =
  | {
    type: 'Polygon';
    coordinates: number[][][];
  }
  | {
    type: 'MultiPolygon';
    coordinates: number[][][][];
  };

export interface LowDenseResAreaFeature {
  type: 'Feature';
  geometry: LowDenseResAreaGeometry;
  properties: LowDenseResAreaData;
}

export interface LowDenseResAreaGeoJSON {
  type: 'FeatureCollection';
  features: LowDenseResAreaFeature[];
}

export interface MedDenseResAreaData {
  elevation: number;
  area: number;
}

export interface MedDenseResAreaFeature {
  type: 'Feature';
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  properties: MedDenseResAreaData;
}

export interface MedDenseResAreaGeoJSON {
  type: 'FeatureCollection';
  features: MedDenseResAreaFeature[];
}

export type TreasuryAreaFeatureProperty = {
  reg_id: string;
  reg_type: string;
  reg_num: string;
  reg_name: string;
  remark: string;
  tumbon_id: string | null;
  tumbon_name: string;
  amphoe_id: string | null;
  amphoe_name: string;
  province_id: string | null;
  province_name: string;
  area: {
    ngan: number;
    rai: number;
    square_area: number;
  };
};

export type TreasuryAreaGeoJSON = FeatureCollection<
  Geometry,
  TreasuryAreaFeatureProperty
>;

export type VacantAreaFeatureProperty = {
  name: string;
}

export type VacantAreaGeoJSON = FeatureCollection<
  Geometry,
  VacantAreaFeatureProperty
>;
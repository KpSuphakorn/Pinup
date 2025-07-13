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

// Interface สำหรับ Properties ของแต่ละพื้นที่ - เหมือน PopulationData
export interface LandPriceSubdData {
  id: number;
  land_price: number;
  label: string;
  province: string;
  district: string;
  subdistrict: string;
}

// Interface สำหรับ Feature ใน GeoJSON - เหมือน PopulationFeature
export interface LandPriceSubdFeature {
  type: 'Feature';
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  properties: LandPriceSubdData;
}

// Interface สำหรับ GeoJSON ที่ส่งมาจาก API - เหมือน PopulationGeoJSON
export interface LandPriceSubdGeoJSON {
  type: 'FeatureCollection';
  features: LandPriceSubdFeature[];
}

// Interface สำหรับช่วงราคา - เหมือน PopulationRange
export interface LandPriceSubdRange {
  range: number;
  min: number;
  max: number;
  label: string;
}

// Interface สำหรับ Response จาก API - เหมือน PopulationRangeData
export interface LandPriceSubdRangeData {
  min: number;
  max: number;
  avg: number;
  ranges: LandPriceSubdRange[];
  total_ranges: number;
}
export interface LandPriceSubdData {
  id: number;
  land_price: number;
  label: string;
  province: string;
  district: string;
  subdistrict: string;
}

export interface LandPriceSubdFeature {
  type: "Feature";
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
  properties: LandPriceSubdData;
}

export interface LandPriceSubdGeoJSON {
  type: "FeatureCollection";
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

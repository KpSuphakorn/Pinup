export interface RoadData {
  name_th: string;
  name_en: string;
  len_km: number;
}

export interface RoadFeature {
  type: "Feature";
  geometry: {
    type: "LineString";
    coordinates: [number, number][];
  };
  properties: RoadData;
}

export interface RoadGeoJSON {
  type: "FeatureCollection";
  features: RoadFeature[];
}

export interface BoundMunData {
  id: number;
  name_th: string;
  name_en: string;
  display_name: string;
}

export interface BoundMunFeature {
  type: "Feature";
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
  properties: BoundMunData;
}

export interface BoundMunGeoJSON {
  type: "FeatureCollection";
  features: BoundMunFeature[];
}

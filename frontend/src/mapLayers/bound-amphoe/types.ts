export interface BoundAmphoeData {
  amphoe_th: string;
  amphoe_en: string;
  display_name: string;
}

export interface BoundAmphoeFeature {
  type: "Feature";
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
  properties: BoundAmphoeData;
}

export interface BoundAmphoeGeoJSON {
  type: "FeatureCollection";
  features: BoundAmphoeFeature[];
}

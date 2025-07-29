export interface BoundProvinceData {
  prov_th: string;
  prov_en: string;
  area_km2: number;
  display_name: string;
}

export interface BoundProvinceFeature {
  type: "Feature";
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
  properties: BoundProvinceData;
}

export interface BoundProvinceGeoJSON {
  type: "FeatureCollection";
  features: BoundProvinceFeature[];
}

export interface RecreatEnvData {
  elevation: number;
  display_data: string;
}

export interface RecreatEnvFeature {
  type: "Feature";
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
  properties: RecreatEnvData;
}

export interface RecreatEnvGeoJSON {
  type: "FeatureCollection";
  features: RecreatEnvFeature[];
}

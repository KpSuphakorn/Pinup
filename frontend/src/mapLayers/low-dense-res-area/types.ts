export interface LowDenseResAreaData {
  elevation: number;
  area: number;
}

export type LowDenseResAreaGeometry =
  | {
      type: "Polygon";
      coordinates: number[][][];
    }
  | {
      type: "MultiPolygon";
      coordinates: number[][][][];
    };

export interface LowDenseResAreaFeature {
  type: "Feature";
  geometry: LowDenseResAreaGeometry;
  properties: LowDenseResAreaData;
}

export interface LowDenseResAreaGeoJSON {
  type: "FeatureCollection";
  features: LowDenseResAreaFeature[];
}

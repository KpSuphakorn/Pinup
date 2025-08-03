export interface RuralArgiData {
  elevation: number;
  area: number;
  display_data: string;
}

export type RuralArgiGeometry =
  | {
      type: "Polygon";
      coordinates: number[][][];
    }
  | {
      type: "MultiPolygon";
      coordinates: number[][][][];
    };

export interface RuralArgiFeature {
  type: "Feature";
  geometry: RuralArgiGeometry;
  properties: RuralArgiData;
}

export interface RuralArgiGeoJSON {
  type: "FeatureCollection";
  features: RuralArgiFeature[];
}

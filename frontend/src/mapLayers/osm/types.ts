import { Geometry } from "geojson";

export interface OsmFeature {
  type: "Feature";
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

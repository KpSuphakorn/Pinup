import { Feature, Geometry } from "geojson";

export interface ZoningData {
  feature: Feature<Geometry, { id: number; name: string }>;
}

import { Feature, LineString, MultiLineString } from "geojson";

export interface BusRouteSegment {
  segment_number: number;
  length_meters: number;
  distance_display: string;
  coordinates: number[][];
}

export interface BusRouteData {
  name: string;
  total_length_meters: number;
  total_distance_display: string;
  display_name: string;
  geometry_type: "LineString" | "MultiLineString";
  segments: BusRouteSegment[];
  segments_summary: string;
}

export type BusRouteFeature =
  | Feature<LineString, BusRouteData>
  | Feature<MultiLineString, BusRouteData>;

export interface BusRouteGeoJSON {
  type: "FeatureCollection";
  features: BusRouteFeature[];
}

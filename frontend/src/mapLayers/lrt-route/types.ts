import { BusStopData } from "../bus-stop/types";

export interface LRTRouteData {
  name: string;
  line: string;
  total_length_meters: number;
  total_distance_display: string;
  display_name: string;
}

export interface LRTRouteFeature {
  type: "Feature";
  geometry: {
    type: "LineString";
    coordinates: [number, number][];
  };
  properties: BusStopData;
}

export interface LRTRouteGeoJSON {
  type: "FeatureCollection";
  features: LRTRouteFeature[];
}

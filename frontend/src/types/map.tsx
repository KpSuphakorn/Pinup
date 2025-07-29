import { ZoningData } from "@/mapLayers/zoning/types";
import { FeatureCollection, Geometry } from "geojson";

export interface MapProps {
  landId: number;
}

export interface MapLayersProps {
  osmData: FeatureCollection<Geometry, any> | null;
  zoningData: ZoningData | null;
  landId: number;
  isLoading: boolean;
}

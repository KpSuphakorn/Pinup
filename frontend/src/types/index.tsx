import { BoundAmphoeGeoJSON } from "@/mapLayers/bound-amphoe/types";
import { BoundMunGeoJSON } from "@/mapLayers/bound-mun/types";
import { BoundProvinceGeoJSON } from "@/mapLayers/bound-province/types";
import { BoundTambonGeoJSON } from "@/mapLayers/bound-tambon/types";
import { BusRouteGeoJSON } from "@/mapLayers/bus-route/types";
import { BusStopGeoJSON } from "@/mapLayers/bus-stop/types";
import { GateCountGeoJSON } from "@/mapLayers/gate-count/types";
import {
  LandPriceSubdGeoJSON,
  LandPriceSubdRangeData,
} from "@/mapLayers/landprice-subd/types";
import { LRTRouteGeoJSON } from "@/mapLayers/lrt-route/types";
import {
  PopulationGeoJSON,
  PopulationRangeData,
} from "@/mapLayers/population/types";
import { ZoningData } from "@/mapLayers/zoning/types";
import { Geometry, FeatureCollection } from "geojson";

export interface MapLayersProps {
  osmData?: FeatureCollection<Geometry, any> | null;
  zoningData?: ZoningData | null;
  populationData?: PopulationGeoJSON | null;
  populationRangeData?: PopulationRangeData | null;
  landpricesubdData?: LandPriceSubdGeoJSON | null;
  landpricesubdRangeData?: LandPriceSubdRangeData | null;
  boundmunData?: BoundMunGeoJSON | null;
  boundtambonData?: BoundTambonGeoJSON | null;
  boundamphoeData?: BoundAmphoeGeoJSON | null;
  boundprovinceData?: BoundProvinceGeoJSON | null;
  gatecountData?: GateCountGeoJSON | null;
  busstopData?: BusStopGeoJSON | null;
  busrouteData?: BusRouteGeoJSON | null;
  LRTrouteData?: LRTRouteGeoJSON | null;
  landId?: string;
  isLoading: boolean;
}

export interface LegendItem {
  color: string;
  label: string;
  min: number | string;
  max: number | string;
}

export interface LayerStyle {
  getLegendItems: (data: any) => LegendItem[];
}

export interface LayerConfig {
  key: string;
  displayName: string;
  style: LayerStyle;
  rangeData?: any;
}

export interface RangeLegendProps {
  selectedLayerKeys?: string[];
  populationRangeData?: any;
  landpricesubdRangeData?: any;
  // สำหรับเพิ่ม layer ใหม่ในอนาคต
  [key: string]: any;
}

export type LegendLayerKey = string;

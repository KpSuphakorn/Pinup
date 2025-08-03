export interface ParkingLotData {
  name: string;
  area: number;
  capacity: number;
  storey: number;
  type: string;
}

export type ParkingLotGeometry =
  | {
      type: "Polygon";
      coordinates: number[][][];
    }
  | {
      type: "MultiPolygon";
      coordinates: number[][][][];
    };

export interface ParkingLotFeature {
  type: "Feature";
  geometry: ParkingLotGeometry;
  properties: ParkingLotData;
}

export interface ParkingLotGeoJSON {
  type: "FeatureCollection";
  features: ParkingLotFeature[];
}

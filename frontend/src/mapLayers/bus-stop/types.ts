export interface BusStopData {
  name: string;
  display_name: string;
}

export interface BusStopFeature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number, number?, number?];
  };
  properties: BusStopData;
}

export interface BusStopGeoJSON {
  type: "FeatureCollection";
  features: BusStopFeature[];
}

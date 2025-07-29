export interface GateCountStatistics {
  weekday_morning: {
    count: number;
    per_10h: number;
  };
  weekday_evening: {
    count: number;
    per_10h: number;
  };
  weekday_night: {
    count: number;
    per_10h: number;
  };
  total: {
    count: number;
    per_10h: number;
  };
}

export interface GateCountData {
  gate_code: string;
  zone: number;
  point_name: string;
  display_name: string;
  statistics: GateCountStatistics;
  label: string;
  description: string;
}

export interface GateCountFeature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number, number?, number?];
  };
  properties: GateCountData;
}

export interface GateCountGeoJSON {
  type: "FeatureCollection";
  features: GateCountFeature[];
}

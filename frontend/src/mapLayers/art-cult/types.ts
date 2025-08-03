export interface ArtCultData {
  elevation: number;
  display_data: string;
}

export interface ArtCultFeature {
  type: "Feature";
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
  properties: ArtCultData;
}

export interface ArtCultGeoJSON {
  type: "FeatureCollection";
  features: ArtCultFeature[];
}

import { Feature, Geometry, FeatureCollection } from 'geojson';
import { PopulationGeoJSON, PopulationRangeData } from '@/libs/population';

export interface ZoningData {
  feature: Feature<Geometry, { id: number; name: string }>;
}

export interface OsmFeature {
  type: 'Feature';
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

export interface MapLayersProps {
  osmData?: FeatureCollection;
  zoningData?: ZoningData;
  populationData?: PopulationGeoJSON;
  populationRangeData?: PopulationRangeData;
  landId?: string;
  isLoading: boolean;
}
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
  osmData?: FeatureCollection<Geometry, any> | null;
  zoningData?: ZoningData | null;
  populationData?: PopulationGeoJSON | null;
  populationRangeData?: PopulationRangeData | null;
  landId?: string;
  isLoading: boolean;
}
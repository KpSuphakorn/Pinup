import { Feature, Geometry } from 'geojson';

const ROAD_COLORS = {
  primary: '#FF0000',
  secondary: '#FF6600',
  tertiary: '#FFB300',
  trunk: '#CC0000',
  residential: '#3366FF',
  default: '#666666'
} as const;

const LANDUSE_COLORS = {
  residential: { fill: '#FFE082', stroke: '#FF8F00' },
  commercial: { fill: '#FFAB91', stroke: '#D84315' },
  industrial: { fill: '#CE93D8', stroke: '#7B1FA2' },
  retail: { fill: '#F48FB1', stroke: '#C2185B' },
  forest: { fill: '#A5D6A7', stroke: '#2E7D32' },
  grass: { fill: '#C8E6C9', stroke: '#388E3C' },
  recreation_ground: { fill: '#81C784', stroke: '#4CAF50' },
  cemetery: { fill: '#E1BEE7', stroke: '#9C27B0' },
  education: { fill: '#90CAF9', stroke: '#1976D2' },
  default: { fill: '#E0E0E0', stroke: '#757575' }
} as const;

const AMENITY_COLORS = {
  school: { fill: '#E3F2FD', stroke: '#0D47A1' },
  hospital: { fill: '#FFEBEE', stroke: '#B71C1C' },
  police: { fill: '#F3E5F5', stroke: '#4A148C' },
  fire_station: { fill: '#FFF3E0', stroke: '#E65100' },
  place_of_worship: { fill: '#F9FBE7', stroke: '#33691E' },
  default: { fill: '#FAFAFA', stroke: '#424242' }
} as const;

function getHighwayStyle(highway: string) {
  const color = ROAD_COLORS[highway as keyof typeof ROAD_COLORS] || ROAD_COLORS.default;
  const weight = highway === 'primary' ? 5 : highway === 'secondary' ? 4 : 3;
  
  return {
    color,
    weight,
    fillOpacity: 0,
    opacity: 0.9,
    dashArray: undefined
  };
}

function getLanduseStyle(landuse: string) {
  const colors = LANDUSE_COLORS[landuse as keyof typeof LANDUSE_COLORS] || LANDUSE_COLORS.default;
  
  return {
    color: colors.stroke,
    fillColor: colors.fill,
    weight: 2,
    fillOpacity: 0.7,
    opacity: 1,
    dashArray: undefined
  };
}

function getBoundaryStyle(boundary: string) {
  return {
    color: boundary === 'administrative' ? '#E91E63' : '#FF5722',
    weight: boundary === 'administrative' ? 4 : 3,
    fillOpacity: 0,
    opacity: 0.9,
    dashArray: '8, 4'
  };
}

function getBuildingStyle() {
  return {
    color: '#5D4037',
    fillColor: '#8D6E63',
    weight: 1,
    fillOpacity: 0.8,
    opacity: 1,
    dashArray: undefined
  };
}

function getAmenityStyle(amenity: string) {
  const colors = AMENITY_COLORS[amenity as keyof typeof AMENITY_COLORS] || AMENITY_COLORS.default;
  
  return {
    color: colors.stroke,
    fillColor: colors.fill,
    weight: 2,
    fillOpacity: 0.8,
    opacity: 1,
    dashArray: undefined
  };
}

function getStyle(feature?: Feature<Geometry, any>) {
  const props = feature?.properties || {};
  const { highway, landuse, boundary, building, amenity } = props;

  if (highway) return getHighwayStyle(highway);
  if (landuse) return getLanduseStyle(landuse);
  if (boundary) return getBoundaryStyle(boundary);
  if (building) return getBuildingStyle();
  if (amenity) return getAmenityStyle(amenity);

  // Default style
  return {
    color: '#9E9E9E',
    fillColor: '#F5F5F5',
    weight: 1,
    fillOpacity: 0.3,
    opacity: 0.7,
    dashArray: undefined
  };
}

export const osmStyles = {
  getStyle,
  ROAD_COLORS,
  LANDUSE_COLORS,
  AMENITY_COLORS
};
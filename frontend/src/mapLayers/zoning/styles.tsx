import { Feature, Geometry } from 'geojson';

const ZONING_COLORS = {
  'Residential Zone': { fill: '#BBDEFB', stroke: '#1976D2' },
  'Commercial Zone': { fill: '#FFCDD2', stroke: '#D32F2F' },
  'Industrial Zone': { fill: '#E1BEE7', stroke: '#7B1FA2' },
  'Mixed Use': { fill: '#FFE0B2', stroke: '#F57C00' },
  'Agricultural': { fill: '#DCEDC8', stroke: '#689F38' },
  'Recreation': { fill: '#C8E6C9', stroke: '#388E3C' },
  default: { fill: '#F5F5F5', stroke: '#9E9E9E' }
} as const;

function getStyle(feature?: Feature<Geometry, any>) {
  const name = feature?.properties?.name;
  const colors = ZONING_COLORS[name as keyof typeof ZONING_COLORS] || ZONING_COLORS.default;
  
  return {
    color: colors.stroke,
    fillColor: colors.fill,
    weight: 4,
    fillOpacity: 0.6,
    opacity: 1,
    dashArray: '15, 10'
  };
}

export const zoningStyles = {
  getStyle,
  ZONING_COLORS
};
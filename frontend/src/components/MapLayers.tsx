import dynamic from 'next/dynamic';
import { createOsmPopup, createZoningPopup, createPopulationPopup } from '@/utils/popupUtils';
import { osmStyles } from '@/styles/osmStyles';
import { zoningStyles } from '@/styles/zoningStyles';
import { populationStyles } from '@/styles/populationStyles';
import { MapLayersProps } from '@/types/index';

const GeoJSON = dynamic(() => import('react-leaflet').then(mod => mod.GeoJSON), { ssr: false });

export function MapLayers({ 
  osmData, 
  zoningData, 
  populationData, 
  populationRangeData,
  landId, 
  isLoading 
}: MapLayersProps) {
  if (isLoading) return null;

  return (
    <>
      {/* OSM Layer */}
      {osmData?.features.length && (
        <GeoJSON
          key="osm-layer"
          data={osmData}
          style={osmStyles.getStyle}
          onEachFeature={(feature, layer) => {
            const popupContent = createOsmPopup(feature);
            layer.bindPopup(popupContent);
          }}
        />
      )}

      {/* Population Layer */}
      {populationData?.features.length && populationRangeData && (
        <GeoJSON
          key="population-layer"
          data={populationData}
          style={populationStyles.createStyleFunction(populationRangeData)}
          onEachFeature={(feature, layer) => {
            const popupContent = createPopulationPopup(feature);
            layer.bindPopup(popupContent);
          }}
        />
      )}

      {/* Zoning Layer */}
      {zoningData && (
        <GeoJSON
          key={`zoning-${landId}`}
          data={zoningData.feature}
          style={zoningStyles.getStyle}
          onEachFeature={(feature, layer) => {
            const popupContent = createZoningPopup(feature);
            layer.bindPopup(popupContent);
          }}
        />
      )}
    </>
  );
}
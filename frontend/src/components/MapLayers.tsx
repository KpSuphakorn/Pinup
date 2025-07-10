import dynamic from 'next/dynamic';
import { createOsmPopup, createZoningPopup } from '@/utils/popupUtils';
import { osmStyles } from '@/styles/osmStyles';
import { zoningStyles } from '@/styles/zoningStyles';
import { MapLayersProps } from '@/types/map';

const GeoJSON = dynamic(() => import('react-leaflet').then(mod => mod.GeoJSON), { ssr: false });

export function MapLayers({ osmData, zoningData, landId, isLoading }: MapLayersProps) {
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
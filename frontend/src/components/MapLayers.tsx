import dynamic from 'next/dynamic';
import { FeatureCollection, Geometry } from 'geojson';
import { ZoningData } from '@/types';
import { createOsmPopup, createZoningPopup } from '@/utils/popupUtils';
import { osmStyles } from '@/styles/osmStyles';
import { zoningStyles } from '@/styles/zoningStyles';

const GeoJSON = dynamic(() => import('react-leaflet').then(mod => mod.GeoJSON), { ssr: false });

interface MapLayersProps {
  osmData: FeatureCollection<Geometry, any> | null;
  zoningData: ZoningData | null;
  landId: number;
  isLoading: boolean;
}

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
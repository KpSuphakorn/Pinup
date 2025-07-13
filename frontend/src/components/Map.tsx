'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { MapLoading } from './MapLoading';
import { MapLayers } from './MapLayers';
import { fixLeafletIcons } from '@/utils/leafletFix';
import { useMapData } from '@/hooks/useMapData';
import { MapProps } from '@/types/map';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const LayerControlWrapper = dynamic(() => import('./LayerControlWrapper'), { ssr: false });

export default function Map({ landId }: MapProps) {
  const [isClient, setIsClient] = useState(false);
  const { zoningData, osmData, populationData, populationRangeData, landpricesubdData, landpricesubdRangeData, isLoading } = useMapData(landId, isClient);

  useEffect(() => {
    setIsClient(true);
    fixLeafletIcons();
  }, []);

  if (!isClient) return <MapLoading />;

  return (
    <MapContainer center={[13.7563, 100.5018]} zoom={16} className="map-container">
      <LayerControlWrapper />
      <MapLayers
        // osmData={osmData}
        // zoningData={zoningData}
        // populationData={populationData}
        // populationRangeData={populationRangeData}
        landpricesubdData={landpricesubdData}
        landpricesubdRangeData={landpricesubdRangeData}
        landId={landId.toString()}
        isLoading={isLoading}
      />
    </MapContainer>
  );
}
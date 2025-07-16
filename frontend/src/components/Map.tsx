'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { fixLeafletIcons } from '@/utils/leafletFix';
import { useMapData } from '@/hooks/useMapData';
import { MapProps } from '@/types/map';
import { LayerOption } from '@/utils/layerUtils';
import LayerSelector from './LayerSelector';
import { MapLoading } from './MapLoading';
import { MapLayers } from './MapLayers';
import RangeLegend from './RangeLegend';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const LayerControlWrapper = dynamic(() => import('./LayerControlWrapper'), { ssr: false });

export default function Map({ landId }: MapProps) {
  const [isClient, setIsClient] = useState(false);
  const [selectedLayers, setSelectedLayers] = useState<LayerOption[]>(['none']);
  const [isLoadingLayers, setIsLoadingLayers] = useState(false);

  const shouldFetchData = selectedLayers.some(layer => layer !== 'none');
  const {
    zoningData, osmData, populationData, populationRangeData,
    landpricesubdData, landpricesubdRangeData,
    boundmunData,
    isLoading
  } = useMapData(landId, isClient && shouldFetchData);

  useEffect(() => {
    setIsClient(true);
    fixLeafletIcons();
  }, []);

  // แปลง selectedLayers เป็น keys ที่ RangeLegend เข้าใจ
  const selectedLayerKeys = selectedLayers
    .filter(layer => layer === 'population' || layer === 'landprice')
    .map(layer => layer as string);

  if (!isClient || isLoadingLayers || (shouldFetchData && isLoading)) return <MapLoading />;

  return (
    <div className="relative w-full h-full">
      {/* Floating Components */}
      <div className="absolute top-12 right-4 z-[1000] space-y-2">
        <LayerSelector
          selectedLayers={selectedLayers}
          setSelectedLayers={(layers) => {
            setSelectedLayers(layers);
            setIsLoadingLayers(true);
            setTimeout(() => setIsLoadingLayers(false), 1000);
          }}
        />
        <RangeLegend
          selectedLayerKeys={selectedLayerKeys}
          populationRangeData={selectedLayers.includes('population') ? populationRangeData : undefined}
          landpricesubdRangeData={selectedLayers.includes('landprice') ? landpricesubdRangeData : undefined}
        />
      </div>

      {/* แผนที่ */}
      <MapContainer
        center={[13.7563, 100.5018]}
        zoom={16}
        className="map-container z-0"
      >
        <LayerControlWrapper />
        <MapLayers
          osmData={selectedLayers.includes('osm') ? osmData : null}
          zoningData={selectedLayers.includes('zoning') ? zoningData : null}
          populationData={selectedLayers.includes('population') ? populationData : null}
          populationRangeData={selectedLayers.includes('population') ? populationRangeData : null}
          landpricesubdData={selectedLayers.includes('landprice') ? landpricesubdData : null}
          landpricesubdRangeData={selectedLayers.includes('landprice') ? landpricesubdRangeData : null}
          boundmunData={selectedLayers.includes('boundmun') ? boundmunData : null} 
          landId={landId.toString()}
          isLoading={false}
        />
      </MapContainer>
    </div>
  );
}

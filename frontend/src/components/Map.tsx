'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState, useMemo } from 'react';
import { fixLeafletIcons } from '@/utils/leafletFix';
import { useMapData } from '@/hooks/useMapData';
import { MapProps } from '@/types/map';
import { LayerOption, getMapCenterByLayers } from '@/utils/layerUtils';
import LayerSelector from './LayerSelector';
import CNXPopYearSelector from '@/components/CNXPopYearSelector';
import { MapLoading } from './MapLoading';
import { MapLayers } from './MapLayers';
import RangeLegend from './RangeLegend';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const LayerControlWrapper = dynamic(() => import('./LayerControlWrapper'), { ssr: false });
const FlyToCoordinates = dynamic(() => import('./FlyToCoordinates'), { ssr: false });

export default function Map({ landId }: MapProps) {
  const [isClient, setIsClient] = useState(false);
  const [selectedLayers, setSelectedLayers] = useState<LayerOption[]>(['none']);
  const [isLoadingLayers, setIsLoadingLayers] = useState(false);
  const [popYear, setPopYear] = useState<number>(64);

  const shouldFetchData = selectedLayers.some(layer => layer !== 'none');

  const {
    zoningData, osmData, populationData, populationRangeData,
    landpricesubdData, landpricesubdRangeData,
    boundmunData, boundtambonData, boundamphoeData, boundprovinceData,
    gatecountData, busstopData, busrouteData, LRTRouteData, roadData, parkinglotData,
    ruralargiData, recreatenvData, artcultData, lowdenseresareaData, meddenseresareaData, highdenseresareaData,
    pop5564Data, pop5564RangeData,
    isLoading
  } = useMapData(landId, isClient && shouldFetchData, popYear);

  useEffect(() => {
    setIsClient(true);
    fixLeafletIcons();
  }, []);

  const selectedLayerKeys = selectedLayers
    .filter(layer => layer === 'population' || layer === 'landprice')
    .map(layer => layer as string);

  // ตำแหน่ง center ตามชั้นข้อมูล
  const flyTo = useMemo(() => {
    if (!shouldFetchData) return null;
    return getMapCenterByLayers(selectedLayers);
  }, [selectedLayers, shouldFetchData]);

  if (!isClient || isLoadingLayers || (shouldFetchData && isLoading)) return <MapLoading />;

  return (
    <div className="relative w-full h-screen">
      {/* Floating UI */}
      <div className="absolute top-12 right-4 z-[1000] space-y-2">
        <LayerSelector
          selectedLayers={selectedLayers}
          setSelectedLayers={(layers) => {
            setSelectedLayers(layers);
            setIsLoadingLayers(true);
            setTimeout(() => setIsLoadingLayers(false), 1000);
          }}
        />

        {selectedLayers.includes('pop5564') && (
          <CNXPopYearSelector year={popYear} setYear={setPopYear} />
        )}

        <RangeLegend
          selectedLayerKeys={selectedLayerKeys}
          populationRangeData={selectedLayers.includes('population') ? populationRangeData : undefined}
          landpricesubdRangeData={selectedLayers.includes('landprice') ? landpricesubdRangeData : undefined}
          pop5564RangeData={selectedLayers.includes('pop5564') ? pop5564RangeData : undefined}
        />
      </div>

      {/* Map */}
      <MapContainer center={[13.7563, 100.5018]} zoom={16} className="map-container z-0 w-full h-full">
        {flyTo && (
          <FlyToCoordinates
            center={flyTo}
            zoom={13}
            shouldFly={true}
          />
        )}

        <LayerControlWrapper />
        <MapLayers
          osmData={selectedLayers.includes('osm') ? osmData : null}
          zoningData={selectedLayers.includes('zoning') ? zoningData : null}
          populationData={selectedLayers.includes('population') ? populationData : null}
          populationRangeData={selectedLayers.includes('population') ? populationRangeData : null}
          landpricesubdData={selectedLayers.includes('landprice') ? landpricesubdData : null}
          landpricesubdRangeData={selectedLayers.includes('landprice') ? landpricesubdRangeData : null}
          boundmunData={selectedLayers.includes('boundmun') ? boundmunData : null}
          boundtambonData={selectedLayers.includes('boundtambon') ? boundtambonData : null}
          boundamphoeData={selectedLayers.includes('boundamphoe') ? boundamphoeData : null}
          boundprovinceData={selectedLayers.includes('boundprovince') ? boundprovinceData : null}
          gatecountData={selectedLayers.includes('gatecount') ? gatecountData : null}
          busstopData={selectedLayers.includes('busstop') ? busstopData : null}
          busrouteData={selectedLayers.includes('busroute') ? busrouteData : null}
          LRTrouteData={selectedLayers.includes('LRTroute') ? LRTRouteData : null}
          roadData={selectedLayers.includes('road') ? roadData : null}
          parkinglotData={selectedLayers.includes('parkinglot') ? parkinglotData : null}
          ruralargiData={selectedLayers.includes('ruralargi') ? ruralargiData : null}
          recreatenvData={selectedLayers.includes('recreatenv') ? recreatenvData : null}
          artcultData={selectedLayers.includes('artcult') ? artcultData : null}
          lowdenseresareaData={selectedLayers.includes('lowdenseresarea') ? lowdenseresareaData : null}
          meddenseresareaData={selectedLayers.includes('meddenseresarea') ? meddenseresareaData : null}
          highdenseresareaData={selectedLayers.includes('highdenseresarea') ? highdenseresareaData : null}
          pop5564Data={selectedLayers.includes('pop5564') ? pop5564Data : null}
          pop5564RangeData={selectedLayers.includes('pop5564') ? pop5564RangeData : null}
          pop5564Year={popYear}
          landId={landId.toString()}
          isLoading={false}
        />

      </MapContainer>
    </div>
  );
}
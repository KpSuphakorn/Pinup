import { useState, useEffect } from 'react';
import { FeatureCollection, Geometry } from 'geojson';
import { getZoning } from '@/libs/zoning';
import { getOsmData } from '@/libs/osm';
import { getPopulationMapData} from '@/libs/getPopulationData';
import { PopulationGeoJSON, PopulationRangeData, ZoningData } from '@/types';
import { getPopulationRange } from '@/libs/getPopulationRange';

export function useMapData(landId: number, isClient: boolean) {
  const [zoningData, setZoningData] = useState<ZoningData | null>(null);
  const [osmData, setOsmData] = useState<FeatureCollection<Geometry, any> | null>(null);
  const [populationData, setPopulationData] = useState<PopulationGeoJSON | null>(null);
  const [populationRangeData, setPopulationRangeData] = useState<PopulationRangeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isClient) return;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const [zoningResponse, osmResponse, populationResponse, populationRangeResponse] = await Promise.allSettled([
          getZoning(landId),
          getOsmData(),
          getPopulationMapData(),
          getPopulationRange()
        ]);

        // Handle zoning data
        if (zoningResponse.status === 'fulfilled' && !zoningResponse.value.error) {
          const data = zoningResponse.value;
          setZoningData({
            feature: {
              type: 'Feature',
              properties: { id: data.id, name: data.name },
              geometry: data.geometry
            }
          });
        }

        // Handle OSM data
        if (osmResponse.status === 'fulfilled') {
          const data = osmResponse.value;
          setOsmData({
            type: 'FeatureCollection',
            features: Array.isArray(data) ? data : []
          });
        }

        // Handle population map data
        if (populationResponse.status === 'fulfilled') {
          const data = populationResponse.value;
          setPopulationData(data);
          console.log('populationData:', data); // เช็คข้อมูลที่ได้
        } else {
          console.error('Failed to fetch population map data:', populationResponse.reason);
        }

        // Handle population range data
        if (populationRangeResponse.status === 'fulfilled') {
          const data = populationRangeResponse.value;
          setPopulationRangeData(data);
          console.log('populationRangeData:', data); // เช็คข้อมูลที่ได้
        } else {
          console.error('Failed to fetch population range data:', populationRangeResponse.reason);
        }

      } catch (error) {
        console.error('Error fetching map data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [landId, isClient]);

  return {
    zoningData,
    osmData,
    populationData,
    populationRangeData,
    isLoading
  };
}
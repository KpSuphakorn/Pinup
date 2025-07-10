import { useState, useEffect } from 'react';
import { FeatureCollection, Geometry } from 'geojson';
import { getZoning } from '@/libs/zoning';
import { getOsmData } from '@/libs/osm';
import { ZoningData } from '@/types';

export function useMapData(landId: number, isClient: boolean) {
  const [zoningData, setZoningData] = useState<ZoningData | null>(null);
  const [osmData, setOsmData] = useState<FeatureCollection<Geometry, any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isClient) return;

    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        const [zoningResponse, osmResponse] = await Promise.allSettled([
          getZoning(landId),
          getOsmData()
        ]);

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

        if (osmResponse.status === 'fulfilled') {
          const data = osmResponse.value;
          setOsmData({
            type: 'FeatureCollection',
            features: Array.isArray(data) ? data : []
          });
        }
      } catch (error) {
        console.error('Error fetching map data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [landId, isClient]);

  return { zoningData, osmData, isLoading };
}
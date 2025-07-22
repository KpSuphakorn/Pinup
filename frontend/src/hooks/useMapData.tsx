import { useState, useEffect } from 'react';
import { FeatureCollection, Geometry } from 'geojson';
import { PopulationGeoJSON, PopulationRangeData, ZoningData, LandPriceSubdGeoJSON, LandPriceSubdRangeData, BoundMunGeoJSON, BoundTambonGeoJSON, BoundAmphoeGeoJSON, BoundProvinceGeoJSON } from '@/types';
import { getZoning } from '@/libs/zoning';
import { getOsmData } from '@/libs/osm';
import { getPopulationMapData } from '@/libs/getPopulationData';
import { getPopulationRange } from '@/libs/getPopulationRange';
import { getLandPriceMapData } from '@/libs/getLandPriceSubdData';
import { getLandPriceRange } from '@/libs/getLandPriceSubdRange';
import { getBoundMunData } from '@/libs/CNX/getBoundMunData';
import { getBoundTambonData } from '@/libs/CNX/getBoundTambonData';
import { getBoundAmphoeData } from '@/libs/CNX/getBoundAmphoeData';
import { getBoundProvinceData } from '@/libs/CNX/getBoundProvinceData';

export function useMapData(landId: number, isClient: boolean) {
  const [zoningData, setZoningData] = useState<ZoningData | null>(null);
  const [osmData, setOsmData] = useState<FeatureCollection<Geometry, any> | null>(null);
  const [populationData, setPopulationData] = useState<PopulationGeoJSON | null>(null);
  const [populationRangeData, setPopulationRangeData] = useState<PopulationRangeData | null>(null);
  const [landpricesubdData, setLandPriceSubdData] = useState<LandPriceSubdGeoJSON | null>(null);
  const [landpricesubdRangeData, setLandPriceSubdRangeData] = useState<LandPriceSubdRangeData | null>(null);
  const [boundmunData, setBoundMunData] = useState<BoundMunGeoJSON | null>(null);
  const [boundtambonData, setBoundTambonData] = useState<BoundTambonGeoJSON | null>(null);
  const [boundamphoeData, setBoundAmphoeData] = useState<BoundAmphoeGeoJSON | null>(null);
  const [boundprovinceData, setBoundProvinceData] = useState<BoundProvinceGeoJSON | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isClient) return;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const [zoningResponse, osmResponse, populationResponse, populationRangeResponse, landpricesubdResponse, landpricesubdRangeResponse, boundmunResponse, boundtambonResponse, boundamphoeResponse, boundprovinceResponse] = await Promise.allSettled([
          getZoning(landId),
          getOsmData(),
          getPopulationMapData(),
          getPopulationRange(),
          getLandPriceMapData(),
          getLandPriceRange(),
          getBoundMunData(),
          getBoundTambonData(),
          getBoundAmphoeData(),
          getBoundProvinceData(),
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
        } else {
          console.error('Failed to fetch population map data:', populationResponse.reason);
        }

        // Handle population range data
        if (populationRangeResponse.status === 'fulfilled') {
          const data = populationRangeResponse.value;
          setPopulationRangeData(data);
        } else {
          console.error('Failed to fetch population range data:', populationRangeResponse.reason);
        }

        // Handle land price map data
        if (landpricesubdResponse.status === 'fulfilled') {
          const data = landpricesubdResponse.value;
          setLandPriceSubdData(data);
        } else {
          console.error('Failed to fetch land price subdistrict map data:', landpricesubdResponse.reason);
        }

        // Handle land price range data
        if (landpricesubdRangeResponse.status === 'fulfilled') {
          const data = landpricesubdRangeResponse.value;
          setLandPriceSubdRangeData(data);
        } else {
          console.error('Failed to fetch land price subdistrict range data:', landpricesubdRangeResponse.reason);
        }

        // Handle bound municipality data
        if (boundmunResponse.status === 'fulfilled') {
          const data = boundmunResponse.value;
          setBoundMunData(data);
        } else {
          console.error('Failed to fetch bound municipality data:', boundmunResponse.reason);
        }

        // Handle bound tambon data
        if (boundtambonResponse.status === 'fulfilled') {
          const data = boundtambonResponse.value;
          setBoundTambonData(data);
        } else {
          console.error('Failed to fetch bound tambon data:', boundtambonResponse.reason);
        }

        // Handle bound amphoe data
        if (boundamphoeResponse.status === 'fulfilled') {
          const data = boundamphoeResponse.value;
          setBoundAmphoeData(data);
        } else {
          console.error('Failed to fetch bound municipality data:', boundamphoeResponse.reason);
        }

        // Handle bound province data
        if (boundprovinceResponse.status === 'fulfilled') {
          const data = boundprovinceResponse.value;
          setBoundProvinceData(data);
        } else {
          console.error('Failed to fetch bound province data:', boundprovinceResponse.reason);
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
    landpricesubdData,
    landpricesubdRangeData,
    boundmunData,
    boundtambonData,
    boundamphoeData,
    boundprovinceData,
    isLoading
  };
}
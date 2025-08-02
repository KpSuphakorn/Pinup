import { useState, useEffect } from 'react';
import { FeatureCollection, Geometry } from 'geojson';
import { PopulationGeoJSON, PopulationRangeData, ZoningData, LandPriceSubdGeoJSON, LandPriceSubdRangeData, BoundMunGeoJSON, BoundTambonGeoJSON, BoundAmphoeGeoJSON, BoundProvinceGeoJSON, GateCountGeoJSON, BusStopGeoJSON, BusRouteGeoJSON, LRTRouteGeoJSON, RoadGeoJSON, ParkingLotGeoJSON, RuralArgiGeoJSON, RecreatEnvGeoJSON, ArtCultGeoJSON, LowDenseResAreaGeoJSON } from '@/types';
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
import { getGateCountData } from '@/libs/CNX/getGateCountData';
import { getBusStopData } from '@/libs/CNX/getBusStopData'; 
import { getBusRouteData } from '@/libs/CNX/getBusRouteData';
import { getLRTRouteData } from '@/libs/CNX/getLRTRouteData';
import { getRoadData } from '@/libs/CNX/getRoadData';
import { getParkingLotData } from '@/libs/CNX/getParkingLotData';
import { getRuralArgiData } from '@/libs/CNX/getRuralArgiData';
import { getRecreatEnvData } from '@/libs/CNX/getRecreatEnvData';
import { getArtCultData } from '@/libs/CNX/getArtCultData';
import { getLowDenseResAreaData } from '@/libs/CNX/getLowDenseResAreaData';
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
  const [gatecountData, setGateCountData] = useState<GateCountGeoJSON | null>(null);
  const [busstopData, setBusStopData] = useState<BusStopGeoJSON | null>(null);
  const [busrouteData, setBusRouteData] = useState<BusRouteGeoJSON | null>(null);
  const [LRTRouteData, setLRTRouteData] = useState<LRTRouteGeoJSON | null>(null);
  const [roadData, setRoadData] = useState<RoadGeoJSON | null>(null);
  const [parkinglotData, setParkingLotData] = useState<ParkingLotGeoJSON | null>(null);
  const [ruralargiData, setRuralArgiData] = useState<RuralArgiGeoJSON | null>(null);
  const [recreatenvData, setRecreatEnvData] = useState<RecreatEnvGeoJSON | null>(null);
  const [artcultData, setArtCultData] = useState<ArtCultGeoJSON | null>(null);
  const [lowdenseresareaData, setLowDenseResAreaData] = useState<LowDenseResAreaGeoJSON | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isClient) return;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const [zoningResponse, osmResponse, populationResponse, populationRangeResponse, landpricesubdResponse, landpricesubdRangeResponse, boundmunResponse, boundtambonResponse, boundamphoeResponse, boundprovinceResponse, gatecountResponse, busstopResponse, busrouteResponse, LRTrouteResponse, roadResponse, parkinglotResponse, ruralargiResponse, recreatenvResponse, artcultResponse, lowdenseresareaResponse] = await Promise.allSettled([
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
          getGateCountData(),
          getBusStopData(),
          getBusRouteData(),
          getLRTRouteData(),
          getRoadData(),
          getParkingLotData(),
          getRuralArgiData(),
          getRecreatEnvData(),
          getArtCultData(),
          getLowDenseResAreaData(),
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

        // Handle gate count data
        if (gatecountResponse.status === 'fulfilled') {
          const data = gatecountResponse.value;
          setGateCountData(data);
        } else {
          console.error('Failed to fetch gate count data:', gatecountResponse.reason);
        }

        // Handle bus stop data
        if (busstopResponse.status === 'fulfilled') {
          const data = busstopResponse.value;
          setBusStopData(data);
        } else {
          console.error('Failed to fetch bus stop data:', busstopResponse.reason);
        }

        // Handle bus route data
        if (busrouteResponse.status === 'fulfilled') {
          const data = busrouteResponse.value;
          setBusRouteData(data);
        } else {
          console.error('Failed to fetch bus route data:', busrouteResponse.reason);
        }

        // Handle LRT route data
        if (LRTrouteResponse.status === 'fulfilled') {
          const data = LRTrouteResponse.value;
          setLRTRouteData(data);
        } else {
          console.error('Failed to fetch LRT route data:', LRTrouteResponse.reason);
        }

        // Handle Road data
        if (roadResponse.status === 'fulfilled') {
          const data = roadResponse.value;
          setRoadData(data);
        } else {
          console.log('Failed to fetch Road data: ', roadResponse.reason);
        }

        // Handle Parking Lot data
        if (parkinglotResponse.status === 'fulfilled') {
          const data = parkinglotResponse.value;
          setParkingLotData(data);
          console.log(data);
        } else {
          console.log('Failed to fetch Parking Lot data: ', parkinglotResponse.reason);
        }

        // Handle Rural & Argicultural data
        if (ruralargiResponse.status === 'fulfilled') {
          const data = ruralargiResponse.value;
          setRuralArgiData(data);
        } else {
          console.error('Failed to fetch Rural & Argicultural data:', ruralargiResponse.reason);
        }

        // Handle Recreate & Environment data
        if (recreatenvResponse.status === 'fulfilled') {
          const data = recreatenvResponse.value;
          setRecreatEnvData(data);
        } else {
          console.error('Failed to fetch Recreate & Environment data:',recreatenvResponse.reason);
        }

        // Handle Art & Culture data
        if (artcultResponse.status === 'fulfilled') {
          const data = artcultResponse.value;
          setArtCultData(data);
        } else {
          console.error('Failed to fetch Art & Culture data:',artcultResponse.reason);
        }

        // Handle Low-density Residential Area data
        if (lowdenseresareaResponse.status === 'fulfilled') {
          const data = lowdenseresareaResponse.value;
          setLowDenseResAreaData(data);
        } else {
          console.log('Failed to fetch Low-density residential area data: ' ,lowdenseresareaResponse.reason);
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
    gatecountData,
    busstopData,
    busrouteData,
    LRTRouteData,
    roadData,
    parkinglotData,
    ruralargiData,
    recreatenvData,
    artcultData,
    lowdenseresareaData,
    isLoading
  };
}
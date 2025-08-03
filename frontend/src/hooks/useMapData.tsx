import { useState, useEffect } from "react";
import { FeatureCollection, Geometry } from "geojson";
import {
  PopulationGeoJSON,
  PopulationRangeData,
} from "@/mapLayers/population/types";
import { ZoningData } from "@/mapLayers/zoning/types";
import {
  LandPriceSubdGeoJSON,
  LandPriceSubdRangeData,
} from "@/mapLayers/landprice-subd/types";
import { BoundMunGeoJSON } from "@/mapLayers/bound-mun/types";
import { BoundTambonGeoJSON } from "@/mapLayers/bound-tambon/types";
import { BoundAmphoeGeoJSON } from "@/mapLayers/bound-amphoe/types";
import { BoundProvinceGeoJSON } from "@/mapLayers/bound-province/types";
import { GateCountGeoJSON } from "@/mapLayers/gate-count/types";
import { BusStopGeoJSON } from "@/mapLayers/bus-stop/types";
import { BusRouteGeoJSON } from "@/mapLayers/bus-route/types";
import { LRTRouteGeoJSON } from "@/mapLayers/lrt-route/types";
import { RoadGeoJSON } from "@/mapLayers/road/types";
import { ParkingLotGeoJSON } from "@/mapLayers/parking-lot/types";
import { RuralArgiGeoJSON } from "@/mapLayers/rural-argi/types";
import { RecreatEnvGeoJSON } from "@/mapLayers/recreat-env/types";
import { ArtCultGeoJSON } from "@/mapLayers/art-cult/types";
import { LowDenseResAreaGeoJSON } from "@/mapLayers/low-dense-res-area/types";
import { getZoning } from "@/mapLayers/zoning/get-data";
import { getOsmData } from "@/mapLayers/osm/get-data";
import { getPopulationMapData } from "@/mapLayers/population/get-data";
import { getPopulationRange } from "@/mapLayers/population/get-range";
import { getLandPriceMapData } from "@/mapLayers/landprice-subd/get-data";
import { getLandPriceRange } from "@/mapLayers/landprice-subd/get-range";
import { getBoundMunData } from "@/mapLayers/bound-mun/get-data";
import { getBoundTambonData } from "@/mapLayers/bound-tambon/get-data";
import { getBoundAmphoeData } from "@/mapLayers/bound-amphoe/get-data";
import { getBoundProvinceData } from "@/mapLayers/bound-province/get-data";
import { getGateCountData } from "@/mapLayers/gate-count/get-data";
import { getBusStopData } from "@/mapLayers/bus-stop/get-data";
import { getBusRouteData } from "@/mapLayers/bus-route/get-data";
import { getLRTRouteData } from "@/mapLayers/lrt-route/get-data";
import { getRoadData } from "@/mapLayers/road/get-data";
import { getParkingLotData } from "@/mapLayers/parking-lot/get-data";
import { getRuralArgiData } from "@/mapLayers/rural-argi/get-data";
import { getRecreatEnvData } from "@/mapLayers/recreat-env/get-data";
import { getArtCultData } from "@/mapLayers/art-cult/get-data";
import { getLowDenseResAreaData } from "@/mapLayers/low-dense-res-area/get-data";
export function useMapData(landId: number, isClient: boolean) {
  const [zoningData, setZoningData] = useState<ZoningData | null>(null);
  const [osmData, setOsmData] = useState<FeatureCollection<
    Geometry,
    any
  > | null>(null);
  const [populationData, setPopulationData] =
    useState<PopulationGeoJSON | null>(null);
  const [populationRangeData, setPopulationRangeData] =
    useState<PopulationRangeData | null>(null);
  const [landpricesubdData, setLandPriceSubdData] =
    useState<LandPriceSubdGeoJSON | null>(null);
  const [landpricesubdRangeData, setLandPriceSubdRangeData] =
    useState<LandPriceSubdRangeData | null>(null);
  const [boundmunData, setBoundMunData] = useState<BoundMunGeoJSON | null>(
    null
  );
  const [boundtambonData, setBoundTambonData] =
    useState<BoundTambonGeoJSON | null>(null);
  const [boundamphoeData, setBoundAmphoeData] =
    useState<BoundAmphoeGeoJSON | null>(null);
  const [boundprovinceData, setBoundProvinceData] =
    useState<BoundProvinceGeoJSON | null>(null);
  const [gatecountData, setGateCountData] = useState<GateCountGeoJSON | null>(
    null
  );
  const [busstopData, setBusStopData] = useState<BusStopGeoJSON | null>(null);
  const [busrouteData, setBusRouteData] = useState<BusRouteGeoJSON | null>(
    null
  );
  const [LRTRouteData, setLRTRouteData] = useState<LRTRouteGeoJSON | null>(
    null
  );
  const [roadData, setRoadData] = useState<RoadGeoJSON | null>(null);
  const [parkinglotData, setParkingLotData] =
    useState<ParkingLotGeoJSON | null>(null);
  const [ruralargiData, setRuralArgiData] = useState<RuralArgiGeoJSON | null>(
    null
  );
  const [recreatenvData, setRecreatEnvData] =
    useState<RecreatEnvGeoJSON | null>(null);
  const [artcultData, setArtCultData] = useState<ArtCultGeoJSON | null>(null);
  const [lowdenseresareaData, setLowDenseResAreaData] =
    useState<LowDenseResAreaGeoJSON | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isClient) return;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const [
          zoningResponse,
          osmResponse,
          populationResponse,
          populationRangeResponse,
          landpricesubdResponse,
          landpricesubdRangeResponse,
          boundmunResponse,
          boundtambonResponse,
          boundamphoeResponse,
          boundprovinceResponse,
          gatecountResponse,
          busstopResponse,
          busrouteResponse,
          LRTrouteResponse,
          roadResponse,
          parkinglotResponse,
          ruralargiResponse,
          recreatenvResponse,
          artcultResponse,
          lowdenseresareaResponse,
        ] = await Promise.allSettled([
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
        if (
          zoningResponse.status === "fulfilled" &&
          !zoningResponse.value.error
        ) {
          const data = zoningResponse.value;
          setZoningData({
            feature: {
              type: "Feature",
              properties: { id: data.id, name: data.name },
              geometry: data.geometry,
            },
          });
        }

        // Handle OSM data
        if (osmResponse.status === "fulfilled") {
          const data = osmResponse.value;
          setOsmData({
            type: "FeatureCollection",
            features: Array.isArray(data) ? data : [],
          });
        }

        // Handle population map data
        if (populationResponse.status === "fulfilled") {
          const data = populationResponse.value;
          setPopulationData(data);
        } else {
          console.error(
            "Failed to fetch population map data:",
            populationResponse.reason
          );
        }

        // Handle population range data
        if (populationRangeResponse.status === "fulfilled") {
          const data = populationRangeResponse.value;
          setPopulationRangeData(data);
        } else {
          console.error(
            "Failed to fetch population range data:",
            populationRangeResponse.reason
          );
        }

        // Handle land price map data
        if (landpricesubdResponse.status === "fulfilled") {
          const data = landpricesubdResponse.value;
          setLandPriceSubdData(data);
        } else {
          console.error(
            "Failed to fetch land price subdistrict map data:",
            landpricesubdResponse.reason
          );
        }

        // Handle land price range data
        if (landpricesubdRangeResponse.status === "fulfilled") {
          const data = landpricesubdRangeResponse.value;
          setLandPriceSubdRangeData(data);
        } else {
          console.error(
            "Failed to fetch land price subdistrict range data:",
            landpricesubdRangeResponse.reason
          );
        }

        // Handle bound municipality data
        if (boundmunResponse.status === "fulfilled") {
          const data = boundmunResponse.value;
          setBoundMunData(data);
        } else {
          console.error(
            "Failed to fetch bound municipality data:",
            boundmunResponse.reason
          );
        }

        // Handle bound tambon data
        if (boundtambonResponse.status === "fulfilled") {
          const data = boundtambonResponse.value;
          setBoundTambonData(data);
        } else {
          console.error(
            "Failed to fetch bound tambon data:",
            boundtambonResponse.reason
          );
        }

        // Handle bound amphoe data
        if (boundamphoeResponse.status === "fulfilled") {
          const data = boundamphoeResponse.value;
          setBoundAmphoeData(data);
        } else {
          console.error(
            "Failed to fetch bound municipality data:",
            boundamphoeResponse.reason
          );
        }

        // Handle bound province data
        if (boundprovinceResponse.status === "fulfilled") {
          const data = boundprovinceResponse.value;
          setBoundProvinceData(data);
        } else {
          console.error(
            "Failed to fetch bound province data:",
            boundprovinceResponse.reason
          );
        }

        // Handle gate count data
        if (gatecountResponse.status === "fulfilled") {
          const data = gatecountResponse.value;
          setGateCountData(data);
        } else {
          console.error(
            "Failed to fetch gate count data:",
            gatecountResponse.reason
          );
        }

        // Handle bus stop data
        if (busstopResponse.status === "fulfilled") {
          const data = busstopResponse.value;
          setBusStopData(data);
        } else {
          console.error(
            "Failed to fetch bus stop data:",
            busstopResponse.reason
          );
        }

        // Handle bus route data
        if (busrouteResponse.status === "fulfilled") {
          const data = busrouteResponse.value;
          setBusRouteData(data);
        } else {
          console.error(
            "Failed to fetch bus route data:",
            busrouteResponse.reason
          );
        }

        // Handle LRT route data
        if (LRTrouteResponse.status === "fulfilled") {
          const data = LRTrouteResponse.value;
          setLRTRouteData(data);
        } else {
          console.error(
            "Failed to fetch LRT route data:",
            LRTrouteResponse.reason
          );
        }

        // Handle Road data
        if (roadResponse.status === "fulfilled") {
          const data = roadResponse.value;
          setRoadData(data);
        } else {
          console.log("Failed to fetch Road data: ", roadResponse.reason);
        }

        // Handle Parking Lot data
        if (parkinglotResponse.status === "fulfilled") {
          const data = parkinglotResponse.value;
          setParkingLotData(data);
          console.log(data);
        } else {
          console.log(
            "Failed to fetch Parking Lot data: ",
            parkinglotResponse.reason
          );
        }

        // Handle Rural & Argicultural data
        if (ruralargiResponse.status === "fulfilled") {
          const data = ruralargiResponse.value;
          setRuralArgiData(data);
        } else {
          console.error(
            "Failed to fetch Rural & Argicultural data:",
            ruralargiResponse.reason
          );
        }

        // Handle Recreate & Environment data
        if (recreatenvResponse.status === "fulfilled") {
          const data = recreatenvResponse.value;
          setRecreatEnvData(data);
        } else {
          console.error(
            "Failed to fetch Recreate & Environment data:",
            recreatenvResponse.reason
          );
        }

        // Handle Art & Culture data
        if (artcultResponse.status === "fulfilled") {
          const data = artcultResponse.value;
          setArtCultData(data);
        } else {
          console.error(
            "Failed to fetch Art & Culture data:",
            artcultResponse.reason
          );
        }

        // Handle Low-density Residential Area data
        if (lowdenseresareaResponse.status === "fulfilled") {
          const data = lowdenseresareaResponse.value;
          setLowDenseResAreaData(data);
        } else {
          console.log(
            "Failed to fetch Low-density residential area data: ",
            lowdenseresareaResponse.reason
          );
        }
      } catch (error) {
        console.error("Error fetching map data:", error);
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
    isLoading,
  };
}

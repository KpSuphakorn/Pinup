'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import L, { Layer } from 'leaflet';
import type { BusRouteFeature } from '@/types';
import { createOsmPopup, createZoningPopup, createPopulationPopup, createLandPriceSubdPopup, createBoundMunPopup, createBoundTambonPopup, createBoundAmphoePopup, createBoundProvincePopup, createGateCountPopup, createBusStopPopup, createBusRoutePopup, createLRTRoutePopup, createRuralArgiPopup, createRecreatEnvPopup, createArtCultPopup } from '@/utils/popupUtils';
import { osmStyles } from '@/styles/osmStyles';
import { zoningStyles } from '@/styles/zoningStyles';
import { populationStyles } from '@/styles/populationStyles';
import { landpricesubdStyles } from '@/styles/landpricesubdStyles';
import { boundmunStyles } from '@/styles/CNX/boundmunStyles';
import { boundtambonStyles } from '@/styles/CNX/boundtambonStyles';
import { boundamphoeStyles } from '@/styles/CNX/boundamphoeStyles';
import { boundprovinceStyles } from '@/styles/CNX/boundprovinceStyles';
import { gatecountStyles } from '@/styles/CNX/gatecountStyles';
import { busstopStyles } from '@/styles/CNX/busstopStyles';
import { busrouteStyles } from '@/styles/CNX/busrouteStyles';
import { LRTrouteStyles } from '@/styles/CNX/LRTrouteStyles';
import { ruralargiStyles } from '@/styles/CNX/ruralargiStyles';
import { recreatenvStyles } from '@/styles/CNX/recreatenvStyles';
import { artcultStyles } from '@/styles/CNX/artcultStyles';
import { MapLayersProps } from '@/types/index';
import { features } from 'process';

const GeoJSON = dynamic(() => import('react-leaflet').then(mod => mod.GeoJSON), { ssr: false });


export function MapLayers({
  osmData,
  zoningData,
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
  LRTrouteData,
  ruralargiData,
  recreatenvData,
  artcultData,
  landId,
  isLoading
}: MapLayersProps) {

  if (isLoading) return null;

  if (typeof window === 'undefined') return null;

  const L = require('leaflet');
  const layerRefs = useRef<Layer[]>([]);

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

      {/* Population Layer */}
      {populationData?.features.length && populationRangeData && (
        <GeoJSON
          key="population-layer"
          data={populationData}
          style={populationStyles.createStyleFunction(populationRangeData)}
          onEachFeature={(feature, layer) => {
            const popupContent = createPopulationPopup(feature);
            layer.bindPopup(popupContent);
          }}
        />
      )}

      {/* LandPriceSubd Layer */}
      {landpricesubdData?.features.length && landpricesubdRangeData && (
        <GeoJSON
          key={`landpricesubd-${landId}`}
          data={landpricesubdData}
          style={landpricesubdStyles.createStyleFunction(landpricesubdRangeData)}
          onEachFeature={(feature, layer) => {
            const popupContent = createLandPriceSubdPopup(feature);
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

      {/* BoundMun Layer */}
      {boundmunData?.features.length && (
        <GeoJSON
          data={boundmunData}
          style={boundmunStyles.getStyle}
          onEachFeature={(feature, layer) => {
            const popupContent = createBoundMunPopup(feature);
            layer.bindPopup(popupContent);
          }}
        />
      )}

      {/* BoundTambon Layer */}
      {boundtambonData?.features.length && (
        <GeoJSON
          data={boundtambonData}
          style={boundtambonStyles.getStyle}
          onEachFeature={(feature, layer) => {
            const popupContent = createBoundTambonPopup(feature);
            layer.bindPopup(popupContent);
          }}
        />
      )}

      {/* BoundAmphoe Layer */}
      {boundamphoeData?.features.length && (
        <GeoJSON
          data={boundamphoeData}
          style={boundamphoeStyles.getStyle}
          onEachFeature={(feature, layer) => {
            const popupContent = createBoundAmphoePopup(feature);
            layer.bindPopup(popupContent);
          }}
        />
      )}

      {/* BoundProvince Layer */}
      {boundprovinceData?.features.length && (
        <GeoJSON
          data={boundprovinceData}
          style={boundprovinceStyles.getStyle}
          onEachFeature={(feature, layer) => {
            const popupContent = createBoundProvincePopup(feature);
            layer.bindPopup(popupContent);
          }}
        />
      )}

      {/* GateCount Layer */}
      {gatecountData?.features.length && (
        <GeoJSON
          data={gatecountData}
          pointToLayer={(feature, latlng) => L.marker(latlng, { icon: gatecountStyles.getStyle(feature) })}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(createGateCountPopup(feature));
          }}
        />
      )}

      {/* BusStop Layer */}
      {busstopData?.features.length && (
        <GeoJSON
          data={busstopData}
          pointToLayer={(feature, latlng) => L.marker(latlng, { icon: busstopStyles.getStyle(feature) })}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(createBusStopPopup(feature));
          }}
        />
      )}

      {/* BusRoute Layer */}
      {Array.isArray(busrouteData?.features) && busrouteData.features.length > 0 && (
        <>
          {busrouteData.features.map((feature: BusRouteFeature, index: number) => (
            <GeoJSON
              key={`busroute-${index}`}
              data={feature}
              style={() => busrouteStyles.getStyle(feature)}
              eventHandlers={{
                add: (e) => {
                  layerRefs.current.push(e.target);
                },
                click: (e) => {
                  const clickedLayer = e.target as L.Path;

                  layerRefs.current.forEach((layer) => {
                    (layer as L.Path).setStyle({ opacity: 0.0 });
                  });

                  clickedLayer.setStyle({ opacity: 1.0 });

                  clickedLayer.bindPopup(createBusRoutePopup(feature)).openPopup();

                  clickedLayer.on('popupclose', () => {
                    layerRefs.current.forEach((layer) => {
                      (layer as L.Path).setStyle({ opacity: 1.0 });
                    });
                  });
                },
              }}
            />
          ))}
        </>
      )}

      {/* LRTRout Layer */}
      {Array.isArray(LRTrouteData?.features) && LRTrouteData.features.length > 0 && (
        <>
          {LRTrouteData.features.map((feature, index) => (
            <GeoJSON
              key={`lrtroute-${index}`}
              data={feature}
              style={() => LRTrouteStyles.getStyle(feature)}
              eventHandlers={{
                add: (e) => {
                  layerRefs.current.push(e.target);
                  console.log("Feature :", feature);
                },
                click: (e) => {
                  const clickedLayer = e.target as L.Path;

                  // ซ่อนเส้นอื่น (ลด opacity)
                  layerRefs.current.forEach((layer) => {
                    (layer as L.Path).setStyle({ opacity: 0.0 });
                  });

                  // เน้นเส้นที่คลิก
                  clickedLayer.setStyle({ opacity: 1.0 });

                  clickedLayer
                    .bindPopup(createLRTRoutePopup(feature))
                    .openPopup();

                  // เมื่อ popup ปิด → แสดงเส้นทั้งหมดตามเดิม
                  clickedLayer.on('popupclose', () => {
                    layerRefs.current.forEach((layer) => {
                      (layer as L.Path).setStyle({ opacity: 1.0 });
                    });
                  });
                },
              }}
            />
          ))}
        </>
      )}

      {/* Rural & Argicultural Layer */}
      {ruralargiData?.features.length && (
        <GeoJSON
          data={ruralargiData}
          style={ruralargiStyles.getStyle}
          onEachFeature={(feature, layer) => {
            const popupContent = createRuralArgiPopup(feature);
            layer.bindPopup(popupContent);
          }}
        />
      )}

      {/* Recreate & Environment Layer */}
      {recreatenvData?.features.length && (
        <GeoJSON
          data={recreatenvData}
          style={recreatenvStyles.getStyle}
          onEachFeature={(feature, layer) => {
            const popupContent = createRecreatEnvPopup(feature);
            layer.bindPopup(popupContent);
          }}
        />
      )}

      {/* Art & Culture Layer */}
      {artcultData?.features.length && (
        <GeoJSON
          data={artcultData}
          style={artcultStyles.getStyle}
          onEachFeature={(feature, layer) => {
            const popupContent = createArtCultPopup(feature);
            layer.bindPopup(popupContent);
          }}
        />
      )}
    </>
  );
}
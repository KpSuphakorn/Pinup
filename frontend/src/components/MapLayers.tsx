'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import L, { Layer } from 'leaflet';
import type { BusRouteFeature } from '@/types';
import { createOsmPopup, createZoningPopup, createPopulationPopup, createLandPriceSubdPopup, createBoundMunPopup, createBoundTambonPopup, createBoundAmphoePopup, createBoundProvincePopup, createGateCountPopup, createBusStopPopup, createBusRoutePopup, createLRTRoutePopup, createRoadPopup, createParkingLotPopup, createRuralArgiPopup, createRecreatEnvPopup, createArtCultPopup, createLowDenseResAreaPopup, createMedDenseResAreaPopup, createHighDenseResAreaPopup } from '@/utils/popupUtils';
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
import { roadStyles } from '@/styles/CNX/roadStyles';
import { parkinglotStyles } from '@/styles/CNX/parkinglotStyles';
import { ruralargiStyles } from '@/styles/CNX/ruralargiStyles';
import { recreatenvStyles } from '@/styles/CNX/recreatenvStyles';
import { artcultStyles } from '@/styles/CNX/artcultStyles';
import { lowdenseresareaStyles } from '@/styles/CNX/lowdenseresareaStyles';
import { meddenseresareaStyles } from '@/styles/CNX/meddenseresareaStyles';
import { highdenseresareaStyles } from '@/styles/CNX/highdenseresareaStyles';
import { MapLayersProps } from '@/types/index';

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
  roadData,
  parkinglotData,
  ruralargiData,
  recreatenvData,
  artcultData,
  lowdenseresareaData,
  meddenseresareaData,
  highdenseresareaData,
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

      {/* Road Layer */}
      {Array.isArray(roadData?.features) && roadData.features.length > 0 && (
        <>
          {roadData.features.map((feature, index) => (
            <GeoJSON
              key={`road-${index}`}
              data={feature}
              style={() => roadStyles.getStyle(feature)}
              eventHandlers={{
                add: (e) => {
                  layerRefs.current.push(e.target);
                },
                click: (e) => {
                  const clickedLayer = e.target as L.Path;

                  // ลดความชัดของเส้นถนนทั้งหมด
                  layerRefs.current.forEach((layer) => {
                    (layer as L.Path).setStyle({ opacity: 0.1 });
                  });

                  // เน้นเส้นที่คลิก
                  clickedLayer.setStyle({ opacity: 1.0 });

                  clickedLayer
                    .bindPopup(createRoadPopup(feature))
                    .openPopup();

                  // เมื่อ popup ปิด → กลับมาแสดงทุกเส้นเหมือนเดิม
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

      {/* Parking Lot Layer */}
      {Array.isArray(parkinglotData?.features) && parkinglotData.features.length > 0 && (
        <>
          {parkinglotData.features.map((feature, index) => (
            <GeoJSON
              key={`parking-${index}`}
              data={feature}
              style={() => parkinglotStyles.getStyle(feature)}
              eventHandlers={{
                add: (e) => {
                  layerRefs.current.push(e.target);
                },
                click: (e) => {
                  const clickedLayer = e.target as L.Path;

                  // ลดความชัดของลานจอดรถอื่น ๆ
                  layerRefs.current.forEach((layer) => {
                    (layer as L.Path).setStyle({ fillOpacity: 0.1, opacity: 0.1 });
                  });

                  // เน้นลานจอดรถที่ถูกคลิก
                  clickedLayer.setStyle({ fillOpacity: 0.6, opacity: 1.0 });

                  clickedLayer
                    .bindPopup(createParkingLotPopup(feature))
                    .openPopup();

                  // คืนค่าความชัดเมื่อปิด popup
                  clickedLayer.on('popupclose', () => {
                    layerRefs.current.forEach((layer) => {
                      (layer as L.Path).setStyle({ fillOpacity: 0.5, opacity: 0.9 });
                    });
                  });
                },
              }}
            />
          ))}
        </>
      )}


      {/* Rural & Argicultural Layer */}
      {Array.isArray(ruralargiData?.features) && ruralargiData.features.length > 0 && (
        <>
          {ruralargiData.features.map((feature, index) => (
            <GeoJSON
              key={`ruralargi-${index}`}
              data={feature}
              style={() => ruralargiStyles.getStyle(feature)}
              eventHandlers={{
                add: (e) => {
                  layerRefs.current.push(e.target);
                },
                click: (e) => {
                  const clickedLayer = e.target as L.Path;

                  layerRefs.current.forEach((layer) => {
                    (layer as L.Path).setStyle({ fillOpacity: 0.1, opacity: 0.1 });
                  });

                  clickedLayer.setStyle({ fillOpacity: 0.6, opacity: 1.0 });

                  clickedLayer
                    .bindPopup(createRuralArgiPopup(feature))
                    .openPopup();

                  clickedLayer.on('popupclose', () => {
                    layerRefs.current.forEach((layer) => {
                      (layer as L.Path).setStyle({ fillOpacity: 0.5, opacity: 0.9 });
                    });
                  });
                },
              }}
            />
          ))}
        </>
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

      {/* Low-density residential area */}
      {Array.isArray(lowdenseresareaData?.features) && lowdenseresareaData.features.length > 0 && (
        <>
          {lowdenseresareaData.features.map((feature, index) => (
            <GeoJSON
              key={`lowdenseresarea-${index}`}
              data={feature}
              style={() => lowdenseresareaStyles.getStyle(feature)}
              eventHandlers={{
                add: (e) => {
                  layerRefs.current.push(e.target);
                },
                click: (e) => {
                  const clickedLayer = e.target as L.Path;

                  layerRefs.current.forEach((layer) => {
                    (layer as L.Path).setStyle({ fillOpacity: 0.1, opacity: 0.1 });
                  });

                  clickedLayer.setStyle({ fillOpacity: 0.6, opacity: 1.0 });

                  clickedLayer
                    .bindPopup(createLowDenseResAreaPopup(feature))
                    .openPopup();

                  clickedLayer.on('popupclose', () => {
                    layerRefs.current.forEach((layer) => {
                      (layer as L.Path).setStyle({ fillOpacity: 0.5, opacity: 0.9 });
                    });
                  });
                },
              }}
            />
          ))}
        </>
      )}

      {/* Med-density residential area */}
      {Array.isArray(meddenseresareaData?.features) && meddenseresareaData.features.length > 0 && (
        <>
          {meddenseresareaData.features.map((feature, index) => (
            <GeoJSON
              key={`meddenseresarea-${index}`}
              data={feature}
              style={() => meddenseresareaStyles.getStyle(feature)}
              eventHandlers={{
                add: (e) => {
                  layerRefs.current.push(e.target);
                },
                click: (e) => {
                  const clickedLayer = e.target as L.Path;

                  layerRefs.current.forEach((layer) => {
                    (layer as L.Path).setStyle({ fillOpacity: 0.1, opacity: 0.1 });
                  });

                  clickedLayer.setStyle({ fillOpacity: 0.6, opacity: 1.0 });

                  clickedLayer
                    .bindPopup(createMedDenseResAreaPopup(feature))
                    .openPopup();

                  clickedLayer.on('popupclose', () => {
                    layerRefs.current.forEach((layer) => {
                      (layer as L.Path).setStyle({ fillOpacity: 0.5, opacity: 0.9 });
                    });
                  });
                },
              }}
            />
          ))}
        </>
      )}

      {/* High-density residential area */}
      {Array.isArray(highdenseresareaData?.features) && highdenseresareaData.features.length > 0 && (
        <>
          {highdenseresareaData.features.map((feature, index) => (
            <GeoJSON
              key={`highdenseresarea-${index}`}
              data={feature}
              style={() => highdenseresareaStyles.getStyle(feature)}
              eventHandlers={{
                add: (e) => {
                  layerRefs.current.push(e.target);
                },
                click: (e) => {
                  const clickedLayer = e.target as L.Path;

                  layerRefs.current.forEach((layer) => {
                    (layer as L.Path).setStyle({ fillOpacity: 0.1, opacity: 0.1 });
                  });

                  clickedLayer.setStyle({ fillOpacity: 0.6, opacity: 1.0 });

                  clickedLayer
                    .bindPopup(createHighDenseResAreaPopup(feature))
                    .openPopup();

                  clickedLayer.on('popupclose', () => {
                    layerRefs.current.forEach((layer) => {
                      (layer as L.Path).setStyle({ fillOpacity: 0.5, opacity: 0.9 });
                    });
                  });
                },
              }}
            />
          ))}
        </>
      )}
    </>
  );
}
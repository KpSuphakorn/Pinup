'use client';

import dynamic from 'next/dynamic';
import { createOsmPopup, createZoningPopup, createPopulationPopup, createLandPriceSubdPopup, createBoundMunPopup, createBoundTambonPopup, createBoundAmphoePopup, createBoundProvincePopup, createGateCountPopup, createBusStopPopup } from '@/utils/popupUtils';
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
  landId,
  isLoading
}: MapLayersProps) {

  if (isLoading) return null;

  if (typeof window === 'undefined') return null;

  const L = require('leaflet');

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

      {/* BUsStop Layer */}
      {busstopData?.features.length && (
        <GeoJSON
          data={busstopData}
          pointToLayer={(feature, latlng) => L.marker(latlng, { icon: busstopStyles.getStyle(feature) })}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(createBusStopPopup(feature));
          }}
        />
      )}
    </>
  );
}
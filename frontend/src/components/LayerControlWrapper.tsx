'use client';

import { LayersControl, TileLayer } from 'react-leaflet';

export default function LayerControlWrapper() {
  return (
    <LayersControl position="topright">
      <LayersControl.BaseLayer checked name="แผนที่ถนน (OSM)">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer name="ภาพดาวเทียม (ESRI)">
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="© Esri, Maxar, Earthstar Geographics"
        />
      </LayersControl.BaseLayer>
    </LayersControl>
  );
}
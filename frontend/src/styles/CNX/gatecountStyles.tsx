import {Feature, Geometry } from 'geojson';
import L from 'leaflet';

// Display as a MARKER
export function getStyle(feature?: Feature<Geometry, any>) {
  const displayName = feature?.properties?.display_name || '?';

  return L.divIcon({
    className: 'gate-marker',
    html: `
      <div style="
        background-color: #00438bff;
        color: white;
        border: 2px solid white;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      ">
        <i class="fas fa-door-open"></i>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
}

export const gatecountStyles = {
  getStyle,
};
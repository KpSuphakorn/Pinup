'use client'

import { Feature, Geometry } from 'geojson';
import L from 'leaflet';

export function getStyle(feature?: Feature<Geometry, any>) {
  return L.divIcon({
    className: 'custom-gate-marker',
    html: `
      <div style="
        background-color: #00438b;  /* วงกลมสีน้ำเงิน */
        border: 2px solid white;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <img src="/walk.png" alt="icon" style="width: 18px; height: 18px;" />
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],  // กึ่งกลางล่าง
    popupAnchor: [0, -30],
  });
}

export const gatecountStyles = {
  getStyle,
};

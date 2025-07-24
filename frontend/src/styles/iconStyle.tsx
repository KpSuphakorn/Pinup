'use client'

import L from 'leaflet';

export function createCustomGateIcon() {
  if (typeof window === 'undefined') {
    // server side: คืนค่า null หรือ undefined (ยังไม่สร้างไอคอน)
    return null;
  }

  // client side: สร้างไอคอนจริงๆ
  return new L.Icon({
    iconUrl: '/walk.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
    shadowUrl: '',
  });
}

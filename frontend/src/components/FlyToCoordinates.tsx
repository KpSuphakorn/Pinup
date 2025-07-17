'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface Props {
  center: [number, number];
  zoom?: number;
  shouldFly: boolean;
}

export default function FlyToCoordinates({ center, zoom = 11, shouldFly }: Props) {
  const map = useMap();

  useEffect(() => {
    if (shouldFly && center) {
      map.flyTo(center, zoom);
    }
  }, [center, zoom, shouldFly, map]);

  return null;
}

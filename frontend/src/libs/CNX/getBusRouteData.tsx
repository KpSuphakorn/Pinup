'use server';

import { BusRouteGeoJSON } from "@/types";

export async function getBusRouteData(): Promise<BusRouteGeoJSON> {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(`${BACKEND_URL}/api/cnx/bus-route`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch bus route data');
    }

    return await response.json();
}
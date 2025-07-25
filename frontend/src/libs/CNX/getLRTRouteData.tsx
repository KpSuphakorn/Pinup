'use server';

import { LRTRouteGeoJSON } from "@/types";

export async function getLRTRouteData(): Promise<LRTRouteGeoJSON> {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(`${BACKEND_URL}/api/cnx/LRT-route`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch LRT route data');
    }

    return await response.json();
}
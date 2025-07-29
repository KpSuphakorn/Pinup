'use server';

import { RoadGeoJSON } from "@/types";

export async function getRoadData(): Promise<RoadGeoJSON> {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(`${BACKEND_URL}/api/cnx/road`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch road data');
    }

    return await response.json();
}
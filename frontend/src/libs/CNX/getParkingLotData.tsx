'use server';

import { ParkingLotGeoJSON } from "@/types";

export async function getParkingLotData(): Promise<ParkingLotGeoJSON> {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(`${BACKEND_URL}/api/cnx/parking-lot`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch parking lot data');
    }

    return await response.json();
}
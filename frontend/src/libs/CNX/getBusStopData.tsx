'use server';

import { BusStopGeoJSON } from "@/types";

export async function getBusStopData(): Promise<BusStopGeoJSON> {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(`${BACKEND_URL}/api/cnx/bus-stop`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch bus stop data');
    }

    return await response.json();
}
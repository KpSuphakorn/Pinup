'use server';

import { HighDenseResAreaGeoJSON } from "@/types";

export async function getHighDenseResAreaData(): Promise<HighDenseResAreaGeoJSON> {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(`${BACKEND_URL}/api/cnx/high-dense-res-area`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch high-density residential area data');
    }

    return await response.json();
}
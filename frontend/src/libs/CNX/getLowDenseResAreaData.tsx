'use server';

import { LowDenseResAreaGeoJSON } from "@/types";

export async function getLowDenseResAreaData(): Promise<LowDenseResAreaGeoJSON> {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(`${BACKEND_URL}/api/cnx/low-dense-res-area`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch low-density residential area data');
    }

    return await response.json();
}
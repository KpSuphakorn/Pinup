'use server';

import { MedDenseResAreaGeoJSON } from "@/types";

export async function getMedDenseResAreaData(): Promise<MedDenseResAreaGeoJSON> {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(`${BACKEND_URL}/api/cnx/med-dense-res-area`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch medium-density residential area data');
    }

    return await response.json();
}
'use server';

import { BoundProvinceGeoJSON } from "@/types/index";

export async function getBoundProvinceData(): Promise<BoundProvinceGeoJSON> {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(`${BACKEND_URL}/api/cnx/bound-prov`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch bound province data');
    }

    return await response.json();
}
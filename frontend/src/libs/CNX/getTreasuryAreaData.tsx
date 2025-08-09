import { TreasuryAreaGeoJSON } from "@/types/index";

export async function getTreasureAreaData(): Promise<TreasuryAreaGeoJSON> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/cnx/treasury-area`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch treasury area data");
  }

  return await response.json();
}

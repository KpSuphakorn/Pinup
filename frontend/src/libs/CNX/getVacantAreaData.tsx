import { VacantAreaGeoJSON } from "@/types/index";

export async function getVacantAreaData(): Promise<VacantAreaGeoJSON> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/cnx/vacant-area`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch vacant area data");
  }

  return await response.json();
}

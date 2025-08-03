import { api } from "@/libs/api";
import { ParkingLotGeoJSON } from "./types";

export async function getParkingLotData(): Promise<ParkingLotGeoJSON> {
  return api.get<ParkingLotGeoJSON>("/cnx/parking-lot").then((res) => res.data);
}

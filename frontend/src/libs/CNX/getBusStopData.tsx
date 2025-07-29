import { BusStopGeoJSON } from "@/types";
import { api } from "../api";

export async function getBusStopData(): Promise<BusStopGeoJSON> {
  return api.get<BusStopGeoJSON>("/cnx/bus-stop").then((res) => res.data);
}

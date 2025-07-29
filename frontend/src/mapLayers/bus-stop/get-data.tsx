import { api } from "@/libs/api";
import { BusStopGeoJSON } from "./types";

export async function getBusStopData(): Promise<BusStopGeoJSON> {
  return api.get<BusStopGeoJSON>("/cnx/bus-stop").then((res) => res.data);
}

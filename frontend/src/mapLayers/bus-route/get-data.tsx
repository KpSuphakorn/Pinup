import { api } from "@/libs/api";
import { BusRouteGeoJSON } from "./types";

export async function getBusRouteData(): Promise<BusRouteGeoJSON> {
  return api.get<BusRouteGeoJSON>("/cnx/bus-route").then((res) => res.data);
}

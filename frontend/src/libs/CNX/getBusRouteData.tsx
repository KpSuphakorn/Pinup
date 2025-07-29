import { BusRouteGeoJSON } from "@/types";
import { api } from "../api";

export async function getBusRouteData(): Promise<BusRouteGeoJSON> {
  return api.get<BusRouteGeoJSON>("/cnx/bus-route").then((res) => res.data);
}

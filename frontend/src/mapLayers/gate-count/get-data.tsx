import { api } from "@/libs/api";
import { GateCountGeoJSON } from "./types";

export async function getGateCountData(): Promise<GateCountGeoJSON> {
  return api.get<GateCountGeoJSON>("/cnx/gate-count").then((res) => res.data);
}

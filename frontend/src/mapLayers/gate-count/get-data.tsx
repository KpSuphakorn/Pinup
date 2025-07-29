import { GateCountGeoJSON } from "@/types";
import { api } from "../api";

export async function getGateCountData(): Promise<GateCountGeoJSON> {
  return api.get<GateCountGeoJSON>("/cnx/gate-count").then((res) => res.data);
}

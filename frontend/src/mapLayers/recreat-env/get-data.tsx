import { api } from "@/libs/api";
import { RecreatEnvGeoJSON } from "./types";

export async function getRecreatEnvData(): Promise<RecreatEnvGeoJSON> {
  return api.get<RecreatEnvGeoJSON>("/cnx/recreat-env").then((res) => res.data);
}

import { api } from "@/libs/api";
import { RuralArgiGeoJSON } from "./types";

export async function getRuralArgiData(): Promise<RuralArgiGeoJSON> {
  return api.get<RuralArgiGeoJSON>("/cnx/rural-argi").then((res) => res.data);
}

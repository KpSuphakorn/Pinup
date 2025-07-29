import { api } from "@/libs/api";

export async function getZoning(landId: number) {
  return api.get(`/zoning/${landId}`).then((res) => res.data);
}

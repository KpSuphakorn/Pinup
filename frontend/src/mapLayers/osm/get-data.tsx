import { api } from "./api";

export async function getOsmData() {
  return api.get("/osm-data").then((res) => res.data);
}

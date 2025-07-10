from fastapi import APIRouter
import json
import os

router = APIRouter()

@router.get("/zoning/{land_id}")
async def get_zoning(land_id: int):
    with open("data/zoning_data.geojson", "r") as file:
        zoning_data = json.load(file)
    for feature in zoning_data["features"]:
        if feature["properties"]["id"] == land_id:
            return {
                "id": feature["properties"]["id"],
                "name": feature["properties"]["name"],
                "geometry": feature["geometry"]
            }
    return {"error": "Zoning not found"}

@router.get("/osm-data")
async def get_osm_data():
    with open("data/osm_data.geojson", "r") as file:
        osm_data = json.load(file)
    return osm_data["features"]
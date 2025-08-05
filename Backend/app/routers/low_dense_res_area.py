from fastapi import APIRouter
import json
from shapely.geometry import shape
from ..utils import convert_coordinates

router = APIRouter()

@router.get("/cnx/low-dense-res-area")
async def get_low_dense_res_area():
    """ดึงข้อมูลพื้นที่ที่อยู่อาศัยหนาแน่นน้อย - มี geometry และระดับชั้น"""
    try:
        with open("data/CNX/low_dense_res_area.geojson", "r", encoding="utf-8") as file:
            data = json.load(file)

        for feature in data["features"]:
            props = feature["properties"]
            geometry = feature["geometry"]
            coords = geometry["coordinates"]

            # หากไม่ต้องการแปลง coordinates ให้คอมเม้น line นี้
            geometry["coordinates"] = convert_coordinates(coords)

            # คำนวณพื้นที่ด้วย Shapely (จาก coords)
            area_m2 = shape({
                "type": geometry["type"],
                "coordinates": coords
            }).area
            area_km2 = round(area_m2 / 1_000_000, 4)

            feature["properties"] = {
                "elevation": props.get("ELEVATION"),
                "area_km2": area_km2,
            }

        return data

    except Exception as e:
        print(f"Error processing low-density residential area data: {str(e)}")
        raise
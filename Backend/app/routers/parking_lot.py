from fastapi import APIRouter
import json
from shapely.geometry import shape
from ..utils import convert_coordinates

router = APIRouter()

@router.get("/cnx/parking-lot")
async def get_parking_lot():
    """ดึงข้อมูลลานจอดรถ - มี geometry, ชื่อ, ประเภท, จำนวนรถที่จอดได้, จำนวนชั้นที่จอดรถ และพื้นที่ (คำนวณเอง)"""
    try:
        with open("data/CNX/parking_lot.geojson", "r", encoding="utf-8") as file:
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

            feature["properties"] = {
                "name": props.get("Name", "ที่จอดรถ"),
                "type": props.get("Type", "-"),
                "capacity": props.get("Capacity", 0),
                "storey": props.get("Storey", 0),
                "area_m2": round(area_m2, 2),
            }

        return data

    except Exception as e:
        print(f"Error processing parking lot data: {str(e)}")
        raise
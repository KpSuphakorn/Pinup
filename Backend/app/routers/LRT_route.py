from fastapi import APIRouter
import json
from ..utils.distance_calculator import format_distance, calculate_linestring_length 
from ..utils.convert_coor import convert_coordinates

router = APIRouter()

# Map สีเป็นชื่อภาษาไทย
LINE_COLOR_MAP = {
    "Red": "สีแดง",
    "Blue": "สีน้ำเงิน",
    "Green": "สีเขียว",
}

router = APIRouter()

@router.get("/cnx/LRT-route")
async def get_lrt_route():
    """ดึงข้อมูลเส้นทางรถไฟฟ้า LRT - มี geometry และชื่อสาย"""
    try:
        with open("data/CNX/LRT_route.geojson", "r", encoding="utf-8") as file:
            data = json.load(file)

        for feature in data["features"]:
            props = feature["properties"]
            geometry = feature["geometry"]

            if geometry["type"] == "LineString":
                coordinates = convert_coordinates(geometry["coordinates"]) # แปลงเป็น lng lat
                total_length_meters = calculate_linestring_length(coordinates)
            else:
                total_length_meters = 0

            total_distance_display = format_distance(total_length_meters)
            line_code = props.get("Line", "")
            line_thai = LINE_COLOR_MAP.get(line_code, f"สีไม่ทราบ ({line_code})")

            # กำหนด properties ใหม่
            feature["properties"] = {
                "name": f"LRT สาย{line_thai}",
                "line": line_code,
                "total_length_meters": round(total_length_meters, 2),
                "total_distance_display": f"ระยะทางรวม: {total_distance_display}",
                "display_name": f"LRT สาย{line_thai}"
            }

        print(f"LRT route data processed: {len(data['features'])} routes")
        return data

    except Exception as e:
        print(f"Error processing LRT route data: {str(e)}")
        raise

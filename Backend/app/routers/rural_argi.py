from fastapi import APIRouter
import json
from ..utils.convert_coor import convert_coordinates

router = APIRouter()

@router.get("/cnx/rural-argi")
async def get_rural_argi():
    """ดึงข้อมูลชนบทและเกษตรกรรม - มี geometry ระดับ และขนาดพื้นที่"""
    try:
        with open("data/CNX/rural_argi.geojson", "r", encoding='utf-8') as file:
            data = json.load(file)
        
        for feature in data["features"]:
            props = feature["properties"]
            geometry = feature["geometry"]
            coords = geometry["coordinates"]

            # หากไม่ต้องการแปลง coordinates ให้คอมเม้น line นี้
            geometry["coordinates"] = convert_coordinates(coords)

            props = feature["properties"]
            feature["properties"] = {
                "elevation": props.get("ELEVATION"),
                "area": props.get("AREA"),
                "display_data": f"พื้นที่: {props.get('AREA', 0):,} ตร.กม. - ระดับ: {props.get('ELEVATION')}"
            }

        print(f"Plan data processed: {len(data['features'])} features")
        return data
        
    except Exception as e:
        print(f"Error processing rural & agricultural data: {str(e)}")
        raise

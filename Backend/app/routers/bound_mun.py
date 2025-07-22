from fastapi import APIRouter
import json
from ..utils.convert_coor import convert_coordinates

router = APIRouter()

@router.get("/cnx/bound-mun")
async def get_bound_mun():
    """ดึงข้อมูลขอบเขตของเขตการปกครอง - มี geometry และชื่อเทศบาล"""
    try:
        with open("data/CNX/bound_mun.geojson", "r", encoding='utf-8') as file:
            data = json.load(file)
        
        for feature in data["features"]:
            if feature["geometry"]["type"] == "Polygon":
                feature["geometry"]["coordinates"] = convert_coordinates(
                    feature["geometry"]["coordinates"]
                )
            
            props = feature["properties"]
            feature["properties"] = {
                "id": props["Id"],
                "name_th": props["NAME_T"],         # ชื่อภาษาไทยหลัก
                "name_en": props["NAME_E"],         # ชื่อภาษาอังกฤษรอง
                "display_name": f"{props['NAME_T']} ({props['NAME_E']})"
            }

        print(f"Boundary data processed: {len(data['features'])} features")
        return data
        
    except Exception as e:
        print(f"Error processing boundary data: {str(e)}")
        raise
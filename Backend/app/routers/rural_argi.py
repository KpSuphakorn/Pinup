from fastapi import APIRouter
import json
from ..utils.convert_coor import convert_coordinates

router = APIRouter()

@router.get("/cnx/rural-argi")
async def get_rural_argi():
    """ดึงข้อมูลชนบทและเกษตรกรรม - มี geometry และขนาดพื้นที่"""
    try:
        with open("data/CNX/rural_argi.geojson", "r", encoding='utf-8') as file:
            data = json.load(file)
        
        for feature in data["features"]:
            # ถ้าจะแปลงคู่อันดับให้ uncomment นี้
            if feature["geometry"]["type"] == "Polygon":
                feature["geometry"]["coordinates"] = convert_coordinates(
                    feature["geometry"]["coordinates"]
                )
            
            props = feature["properties"]
            feature["properties"] = {
                "elevation": props["ELEVATION"],
                "area": props["AREA"],
                "display_data": f"พื้นที่: {props['AREA']:,} [หน่วยของพื้นที่] - ระดับ: {props['ELEVATION']}"
            }

        print(f"Boundary data processed: {len(data['features'])} features")
        return data
        
    except Exception as e:
        print(f"Error processing rural & argicultural data: {str(e)}")
        raise
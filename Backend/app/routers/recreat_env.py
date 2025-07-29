from fastapi import APIRouter
import json
from ..utils.convert_coor import convert_coordinates

router = APIRouter()

@router.get("/cnx/recreat-env")
async def get_rural_argi():
    """ดึงข้อมูลที่โล่งเพื่อนันทนาการและการอนุรักษ์คุณภาพสิ่งแวดล้อม - มี geometry และระดับ"""
    try:
        with open("data/CNX/recreat_env.geojson", "r", encoding='utf-8') as file:
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
                "display_data": f"ระดับ: {props['ELEVATION']}"
            }

        print(f"Plan data processed: {len(data['features'])} features")
        return data
        
    except Exception as e:
        print(f"Error processing recreate & environment data: {str(e)}")
        raise
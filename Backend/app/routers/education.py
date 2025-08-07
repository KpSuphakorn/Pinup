from fastapi import APIRouter
import json
import os
from ..utils.convert_coor import convert_coordinates

router = APIRouter()

@router.get("/cnx/education")
async def get_education():
    """ดึงข้อมูลการศึกษาในเชียงใหม่ - มี geometry และระดับ"""
    try:
        ROOT_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        data_path = os.path.join(ROOT_DIR, "data", "CNX", "education.geojson")

        with open(data_path, "r", encoding='utf-8') as file:
            data = json.load(file)
        
        for feature in data["features"]:
            if feature["geometry"]["type"] == "Polygon":
                feature["geometry"]["coordinates"] = convert_coordinates(
                    feature["geometry"]["coordinates"]
                )
            
            props = feature["properties"]
            feature["properties"] = {
                "elevation": props.get("ELEVATION", None),
                "display_data": f"ระดับ: {props.get('ELEVATION', 'N/A')}"
            }

        print(f"Plan data processed: {len(data['features'])} features")
        return data
        
    except Exception as e:
        print(f"Error processing art & cultural data: {str(e)}")
        raise

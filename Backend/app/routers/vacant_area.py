from fastapi import APIRouter
import json
import os
from ..utils.convert_coor import convert_coordinates

router = APIRouter()

@router.get("/cnx/vacant-area")
async def get_vacent_area():
    """แปลงที่ดินรอการพัฒนาในเขตเมืองเชียงใหม่"""
    try:        
        with open("data/CNX/vacant_area.geojson", "r", encoding='utf-8') as file:
            data = json.load(file)
        
        for feature in data["features"]:
            if feature["geometry"]["type"] == "Polygon":
                feature["geometry"]["coordinates"] = convert_coordinates(
                    feature["geometry"]["coordinates"]
                )

        return data
        
    except Exception as e:
        print(f"Error processing art & cultural data: {str(e)}")
        raise

from fastapi import APIRouter
import json
import os
from ..utils.convert_coor import convert_coordinates

router = APIRouter()

@router.get("/cnx/treasury-area")
async def get_treasury_area():
    """แปลงที่ดินกรมธนารักษ์ในเขตเมืองเชียงใหม่"""
    try:        
        with open("data/CNX/treasury_area.geojson", "r", encoding='utf-8') as file:
            data = json.load(file)
        
        for feature in data["features"]:
            if feature["geometry"]["type"] == "Polygon":
                feature["geometry"]["coordinates"] = convert_coordinates(
                    feature["geometry"]["coordinates"]
                )
            
            props = feature["properties"]
            feature["properties"] = {
                "reg_id": props.get("REG_ID", None),
                "reg_type": props.get("REG_TYPE", ""),
                "reg_num": props.get("REG_NUM", ""),
                "reg_name": props.get("REMARK", ""),
                "remark": props.get("REMARK2", ""),
                "tumbon_id": props.get("TUMB_ID", None),
                "tumbon_name": props.get("TUMB_NAME", ""),
                "amphoe_id": props.get("AMPH_ID", None),
                "amphoe_name": props.get("AMPH_NAME", ""),
                "province_id": props.get("PROV_ID", None),
                "province_name": props.get("PROV_NAME", ""),
                "area": {
                    "ngan": props.get("NGAN", 0),
                    "rai": props.get("RAI", 0),
                    "sqwa": props.get("SQWA", 0),
                }
            }

        return data
        
    except Exception as e:
        print(f"Error processing art & cultural data: {str(e)}")
        raise

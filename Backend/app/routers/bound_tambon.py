from fastapi import APIRouter
import json
import os
from ..utils.convert_coor import convert_coordinates

router = APIRouter()

@router.get("/cnx/bound-tambon")
async def get_bound_tambon():
    """ดึงข้อมูลขอบเขตของตำบล - มี geometry และรายละเอียดของตำบล"""
    try:
        with open("data/CNX/bound_tambon.geojson", "r", encoding='utf-8') as file:
            data = json.load(file)
        
        for feature in data["features"]:
            if feature["geometry"]["type"] == "Polygon":
                feature["geometry"]["coordinates"] = convert_coordinates(
                    feature["geometry"]["coordinates"]
                )
            
            props = feature["properties"]
            feature["properties"] = {
                "id": props["OBJECTID"],

                "tambon_th": props["T_NAME_T"],
                "tambon_en": props["T_NAME_E"].title(),

                "amphoe_th": props["A_NAME_T"],
                "amphoe_en": props["A_NAME_E"].title(),

                "province_th": props["P_NAME_T"],
                "province_en": props["P_NAME_E"].title(),

                # สำหรับแสดงผลแบบ format string
                "display_multiline": [
                    {
                        "label": "ตำบล",
                        "th": props["T_NAME_T"],
                        "en": props["T_NAME_E"].title(),
                        "highlight": True
                    },
                    {
                        "label": "อำเภอ",
                        "th": props["A_NAME_T"],
                        "en": props["A_NAME_E"].title(),
                        "highlight": False
                    },
                    {
                        "label": "จังหวัด",
                        "th": props["P_NAME_T"],
                        "en": props["P_NAME_E"].title(),
                        "highlight": False
                    }
                ]
            }

        print(f"Boundary data processed: {len(data['features'])} features")
        return data
        
    except Exception as e:
        print(f"Error processing boundary data: {str(e)}")
        raise
from fastapi import APIRouter
import json
import os

router = APIRouter()

@router.get("/cnx/bound-amphoe")
async def get_bound_amphoe():
    """ดึงข้อมูลขอบเขตของอำเภอ - มี geometry และรายละเอียดของอำเภอ"""
    try:
        with open("data/CNX/bound_amphoe.geojson", "r", encoding='utf-8') as file:
            data = json.load(file)
        for feature in data["features"]:            
            props = feature["properties"]
            feature["properties"] = {
                "name_th": props["AMP_NAME_T"],         # ชื่อภาษาไทยหลัก
                "name_en": props["AMP_NAME_E"],         # ชื่อภาษาอังกฤษรอง
                "display_name": f"{props['AMP_NAME_T']} ({props['AMP_NAME_E']})"
            }

        print(f"Boundary data processed: {len(data['features'])} features")
        return data
        
    except Exception as e:
        print(f"Error processing boundary data: {str(e)}")
        raise
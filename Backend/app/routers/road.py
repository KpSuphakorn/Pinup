from fastapi import APIRouter
import json

router = APIRouter()

@router.get("/cnx/road")
async def get_road():
    """ดึงข้อมูลถนน - มี geometry, ระยะทาง และชื่อถนน"""
    try:
        with open("data/CNX/road.geojson", "r", encoding="utf-8") as file:
            data = json.load(file)

        for feature in data["features"]:
            props = feature["properties"]

            len_km = props["Lenght_KM"]
            name_th = props["RDLNNAMT"]
            name_en = props["RDLNNAME"]

            # กำหนด properties ใหม่
            feature["properties"] = {
                "name_th": name_th,
                "name_en": name_en,
                "len_km": len_km,
            }

        print(f"Road data processed: {len(data['features'])} routes")
        return data

    except Exception as e:
        print(f"Error processing Road data: {str(e)}")
        raise

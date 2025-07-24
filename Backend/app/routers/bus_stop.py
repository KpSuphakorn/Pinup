from fastapi import APIRouter
import json

router = APIRouter()

@router.get("/cnx/bus-stop")
async def get_bus_stop():
    """ดึงข้อมูลป้ายรถเมล์ - มี geometry และข้อมูลรายละเอียดป้าย"""
    try:
        with open("data/CNX/bus_stop.geojson", "r", encoding='utf-8') as file:
            data = json.load(file)
        
        for feature in data["features"]:
            props = feature["properties"]
            
            # จัดรูปแบบข้อมูล properties ใหม่
            feature["properties"] = {
                "name": props.get("Name", "ป้ายรถเมล์"),
                
                "display_name": f"ป้ายรถเมล์: {props['Name']}",
            }

        print(f"Bus stop data processed: {len(data['features'])} stops")
        return data

    except Exception as e:
        print(f"Error processing bus stop data: {str(e)}")
        raise
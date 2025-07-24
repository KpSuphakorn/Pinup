from fastapi import APIRouter
import json

router = APIRouter()

@router.get("/cnx/bus-route")
async def get_bus_route():
    """ดึงข้อมูลเส้นทางของรถเมล์ - มี geometry และข้อมูลรายละเอียดเส้นทาง"""
    try:
        with open("data/CNX/bus_route.geojson", "r", encoding='utf-8') as file:
            data = json.load(file)
        
        for feature in data["features"]:
            props = feature["properties"]
            
            # คำนวณความยาวเส้นทางและแปลงหน่วยเป็นเมตร
            shape_length = props.get("Shape_Leng", 0)
            # Shape_Leng ใน GeoJSON มักจะเป็นหน่วย degrees หรือ meters
            # ถ้าเป็น degrees ต้องแปลงเป็น meters (ประมาณ 1 degree = 111,000 meters)
            
            # สมมติว่าข้อมูลเป็น degrees (ตามตัวอย่างที่ให้มา 0.00105753751217)
            length_meters = shape_length * 111000  # แปลง degrees เป็น meters
            
            # ถ้าข้อมูลเป็น meters อยู่แล้ว ให้ใช้บรรทัดนี้แทน
            # length_meters = shape_length
            
            # จัดการแสดงหน่วยตามระยะทาง
            if length_meters < 1000:
                # แสดงเป็นเมตรถ้าไม่เกิน 1000 เมตร
                distance_display = f"{round(length_meters, 2)} ม."
            else:
                # แสดงเป็น กม. และ ม. ถ้าเกิน 1000 เมตร
                km = int(length_meters // 1000)
                remaining_meters = length_meters % 1000
                distance_display = f"{km} กม. {round(remaining_meters, 2)} ม."
            
            # จัดรูปแบบข้อมูล properties ใหม่
            feature["properties"] = {
                "name": props.get("Name", "เส้นทางรถเมล์"),
                "length_meters": round(length_meters, 2),
                "distance_display": distance_display,
                "display_name": f"{props.get('Name', 'เส้นทางรถเมล์')} (ระยะทาง: {distance_display})"
            }

        print(f"Bus route data processed: {len(data['features'])} routes")
        return data

    except Exception as e:
        print(f"Error processing bus route data: {str(e)}")
        raise
from fastapi import APIRouter
import json
from ..utils.convert_coor import convert_coordinates

router = APIRouter()

@router.get("/cnx/gate-count")
async def get_gate_count():
    """ดึงข้อมูลปริมาณคนเดินผ่าน gate_count - มี geometry และข้อมูลสถิติการเดินผ่าน"""
    try:
        with open("data/CNX/gate_count.geojson", "r", encoding='utf-8') as file:
            data = json.load(file)
        
        for feature in data["features"]:
            # แปลงพิกัดถ้าเป็น Point
            if feature["geometry"]["type"] == "Point":
                coordinates = feature["geometry"]["coordinates"]
                # แปลงเฉพาะ longitude และ latitude (2 ตัวแรก)
                converted = convert_coordinates([coordinates[:2]])[0]
                feature["geometry"]["coordinates"] = converted + coordinates[2:]
            
            props = feature["properties"]
            
            # คำนวณสถิติเพิ่มเติม
            total_weekday = props.get("WKDMID_CNT", 0) + props.get("WKDEVE_CNT", 0) + props.get("WKENIT_CNT", 0)
            total_10h = props.get("WKDMID_10H", 0) + props.get("WKDEVE_10H", 0) + props.get("WKENIT_10H", 0)
            
            # จัดรูปแบบข้อมูล properties ใหม่
            feature["properties"] = {
                "gate_code": props["GateCount"],
                "zone": props["Zone"],
                "point_name": props["PointName"],
                
                # Topic of an popup
                "display_name": f"Gate {props['GateCount']} - Zone {props['Zone']}",
                
                # ข้อมูลสถิติแยกตามช่วงเวลา - Content of an popup
                "statistics": {
                            "weekday_morning": {
                                "count": props.get("WKDMID_CNT", 0),
                                "per_10h": props.get("WKDMID_10H", 0),
                                "label": "เช้า (วันธรรมดา)"
                            },
                            "weekday_evening": {
                                "count": props.get("WKDEVE_CNT", 0),
                                "per_10h": props.get("WKDEVE_10H", 0),
                                "label": "เย็น (วันธรรมดา)"
                            },
                            "weekday_night": {
                                "count": props.get("WKENIT_CNT", 0),
                                "per_10h": props.get("WKENIT_10H", 0),
                                "label": "กลางคืน (วันธรรมดา)"
                            },
                            "total": {
                                "count": total_weekday,
                                "per_10h": total_10h,
                                "label": "รวมทั้งหมด"
                            }
                        },
                
                # ข้อมูลส่วนสรุป - Content of an popup
                "description": f"ปริมาณคนเดินผ่าน Gate {props['GateCount']} ใน Zone {props['Zone']} รวม {total_weekday} คน"
            }

        print(f"Gate count data processed: {len(data['features'])} gates")
        return data
        
    except Exception as e:
        print(f"Error processing gate count data: {str(e)}")
        raise
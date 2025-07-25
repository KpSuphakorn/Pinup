from fastapi import APIRouter
import json
from ..utils.distance_calculator import format_distance, process_linestring_segments, process_multilinestring_segments, create_segments_summary

router = APIRouter()

@router.get("/cnx/bus-route")
async def get_bus_route():
    """ดึงข้อมูลเส้นทางของรถประจำทาง - มี geometry และข้อมูลรายละเอียดเส้นทาง"""
    try:
        with open("data/CNX/bus_route.geojson", "r", encoding='utf-8') as file:
            data = json.load(file)
        
        for feature in data["features"]:
            props = feature["properties"]
            geometry = feature["geometry"]
            
            # ประมวลผล segments ตาม geometry type
            if geometry["type"] == "LineString":
                segments, total_length_meters = process_linestring_segments(geometry["coordinates"])
            elif geometry["type"] == "MultiLineString":
                segments, total_length_meters = process_multilinestring_segments(geometry["coordinates"])
            else:
                # fallback ถ้ามี geometry type อื่น
                shape_length = props.get("Shape_Leng", 0)
                total_length_meters = shape_length * 111000
                segments = [{
                    "segment_number": 1,
                    "length_meters": round(total_length_meters, 2),
                    "distance_display": format_distance(total_length_meters),
                    "coordinates": []
                }]
            
            # สร้างสรุปข้อมูล segments
            segments_summary = create_segments_summary(segments)
            total_distance_display = format_distance(total_length_meters)
            
            # จัดรูปแบบข้อมูล properties ใหม่
            feature["properties"] = {
                "name": props.get("Name", "เส้นทางรถประจำทาง"),
                "total_length_meters": round(total_length_meters, 2),
                "total_distance_display": total_distance_display,
                "display_name": f"{props.get('Name', 'เส้นทางรถประจำทาง')} (รวม: {total_distance_display})",
                "geometry_type": geometry["type"],
                "segments": segments,
                "segments_summary": segments_summary
            }

        print(f"Bus route data processed: {len(data['features'])} routes")
        return data

    except Exception as e:
        print(f"Error processing bus route data: {str(e)}")
        raise
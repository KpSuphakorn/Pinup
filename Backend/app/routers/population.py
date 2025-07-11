from fastapi import APIRouter
import json

router = APIRouter()

@router.get("/population/map-data")
async def get_map_data():
    """ดึงข้อมูลสำหรับแสดงบนแผนที่ - มี geometry และ population"""
    with open("data/population.geojson", "r", encoding='utf-8') as file:
        data = json.load(file)
    
    # ส่งข้อมูลเต็ม GeoJSON พร้อมปรับโครงสร้าง properties
    for feature in data["features"]:
        props = feature["properties"]
        # เก็บเฉพาะข้อมูลที่จำเป็นสำหรับแสดงบนแผนที่
        feature["properties"] = {
            "id": props["OBJECTID"],
            "population": props["T_2024"],
            "label": f"{props['TAM_NAMT']}\n{props['T_2024']:,} คน",
            "province": props["PROV_NAMT"],
            "district": props["AMP_NAMT"],
            "subdistrict": props["TAM_NAMT"]
        }
    
    return data

# ไว้ใช้แสดงผลด้านข้างประกอบการแสดงผล label แผนที่
@router.get("/population/range")
async def get_population_range():
    """ดึงช่วงของจำนวนประชากรสำหรับกำหนดสี - แบ่งเป็น 10 ช่วง"""
    with open("data/population.geojson", "r", encoding='utf-8') as file:
        data = json.load(file)
    
    populations = [f["properties"]["T_2024"] for f in data["features"]]
    
    min_pop = min(populations)
    max_pop = max(populations)
    
    # คำนวณขนาดของแต่ละช่วง
    range_size = (max_pop - min_pop) / 10
    
    # สร้าง 10 ช่วง โดยเลขเปิด-ปิดเป็นจำนวนเต็ม
    ranges = []
    for i in range(10):
        start = int(min_pop + (i * range_size))
        end = int(min_pop + ((i + 1) * range_size))
        
        # ช่วงสุดท้ายให้ปิดที่ max_pop
        if i == 9:
            end = int(max_pop)
        
        ranges.append({
            "range": i + 1,
            "min": start,
            "max": end,
            "label": f"{start:,} - {end:,} คน"
        })
    
    return {
        "min": int(min_pop),
        "max": int(max_pop),
        "avg": int(sum(populations) / len(populations)),
        "ranges": ranges,
        "total_ranges": 10
    }
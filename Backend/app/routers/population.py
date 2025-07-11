from fastapi import APIRouter
import json
import os
from ..utils.convert_coor import convert_coordinates

router = APIRouter()

@router.get("/population/map-data")
async def get_map_data():
    """ดึงข้อมูลสําหรับแสดงบนแผนที่ - มี geometry และ population"""
    try:
        with open("data/population.geojson", "r", encoding='utf-8') as file:
            data = json.load(file)
        
        for feature in data["features"]:
            if feature["geometry"]["type"] == "Polygon":
                feature["geometry"]["coordinates"] = convert_coordinates(
                    feature["geometry"]["coordinates"]
                )
            
            props = feature["properties"]
            feature["properties"] = {
                "id": props["OBJECTID"],
                "population": props["T_2024"],
                "label": f"{props['TAM_NAMT']}\n{props['T_2024']:,} คน",
                "province": props["PROV_NAMT"],
                "district": props["AMP_NAMT"], 
                "subdistrict": props["TAM_NAMT"]
            }
        
        print(f"Population data processed: {len(data['features'])} features")
        return data
        
    except Exception as e:
        print(f"Error processing population data: {str(e)}")
        raise

@router.get("/population/range")
async def get_population_range():
    """ดึงช่วงของจํานวนประชากรสําหรับกําหนดสี - แบ่งเป็น 10 ช่วง"""
    try:
        with open("data/population.geojson", "r", encoding='utf-8') as file:
            data = json.load(file)
        
        populations = [f["properties"]["T_2024"] for f in data["features"]]
        
        min_pop = min(populations)
        max_pop = max(populations)
        
        range_size = (max_pop - min_pop) / 10
        
        ranges = []
        for i in range(10):
            start = int(min_pop + (i * range_size))
            end = int(min_pop + ((i + 1) * range_size))
            
            if i == 9:
                end = int(max_pop)
            
            ranges.append({
                "range": i + 1,
                "min": start,
                "max": end,
                "label": f"{start:,} - {end:,} คน"
            })
        
        print(f"Population ranges: {len(ranges)} ranges created")
        return {
            "min": int(min_pop),
            "max": int(max_pop),
            "avg": int(sum(populations) / len(populations)),
            "ranges": ranges,
            "total_ranges": 10
        }
        
    except Exception as e:
        print(f"Error creating population ranges: {str(e)}")
        raise
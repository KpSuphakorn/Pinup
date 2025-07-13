from fastapi import APIRouter
import json
import os
from ..utils.convert_coor import convert_coordinates

router = APIRouter()

@router.get("/land-price-subd/map-data")
async def get_map_data():
    """ดึงข้อมูลสําหรับแสดงบนแผนที่ - มี geometry และ land price per district"""
    try:
        with open("data/bkk_shp.geojson", "r", encoding='utf-8') as file:
            data = json.load(file)
        
        for feature in data["features"]:
            if feature["geometry"]["type"] == "Polygon":
                feature["geometry"]["coordinates"] = convert_coordinates(
                    feature["geometry"]["coordinates"]
                )
            
            props = feature["properties"]
            feature["properties"] = {
                "id": props["OBJECTID"],
                "land_price": props["price_AVG"],
                "label": f"{props['Shape_Area']:.2f} ตร.กม.",
                "province": props["PROV_NAMT"],
                "district": props["AMP_NAMT"], 
                "subdistrict": props["TAM_NAMT"]
            }
        
        print(f"Land price data processed: {len(data['features'])} features")
        return data
        
    except Exception as e:
        print(f"Error processing land price data: {str(e)}")
        raise
    
@router.get("/land-price-subd/range")
async def get_land_price_range():
    """ดึงช่วงของราคาที่ดินสําหรับกําหนดสี - แบ่งเป็น 10 ช่วง"""
    try:
        with open("data/bkk_shp.geojson", "r", encoding='utf-8') as file:
            data = json.load(file)
        
        land_prices = [f["properties"]["price_AVG"] for f in data["features"]]
        
        min_price = min(land_prices)
        max_price = max(land_prices)
        
        range_size = (max_price - min_price) / 10
        
        ranges = []
        for i in range(10):
            start = int(min_price + (i * range_size))
            end = int(min_price + ((i + 1) * range_size))
            
            if i == 9:
                end = int(max_price)
            
            ranges.append({
                "range": i + 1,
                "min": start,
                "max": end,
                "label": f"{start:,} - {end:,} คน"
            })
        
        print(f"Land price ranges calculated: {len(ranges)} ranges")
        return {
            "min": int(min_price),
            "max": int(max_price),
            "avg": int(sum(land_prices) / len(land_prices)),
            "ranges": ranges,
            "total_ranges": 10
        }
        
    except Exception as e:
        print(f"Error processing land price range data: {str(e)}")
        raise
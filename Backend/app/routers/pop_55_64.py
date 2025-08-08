from fastapi import APIRouter, Query
import json
from ..utils.convert_coor import convert_coordinates

router = APIRouter()

@router.get("/cnx/pop-55-64")
async def get_population_map_data(year: int = Query(64, ge=55, le=64)):
    """
    ดึงข้อมูลสำหรับแสดงบนแผนที่ - มี geometry และ population
    รองรับการเลือกปี 55-64 (ค่า default = 64)
    """
    try:
        with open("data/CNX/pop_55_64.geojson", "r", encoding="utf-8") as file:
            data = json.load(file)

        pop_key = f"POP{year}"

        for feature in data["features"]:
            props = feature["properties"]

            population = props.get(pop_key, None)

            feature["properties"] = {
                "year": year,
                "population": population,
                "province": props["PROV_NAMT"],
                "district": props["AMP_NAMT"],
                "subdistrict": props["TAM_NAMT"]
            }

        print(f"Population {year} data processed: {len(data['features'])} features")
        return data

    except Exception as e:
        print(f"Error processing population data: {str(e)}")
        raise


@router.get("/cnx/pop-55-64/range")
async def get_population_range(year: int = Query(64, ge=55, le=64)):
    """
    ดึงช่วงของจำนวนประชากรสำหรับกำหนดสี - แบ่งเป็น 10 ช่วง
    รองรับการเลือกปี 55-64
    """
    try:
        with open("data/CNX/pop_55_64.geojson", "r", encoding="utf-8") as file:
            data = json.load(file)

        pop_key = f"POP{year}"
        populations = [f["properties"].get(pop_key, 0) for f in data["features"]]

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
                "label": f"{start:,} - {end:,}"
            })

        print(f"Population ranges {year}: {len(ranges)} ranges created")
        return {
            "year": year,
            "min": int(min_pop),
            "max": int(max_pop),
            "avg": int(sum(populations) / len(populations)),
            "ranges": ranges,
            "total_ranges": 10
        }

    except Exception as e:
        print(f"Error creating population ranges: {str(e)}")
        raise

from fastapi import APIRouter
import json

router = APIRouter()

@router.get("/cnx/bound-province")
async def get_bound_province():
    """ดึงข้อมูลขอบเขตของจังหวัดเดียว - มี geometry และรายละเอียดของจังหวัด"""
    try:
        with open("data/CNX/bound_province.geojson", "r", encoding='utf-8') as file:
            data = json.load(file)

        feature = data["features"][0]
        props = feature["properties"]

        feature["properties"] = {
            "name_th": props["PROV_NAMT"],
            "name_en": props["PROV_NAME"],
            "area_km2": props["Area_km2_"],
            "display_name": f"{props['PROV_NAMT']} ({props['PROV_NAME']}) - {props['Area_km2_']:.2f} ตร.กม."
        }

        return data

    except Exception as e:
        print(f"Error processing province boundary data: {str(e)}")
        raise
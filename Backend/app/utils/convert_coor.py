from pyproj import Transformer

# สร้าง transformer สำหรับแปลงพิกัดจาก UTM (EPSG:32647) เป็น WGS84 (EPSG:4326)
transformer = Transformer.from_crs("EPSG:32647", "EPSG:4326", always_xy=True)

def convert_coordinates(coordinates):
    """แปลงพิกัดจาก UTM เป็น WGS84"""
    if isinstance(coordinates[0], list):
        return [convert_coordinates(coord) for coord in coordinates]
    else:
        x, y = coordinates
        lng, lat = transformer.transform(x, y)
        return [lng, lat]
from pyproj import Transformer

# สร้าง transformer สำหรับแปลงพิกัดจาก UTM (EPSG:32647) เป็น WGS84 (EPSG:4326)
transformer = Transformer.from_crs("EPSG:32647", "EPSG:4326", always_xy=True)

def convert_coordinates(coordinates):
    """
    แปลงพิกัดจาก UTM เป็น WGS84
    รองรับทั้ง Point, LineString, Polygon, MultiPolygon
    """
    if isinstance(coordinates[0], (float, int)):
        # พิกัดเดียว [x, y]
        x, y = coordinates
        lng, lat = transformer.transform(x, y)
        return [lng, lat]
    else:
        # Recursive สำหรับ list ซ้อน
        return [convert_coordinates(coord) for coord in coordinates]

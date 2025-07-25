from pyproj import Transformer
import logging

# ตั้งค่า logging
logger = logging.getLogger(__name__)

# สร้าง transformer สำหรับแปลงพิกัดจาก UTM (EPSG:32647) เป็น WGS84 (EPSG:4326)
transformer = Transformer.from_crs("EPSG:32647", "EPSG:4326", always_xy=True)

def convert_coordinates(coordinates):
    """
    แปลงพิกัดจาก UTM เป็น WGS84
    รองรับ: Point, LineString, Polygon, MultiLineString, MultiPolygon
    
    Args:
        coordinates: พิกัดในรูปแบบต่างๆ
        - Point: [x, y] หรือ [x, y, z]
        - LineString: [[x, y], [x, y], ...]
        - Polygon: [[[x, y], [x, y], ...], [...]] (outer ring + holes)
        - MultiLineString: [[[x, y], ...], [[x, y], ...]]
        - MultiPolygon: [[[[x, y], ...]], [[[x, y], ...]]]
    
    Returns:
        พิกัดที่แปลงเป็น WGS84 แล้ว
    """
    try:
        if not coordinates:
            logger.warning("Empty coordinates provided")
            return coordinates
        
        # ตรวจสอบว่าเป็น Point coordinate หรือไม่
        if _is_point_coordinate(coordinates):
            return _convert_point(coordinates)
        
        # ถ้าไม่ใช่ point ให้วนซ้ำเข้าไปใน nested list
        if isinstance(coordinates[0], list):
            return [convert_coordinates(coord) for coord in coordinates]
        else:
            # กรณีที่เป็น point coordinate แต่ไม่ผ่านการตรวจสอบแรก
            return _convert_point(coordinates)
            
    except Exception as e:
        logger.error(f"Error converting coordinates: {str(e)}")
        logger.error(f"Input coordinates: {coordinates}")
        raise ValueError(f"Failed to convert coordinates: {str(e)}")

def _is_point_coordinate(coord):
    """
    ตรวจสอบว่า coordinate เป็น point หรือไม่
    Point coordinate จะเป็น [number, number] หรือ [number, number, number]
    """
    if not isinstance(coord, list) or len(coord) < 2:
        return False
    
    # ตรวจสอบว่าสมาชิก 2 ตัวแรกเป็นตัวเลขหรือไม่
    try:
        float(coord[0])
        float(coord[1])
        # ตรวจสอบว่าไม่มี nested list
        return not isinstance(coord[0], list)
    except (ValueError, TypeError, IndexError):
        return False

def _convert_point(coordinates):
    """
    แปลงพิกัด Point จาก UTM เป็น WGS84
    
    Args:
        coordinates: [x, y] หรือ [x, y, z]
    
    Returns:
        [lng, lat] หรือ [lng, lat, z]
    """
    try:
        x, y = float(coordinates[0]), float(coordinates[1])
        
        # ตรวจสอบว่าพิกัดอยู่ในช่วงที่สมเหตุสมผลสำหรับ UTM Zone 47N
        if not (200000 <= x <= 800000 and 1000000 <= y <= 3000000):
            logger.warning(f"Coordinates may not be in UTM Zone 47N: [{x}, {y}]")
        
        lng, lat = transformer.transform(x, y)
        
        # ตรวจสอบผลลัพธ์
        if not (90 <= lng <= 110 and 5 <= lat <= 25):
            logger.warning(f"Converted coordinates may be incorrect: [{lng}, {lat}]")
        
        result = [lng, lat]
        
        # เก็บ z coordinate ไว้ถ้ามี
        if len(coordinates) > 2:
            result.append(coordinates[2])
            
        return result
        
    except Exception as e:
        logger.error(f"Error converting point coordinates: {coordinates}")
        raise ValueError(f"Invalid point coordinates: {str(e)}")

def convert_geojson_coordinates(geojson_data):
    """
    แปลงพิกัดใน GeoJSON object โดยตรง
    
    Args:
        geojson_data: dict ของ GeoJSON (Feature, FeatureCollection, หรือ Geometry)
    
    Returns:
        GeoJSON object ที่แปลงพิกัดแล้ว
    """
    try:
        import copy
        converted_data = copy.deepcopy(geojson_data)
        
        if geojson_data.get('type') == 'FeatureCollection':
            for feature in converted_data.get('features', []):
                if 'geometry' in feature and feature['geometry']:
                    coords = feature['geometry']['coordinates']
                    feature['geometry']['coordinates'] = convert_coordinates(coords)
                    
        elif geojson_data.get('type') == 'Feature':
            if 'geometry' in converted_data and converted_data['geometry']:
                coords = converted_data['geometry']['coordinates']
                converted_data['geometry']['coordinates'] = convert_coordinates(coords)
                
        elif geojson_data.get('type') in ['Point', 'LineString', 'Polygon', 
                                         'MultiPoint', 'MultiLineString', 'MultiPolygon']:
            converted_data['coordinates'] = convert_coordinates(geojson_data['coordinates'])
        
        return converted_data
        
    except Exception as e:
        logger.error(f"Error converting GeoJSON coordinates: {str(e)}")
        raise

# เก็บ function เดิมไว้เพื่อ backward compatibility
def convert_coordinates_legacy(coordinates):
    """
    Function เดิมที่รองรับเฉพาะ LineString และ MultiLineString
    เก็บไว้เพื่อ backward compatibility
    """
    if isinstance(coordinates[0], list):
        return [convert_coordinates_legacy(coord) for coord in coordinates]
    else:
        x, y = coordinates
        lng, lat = transformer.transform(x, y)
        return [lng, lat]
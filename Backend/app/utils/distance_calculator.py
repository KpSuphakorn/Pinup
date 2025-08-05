import math

def calculate_distance(coord1, coord2):
    """คำนวณระยะทางระหว่างจุด 2 จุดในหน่วยเมตร (Haversine formula)"""
    lat1, lon1 = math.radians(coord1[1]), math.radians(coord1[0])
    lat2, lon2 = math.radians(coord2[1]), math.radians(coord2[0])
    
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    
    a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
    c = 2 * math.asin(math.sqrt(a))
    r = 6371000  # รัศมีโลกในหน่วยเมตร
    
    return c * r

def format_distance(length_meters):
    """จัดรูปแบบการแสดงระยะทาง"""
    if length_meters < 1000:
        return f"{round(length_meters, 2)} ม."
    else:
        km = int(length_meters // 1000)
        remaining_meters = length_meters % 1000
        return f"{km} กม. {round(remaining_meters, 2)} ม."

def process_linestring_segments(coordinates):
    """ประมวลผล LineString เป็น segments"""
    length_meters = calculate_linestring_length(coordinates)
    
    segment = {
        "segment_number": 1,
        "length_meters": round(length_meters, 2),
        "distance_display": format_distance(length_meters),
        "coordinates": coordinates
    }
    
    return [segment], length_meters

def process_multilinestring_segments(coordinates):
    """ประมวลผล MultiLineString เป็น segments"""
    segments = []
    total_length = 0
    
    for i, linestring_coords in enumerate(coordinates, 1):
        length_meters = calculate_linestring_length(linestring_coords)
        total_length += length_meters
        
        segment = {
            "segment_number": i,
            "length_meters": round(length_meters, 2),
            "distance_display": format_distance(length_meters),
            "coordinates": linestring_coords
        }
        segments.append(segment)
    
    return segments, total_length

def create_segments_summary(segments):
    """สร้างสรุปข้อมูล segments"""
    if len(segments) == 1:
        return "1 เส้น"
    else:
        segment_details = []
        for segment in segments:
            segment_details.append(f"เส้น {segment['segment_number']}: {segment['distance_display']}")
        
        segments_list = ", ".join(segment_details)
        return f"{len(segments)} เส้น ({segments_list})"

def calculate_linestring_length(coordinates):
    """คำนวณความยาวของ LineString"""
    total_length = 0
    for i in range(len(coordinates) - 1):
        total_length += calculate_distance(coordinates[i], coordinates[i + 1])
    return total_length
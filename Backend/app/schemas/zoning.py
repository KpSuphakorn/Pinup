from pydantic import BaseModel
from typing import List, Any

class ZoningFeature(BaseModel):
    type: str
    properties: dict
    geometry: dict

class ZoningGeoJSON(BaseModel):
    type: str
    features: List[ZoningFeature]
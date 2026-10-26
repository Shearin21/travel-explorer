"""Pydantic models: describe the shape of the JSON the API returns."""
from pydantic import BaseModel


class Destination(BaseModel):
    id: int
    name: str
    location: str
    category: str
    short_description: str
    description: str
    budget: str
    best_time: str
    image_url: str

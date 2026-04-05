from pydantic import BaseModel


class CategoryOut(BaseModel):
    id: int
    name: str

    model_config = {"from_attributes": True}


class ProductOut(BaseModel):
    id: int
    title: str
    brand: str
    image_url: str
    price: int
    rating_avg: float
    rating_count: int
    category: str

    model_config = {"from_attributes": True}


class ProductListResponse(BaseModel):
    total: int
    products: list[ProductOut]

from datetime import datetime

from pydantic import BaseModel


class OrderItemOut(BaseModel):
    id: int
    product_id: int | None
    title: str
    image_url: str
    price: int
    quantity: int

    model_config = {"from_attributes": True}


class OrderOut(BaseModel):
    id: int
    status: str
    total: int
    created_at: datetime
    items: list[OrderItemOut]

    model_config = {"from_attributes": True}

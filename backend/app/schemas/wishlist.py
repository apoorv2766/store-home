from pydantic import BaseModel


class WishlistItemOut(BaseModel):
    id: int
    product_id: int
    title: str
    image_url: str
    price: int
    rating_avg: float

    model_config = {"from_attributes": True}

from pydantic import BaseModel


class CartAddRequest(BaseModel):
    product_id: int
    quantity: int = 1


class CartUpdateRequest(BaseModel):
    quantity: int


class CartItemOut(BaseModel):
    id: int
    product_id: int
    quantity: int
    title: str
    image_url: str
    price: int

    model_config = {"from_attributes": True}

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_current_user
from app.database import get_db
from app.models.cart import CartItem
from app.models.product import Product
from app.models.user import User
from app.schemas.cart import CartAddRequest, CartItemOut, CartUpdateRequest

router = APIRouter(prefix="/cart", tags=["cart"])


async def _get_items(user_id: int, db: AsyncSession) -> list[CartItemOut]:
    result = await db.execute(
        select(CartItem, Product)
        .join(Product, CartItem.product_id == Product.id)
        .where(CartItem.user_id == user_id)
    )
    rows = result.all()
    return [
        CartItemOut(
            id=ci.id,
            product_id=ci.product_id,
            quantity=ci.quantity,
            title=p.title,
            image_url=p.image_url,
            price=p.price,
        )
        for ci, p in rows
    ]


@router.get("/", response_model=list[CartItemOut])
async def get_cart(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await _get_items(current_user.id, db)


@router.post("/", response_model=list[CartItemOut], status_code=201)
async def add_to_cart(
    body: CartAddRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    # Check product exists
    product = await db.get(Product, body.product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # Upsert: if already in cart, increment quantity
    result = await db.execute(
        select(CartItem).where(
            CartItem.user_id == current_user.id,
            CartItem.product_id == body.product_id,
        )
    )
    existing = result.scalar_one_or_none()
    if existing:
        existing.quantity += body.quantity
    else:
        db.add(CartItem(user_id=current_user.id, product_id=body.product_id, quantity=body.quantity))

    await db.commit()
    return await _get_items(current_user.id, db)


@router.put("/{item_id}", response_model=list[CartItemOut])
async def update_cart_item(
    item_id: int,
    body: CartUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(CartItem).where(CartItem.id == item_id, CartItem.user_id == current_user.id)
    )
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    if body.quantity <= 0:
        await db.delete(item)
    else:
        item.quantity = body.quantity

    await db.commit()
    return await _get_items(current_user.id, db)


@router.delete("/{item_id}", response_model=list[CartItemOut])
async def remove_cart_item(
    item_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(CartItem).where(CartItem.id == item_id, CartItem.user_id == current_user.id)
    )
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    await db.delete(item)
    await db.commit()
    return await _get_items(current_user.id, db)


@router.delete("/", response_model=list[CartItemOut])
async def clear_cart(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(CartItem).where(CartItem.user_id == current_user.id))
    items = result.scalars().all()
    for item in items:
        await db.delete(item)
    await db.commit()
    return []

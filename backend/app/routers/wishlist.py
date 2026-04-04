from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_current_user
from app.database import get_db
from app.models.product import Product
from app.models.user import User
from app.models.wishlist import WishlistItem
from app.schemas.wishlist import WishlistItemOut

router = APIRouter(prefix="/wishlist", tags=["wishlist"])


async def _get_items(user_id: int, db: AsyncSession) -> list[WishlistItemOut]:
    result = await db.execute(
        select(WishlistItem, Product)
        .join(Product, WishlistItem.product_id == Product.id)
        .where(WishlistItem.user_id == user_id)
    )
    return [
        WishlistItemOut(
            id=wi.id,
            product_id=wi.product_id,
            title=p.title,
            image_url=p.image_url,
            price=p.price,
            rating_avg=p.rating_avg,
        )
        for wi, p in result.all()
    ]


@router.get("/", response_model=list[WishlistItemOut])
async def get_wishlist(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await _get_items(current_user.id, db)


@router.post("/{product_id}", response_model=list[WishlistItemOut], status_code=201)
async def add_to_wishlist(
    product_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    product = await db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    existing = await db.execute(
        select(WishlistItem).where(
            WishlistItem.user_id == current_user.id,
            WishlistItem.product_id == product_id,
        )
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="Already in wishlist")

    db.add(WishlistItem(user_id=current_user.id, product_id=product_id))
    await db.commit()
    return await _get_items(current_user.id, db)


@router.delete("/{product_id}", response_model=list[WishlistItemOut])
async def remove_from_wishlist(
    product_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(WishlistItem).where(
            WishlistItem.user_id == current_user.id,
            WishlistItem.product_id == product_id,
        )
    )
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Not in wishlist")

    await db.delete(item)
    await db.commit()
    return await _get_items(current_user.id, db)

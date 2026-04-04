from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_current_user
from app.database import get_db
from app.models.cart import CartItem
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.models.user import User
from app.schemas.order import OrderOut

router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("/", response_model=OrderOut, status_code=201)
async def place_order(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    # Load cart items with product details
    result = await db.execute(
        select(CartItem, Product)
        .join(Product, CartItem.product_id == Product.id)
        .where(CartItem.user_id == current_user.id)
    )
    rows = result.all()
    if not rows:
        raise HTTPException(status_code=400, detail="Cart is empty")

    # Calculate total
    total = sum(p.price * ci.quantity for ci, p in rows)

    # Create order
    order = Order(user_id=current_user.id, total=total, status="placed")
    db.add(order)
    await db.flush()  # get order.id without committing

    # Create order items (snapshot prices at purchase time)
    for ci, p in rows:
        db.add(OrderItem(
            order_id=order.id,
            product_id=p.id,
            title=p.title,
            image_url=p.image_url,
            price=p.price,
            quantity=ci.quantity,
        ))

    # Clear cart
    for ci, _ in rows:
        await db.delete(ci)

    await db.commit()
    await db.refresh(order)
    return order


@router.get("/", response_model=list[OrderOut])
async def list_orders(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Order)
        .where(Order.user_id == current_user.id)
        .order_by(Order.created_at.desc())
    )
    return result.scalars().all()


@router.get("/{order_id}", response_model=OrderOut)
async def get_order(
    order_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Order).where(Order.id == order_id, Order.user_id == current_user.id)
    )
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

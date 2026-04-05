from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.product import Category, Product
from app.schemas.product import CategoryOut, ProductListResponse, ProductOut

router = APIRouter()


def _to_product_out(row) -> ProductOut:
    return ProductOut(
        id=row.Product.id,
        title=row.Product.title,
        brand=row.Product.brand,
        image_url=row.Product.image_url,
        price=row.Product.price,
        rating_avg=row.Product.rating_avg,
        rating_count=row.Product.rating_count,
        category=row.category_name,
    )


@router.get("/products", response_model=ProductListResponse)
async def get_products(
    category: Optional[str] = Query(None, description="Filter by category name"),
    search: Optional[str] = Query(None, description="Search by product title"),
    sort: Optional[str] = Query(None, description="az | za | lh | hl"),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(Product, Category.name.label("category_name"))
        .join(Category)
    )

    if category:
        stmt = stmt.where(Category.name.ilike(category))

    if search:
        stmt = stmt.where(Product.title.ilike(f"%{search}%"))

    if sort == "az":
        stmt = stmt.order_by(Product.title.asc())
    elif sort == "za":
        stmt = stmt.order_by(Product.title.desc())
    elif sort == "lh":
        stmt = stmt.order_by(Product.price.asc())
    elif sort == "hl":
        stmt = stmt.order_by(Product.price.desc())

    result = await db.execute(stmt)
    rows = result.all()
    products = [_to_product_out(row) for row in rows]

    return ProductListResponse(total=len(products), products=products)


@router.get("/products/{product_id}", response_model=ProductOut)
async def get_product(product_id: int, db: AsyncSession = Depends(get_db)):
    stmt = (
        select(Product, Category.name.label("category_name"))
        .join(Category)
        .where(Product.id == product_id)
    )
    result = await db.execute(stmt)
    row = result.first()

    if not row:
        raise HTTPException(status_code=404, detail="Product not found")

    return _to_product_out(row)


@router.get("/categories", response_model=list[CategoryOut])
async def get_categories(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Category).order_by(Category.name))
    return result.scalars().all()

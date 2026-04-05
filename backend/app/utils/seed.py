"""
Seed script — populates the database with categories and all products
from the original Product_Array.js data.

Changes made vs. original JS data:
  - 'tittle' typo fixed to 'title'
  - JSX Rating converted: fa-solid fa-star -> 5.0, fa-regular fa-star -> 3.0
  - base64 image strings replaced with proper Amazon URLs
  - Duplicate IDs (22, 89) handled naturally by DB auto-increment
  - IDs are assigned by the database (do not rely on original JS IDs)

Run from the backend/ directory:
    python -m app.utils.seed
"""

import asyncio
import sys
import os

# Allow running from backend/ root
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker

from app.core.config import settings
from app.database import Base
from app.models.product import Category, Product  # noqa: F401 — registers models with Base

# ---------------------------------------------------------------------------
# Seed data
# Format: (title, brand, image_url, price, rating_avg, category_name)
# rating_avg: 5.0 = fa-solid fa-star, 3.0 = fa-regular fa-star
# ---------------------------------------------------------------------------

PRODUCTS = [
    # ── Laptops ─────────────────────────────────────────────────────────────
    ("Honor G-14", "Honor",
     "https://m.media-amazon.com/images/I/71tHNTGasKL._AC_UY327_QL65_.jpg",
     44444, 5.0, "Laptop"),
    ("Vivobook Oled", "ASUS",
     "https://m.media-amazon.com/images/I/71kJlKb2r8L._AC_UY327_FMwebp_QL65_.jpg",
     121999, 3.0, "Laptop"),
    ("Ideapad 21", "Lenovo",
     "https://m.media-amazon.com/images/I/61J2IC1HGsL._AC_UY327_FMwebp_QL65_.jpg",
     45999, 3.0, "Laptop"),
    ("Thin 17", "Samsung",
     "https://m.media-amazon.com/images/I/816fTYVn5lL._AC_UY327_FMwebp_QL65_.jpg",
     69999, 5.0, "Laptop"),
    ("Aspire 16", "Acer",
     "https://m.media-amazon.com/images/I/71czGb00k5L._AC_UY327_FMwebp_QL65_.jpg",
     24999, 5.0, "Laptop"),
    ("Vivobook 3", "ASUS",
     "https://m.media-amazon.com/images/I/71kJlKb2r8L._AC_UY327_FMwebp_QL65_.jpg",
     119999, 3.0, "Laptop"),
    ("Ideapad 4", "Lenovo",
     "https://m.media-amazon.com/images/I/61J2IC1HGsL._AC_UY327_FMwebp_QL65_.jpg",
     15999, 3.0, "Laptop"),
    ("Edge 2", "Samsung",
     "https://m.media-amazon.com/images/I/816fTYVn5lL._AC_UY327_FMwebp_QL65_.jpg",
     9999, 5.0, "Laptop"),
    ("Aspire Lite", "Acer",
     "https://m.media-amazon.com/images/I/71czGb00k5L._AC_UY327_FMwebp_QL65_.jpg",
     24999, 5.0, "Laptop"),
    ("M1 Pro", "Apple",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsFIIA_1LCG3XBnnf5MkqOy2WwzfGZB5GQfQ&usqp=CAU",
     150, 5.0, "Laptop"),
    ("G15", "Dell",
     "https://m.media-amazon.com/images/I/715AMs200XL._AC_UY327_FMwebp_QL65_.jpg",
     15499, 5.0, "Laptop"),
    ("Spectre 14", "HP",
     "https://m.media-amazon.com/images/I/71WDKRWNdaL._AC_UY327_FMwebp_QL65_.jpg",
     39999, 5.0, "Laptop"),
    ("Msi Legion", "MSI",
     "https://m.media-amazon.com/images/I/612uH7PYGIL._AC_UY327_QL65_.jpg",
     32999, 5.0, "Laptop"),
    ("Honor 12", "Honor",
     "https://m.media-amazon.com/images/I/71tHNTGasKL._AC_UY327_QL65_.jpg",
     44444, 5.0, "Laptop"),
    ("Vivibook 12", "ASUS",
     "https://m.media-amazon.com/images/I/71kJlKb2r8L._AC_UY327_FMwebp_QL65_.jpg",
     119999, 3.0, "Laptop"),
    ("M2 Pro", "Apple",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsFIIA_1LCG3XBnnf5MkqOy2WwzfGZB5GQfQ&usqp=CAU",
     150, 5.0, "Laptop"),
    ("G-22", "Dell",
     "https://m.media-amazon.com/images/I/715AMs200XL._AC_UY327_FMwebp_QL65_.jpg",
     36999, 5.0, "Laptop"),
    ("Spectr A-12", "HP",
     "https://m.media-amazon.com/images/I/71WDKRWNdaL._AC_UY327_FMwebp_QL65_.jpg",
     39999, 5.0, "Laptop"),
    ("Gaming H-12", "MSI",
     "https://m.media-amazon.com/images/I/612uH7PYGIL._AC_UY327_QL65_.jpg",
     32999, 5.0, "Laptop"),
    ("H-15", "Honor",
     "https://m.media-amazon.com/images/I/71tHNTGasKL._AC_UY327_QL65_.jpg",
     44444, 5.0, "Laptop"),
    ("Ideapad 8", "Lenovo",
     "https://m.media-amazon.com/images/I/61J2IC1HGsL._AC_UY327_FMwebp_QL65_.jpg",
     55999, 3.0, "Laptop"),
    ("Ultra 7", "Samsung",
     "https://m.media-amazon.com/images/I/816fTYVn5lL._AC_UY327_FMwebp_QL65_.jpg",
     89999, 5.0, "Laptop"),
    ("Aspire Lite Pro", "Acer",
     "https://m.media-amazon.com/images/I/71czGb00k5L._AC_UY327_FMwebp_QL65_.jpg",
     24999, 5.0, "Laptop"),
    ("M1 Pro Max", "Apple",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsFIIA_1LCG3XBnnf5MkqOy2WwzfGZB5GQfQ&usqp=CAU",
     300, 5.0, "Laptop"),
    ("G44", "Dell",
     "https://m.media-amazon.com/images/I/715AMs200XL._AC_UY327_FMwebp_QL65_.jpg",
     15499, 5.0, "Laptop"),
    ("Hp14", "HP",
     "https://m.media-amazon.com/images/I/71WDKRWNdaL._AC_UY327_FMwebp_QL65_.jpg",
     39999, 5.0, "Laptop"),
    ("Legion 3", "MSI",
     "https://m.media-amazon.com/images/I/612uH7PYGIL._AC_UY327_QL65_.jpg",
     32999, 5.0, "Laptop"),

    # ── Mobiles ─────────────────────────────────────────────────────────────
    ("Fold N", "Oppo",
     "https://image.oppo.com/content/dam/oppo/common/mkt/v2-2/find-n2-flip-en/no-silk-screen/navigation/find-n2-flip-purple_427_600.png.thumb.webp",
     11999, 3.0, "Mobile"),
    ("V27 Pro", "Vivo",
     "https://in-exstatic-vivofs.vivo.com/gdHFRinHEMrj3yPG/1695699531339/c596a5df05552b2e7a07363ad6b98085.png",
     15999, 3.0, "Mobile"),
    ("C53", "Realme",
     "https://image01.realme.net/general/20230831/16934543994551854a5c5f6d146f2b7e6c3c4bb51b0b7.png.webp",
     9999, 5.0, "Mobile"),
    # base64 original replaced with proper Amazon URL
    ("S21 FE", "Samsung",
     "https://m.media-amazon.com/images/I/71BiWSCGSEL._AC_UY218_.jpg",
     24999, 5.0, "Mobile"),
    ("Iphone 14", "Apple",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHFgnSEkvoOiIL5oClTiWGl86sUdqN7Do3Dg&usqp=CAU",
     150, 5.0, "Mobile"),
    ("Z6 Lite", "Iqoo",
     "https://m.media-amazon.com/images/I/61VbKHdE0rL._AC_UY218_.jpg",
     15499, 5.0, "Mobile"),
    ("7 Legend", "Iqoo",
     "https://m.media-amazon.com/images/I/51LOXKT+vvL._AC_UY218_.jpg",
     39999, 5.0, "Mobile"),
    ("A53", "Techno",
     "https://image.oppo.com/content/dam/oppo/common/mkt/v2-2/find-n2-flip-en/no-silk-screen/navigation/find-n2-flip-purple_427_600.png.thumb.webp",
     32999, 5.0, "Mobile"),
    ("Zero 30", "Infinix",
     "https://m.media-amazon.com/images/I/616BYxu8ynL._AC_UY218_.jpg",
     44444, 5.0, "Mobile"),
    ("Agni", "Lava",
     "https://m.media-amazon.com/images/I/61OBw+XUiuL._AC_UY218_.jpg",
     15999, 5.0, "Mobile"),
    ("Z7 Pro", "Iqoo",
     "https://m.media-amazon.com/images/I/61Id6WJDWqL._AC_UY218_.jpg",
     19999, 5.0, "Mobile"),
    ("Edge 40", "Motorola",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4S_mp2y1fvH0M2CiEno79qlKot3YEwObxbw&usqp=CAU",
     15499, 5.0, "Mobile"),
    ("Legend 8", "Iqoo",
     "https://m.media-amazon.com/images/I/51LOXKT+vvL._AC_UY218_.jpg",
     39999, 5.0, "Mobile"),
    ("Flip N", "Techno",
     "https://image.oppo.com/content/dam/oppo/common/mkt/v2-2/find-n2-flip-en/no-silk-screen/navigation/find-n2-flip-purple_427_600.png.thumb.webp",
     32999, 5.0, "Mobile"),
    # base64 original replaced
    ("S23", "Samsung",
     "https://m.media-amazon.com/images/I/71jEDtpLFsL._AC_UY218_.jpg",
     24999, 5.0, "Mobile"),
    ("Z7 Pro Plus", "Iqoo",
     "https://m.media-amazon.com/images/I/61Id6WJDWqL._AC_UY218_.jpg",
     19999, 5.0, "Mobile"),
    ("g84", "Motorola",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTexQ0ENmbNseUanvvMMZab4B7nsFDEGu--TkCfWeMibvcdZOEcTdnaUiMELoLMAuQZvu8&usqp=CAU",
     15499, 5.0, "Mobile"),
    ("Fold N 2", "Techno",
     "https://image.oppo.com/content/dam/oppo/common/mkt/v2-2/find-n2-flip-en/no-silk-screen/navigation/find-n2-flip-purple_427_600.png.thumb.webp",
     32999, 5.0, "Mobile"),
    ("Zero 30 Pro", "Cameo",
     "https://m.media-amazon.com/images/I/616BYxu8ynL._AC_UY218_.jpg",
     44444, 5.0, "Mobile"),
    ("Agni 20", "Lava",
     "https://m.media-amazon.com/images/I/61OBw+XUiuL._AC_UY218_.jpg",
     15999, 5.0, "Mobile"),
    ("Legend 11", "Iqoo",
     "https://m.media-amazon.com/images/I/51LOXKT+vvL._AC_UY218_.jpg",
     39999, 5.0, "Mobile"),
    ("Phanton 5", "Techno",
     "https://image.oppo.com/content/dam/oppo/common/mkt/v2-2/find-n2-flip-en/no-silk-screen/navigation/find-n2-flip-purple_427_600.png.thumb.webp",
     32999, 5.0, "Mobile"),
    # base64 original replaced
    ("S23 FE", "Samsung",
     "https://m.media-amazon.com/images/I/61BT1o2Z3EL._AC_UY218_.jpg",
     24999, 5.0, "Mobile"),
    ("Edge 40 Neo", "Motorola",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv4gzLgE8O8ApBetIBi1sB3zDqhygWQ1_CYYagqSdCPr-MToHKv9fKgy_kNZYq2q7e5fA&usqp=CAU",
     19999, 5.0, "Mobile"),

    # ── Television ──────────────────────────────────────────────────────────
    ("LG 55 inches 4K Ultra HD", "LG",
     "https://images-eu.ssl-images-amazon.com/images/I/51KOr+YqZeL._AC_SX184_.jpg",
     45999, 5.0, "Television"),
    ("LG 43 inches 4K Ultra HD", "LG",
     "https://images-eu.ssl-images-amazon.com/images/I/41pZdCCyZ4L._AC_SX184_.jpg",
     24999, 5.0, "Television"),
    ("LG 32 inches 4K Ultra HD", "LG",
     "https://images-eu.ssl-images-amazon.com/images/I/51ymj+k-hwL._AC_SX184_.jpg",
     19999, 5.0, "Television"),
    ("LG 43 inches HD", "LG",
     "https://images-eu.ssl-images-amazon.com/images/I/51jVl8FkUyL._AC_SX184_.jpg",
     27999, 5.0, "Television"),
    ("LG 55 inches 4K Ultra", "LG",
     "https://images-eu.ssl-images-amazon.com/images/I/51jVl8FkUyL._AC_SX184_.jpg",
     72499, 5.0, "Television"),
    ("OnePlus 65 inches U Series 4K", "OnePlus",
     "https://images-eu.ssl-images-amazon.com/images/I/51ovMTXv9RL._AC_SX184_.jpg",
     39999, 5.0, "Television"),
    ("OnePlus 55 inches U Series 4K", "OnePlus",
     "https://images-eu.ssl-images-amazon.com/images/I/41sSPp4pkYL._AC_SX184_.jpg",
     22999, 5.0, "Television"),
    ("Sony Bravia 55 inch 4K", "Sony",
     "https://images-eu.ssl-images-amazon.com/images/I/51I93NaMwXL._AC_SX184_.jpg",
     44999, 5.0, "Television"),
    ("Sony Bravia 43 inch 4K", "Sony",
     "https://images-eu.ssl-images-amazon.com/images/I/41DxwmrpFSL._AC_SX184_.jpg",
     38999, 5.0, "Television"),
    ("Sony Bravia 32 inch", "Sony",
     "https://images-eu.ssl-images-amazon.com/images/I/41OoVLGB+pL._AC_SX184_.jpg",
     19499, 5.0, "Television"),
    ("Sony Bravia 65 inch 4K", "Sony",
     "https://m.media-amazon.com/images/I/81qx8YtutXL._AC_UL480_QL65_.jpg",
     59999, 5.0, "Television"),
    ("Samsung 32 Inches HD", "Samsung",
     "https://images-eu.ssl-images-amazon.com/images/I/41I+Opa4rbL._AC_SX184_.jpg",
     22999, 5.0, "Television"),
    ("Samsung 43 Inches HD", "Samsung",
     "https://images-eu.ssl-images-amazon.com/images/I/511uzbAnMOL._AC_SX184_.jpg",
     21444, 5.0, "Television"),
    ("Samsung 43 Inches HD Plus", "Samsung",
     "https://images-eu.ssl-images-amazon.com/images/I/41EE7IZlGvL._AC_SX184_.jpg",
     29999, 3.0, "Television"),
    ("Samsung 55 Inches 4K", "Samsung",
     "https://images-eu.ssl-images-amazon.com/images/I/51pet68bExL._AC_SX184_.jpg",
     125999, 3.0, "Television"),
    ("MI 50 inch 4K", "MI",
     "https://images-eu.ssl-images-amazon.com/images/I/41t5honxJ4L._AC_SX184_.jpg",
     17499, 5.0, "Television"),
    ("MI 55 inch 4K", "MI",
     "https://images-eu.ssl-images-amazon.com/images/I/41gmv26MMiL._AC_SX184_.jpg",
     44444, 5.0, "Television"),
    ("MI 43 inch", "MI",
     "https://images-eu.ssl-images-amazon.com/images/I/41BPgIwg21L._AC_SX184_.jpg",
     19999, 3.0, "Television"),
    ("MI 43 inch Pro", "MI",
     "https://images-eu.ssl-images-amazon.com/images/I/41jh12qGXuL._AC_SX184_.jpg",
     25999, 3.0, "Television"),
    ("MI 32 inch", "MI",
     "https://images-eu.ssl-images-amazon.com/images/I/518sTcK7UGL._AC_SX184_.jpg",
     12999, 5.0, "Television"),

    # ── Washing Machines ────────────────────────────────────────────────────
    ("Whirlpool 6.5kg Front Load", "Whirlpool",
     "https://m.media-amazon.com/images/I/51laQHmd9uL._AC_UL480_FMwebp_QL65_.jpg",
     24999, 5.0, "Washing_Machine"),
    ("Whirlpool 8kg Semi Automatic", "Whirlpool",
     "https://m.media-amazon.com/images/I/31C9cdx2hcL._AC_UL480_FMwebp_QL65_.jpg",
     8999, 5.0, "Washing_Machine"),
    ("IFB 8kg Front Load", "IFB",
     "https://m.media-amazon.com/images/I/61yvbripxsL._AC_UL480_FMwebp_QL65_.jpg",
     15499, 5.0, "Washing_Machine"),
    ("IFB 8kg Top Load", "IFB",
     "https://m.media-amazon.com/images/I/61CH5bFxAlL._AC_UL480_FMwebp_QL65_.jpg",
     29999, 5.0, "Washing_Machine"),
    ("IFB 8kg Front Load Pro", "IFB",
     "https://m.media-amazon.com/images/I/61XEW0cyE7L._AC_UL480_FMwebp_QL65_.jpg",
     32999, 5.0, "Washing_Machine"),
    ("Panasonic 7kg Top Load", "Panasonic",
     "https://m.media-amazon.com/images/I/51uVzVsKuZL._AC_UL480_FMwebp_QL65_.jpg",
     21444, 5.0, "Washing_Machine"),
    ("Panasonic 7kg Semi Automatic", "Panasonic",
     "https://m.media-amazon.com/images/I/7103XFcyP4L._AC_UL480_FMwebp_QL65_.jpg",
     21999, 3.0, "Washing_Machine"),
    ("LG 7kg Full Automatic", "LG",
     "https://m.media-amazon.com/images/I/71wP-loNo1L._AC_UL480_FMwebp_QL65_.jpg",
     26999, 3.0, "Washing_Machine"),
    ("LG 8kg Front Load", "LG",
     "https://m.media-amazon.com/images/I/71a8I0NaFJL._AC_UL480_FMwebp_QL65_.jpg",
     29999, 3.0, "Washing_Machine"),
    ("LG 6.5kg Semi Automatic", "LG",
     "https://m.media-amazon.com/images/I/81MvBRqv-+L._AC_UL480_FMwebp_QL65_.jpg",
     9999, 5.0, "Washing_Machine"),
    ("LG 8kg Front Load Plus", "LG",
     "https://m.media-amazon.com/images/I/81vmFzPrOhL._AC_UL480_FMwebp_QL65_.jpg",
     24999, 5.0, "Washing_Machine"),
    ("LG 6kg Semi Automatic", "LG",
     "https://m.media-amazon.com/images/I/41EjAnLPeFL._AC_UL480_FMwebp_QL65_.jpg",
     12999, 5.0, "Washing_Machine"),
    ("Samsung 7kg Top Load", "Samsung",
     "https://m.media-amazon.com/images/I/61QJpARvgRL._AC_UL480_FMwebp_QL65_.jpg",
     15499, 5.0, "Washing_Machine"),
    ("Samsung 8kg Front Load", "Samsung",
     "https://m.media-amazon.com/images/I/71ZMYMhP5TL._AC_UL480_FMwebp_QL65_.jpg",
     39999, 5.0, "Washing_Machine"),
    ("Samsung 6.5kg Semi Automatic", "Samsung",
     "https://m.media-amazon.com/images/I/71llBCQTf-L._AC_UL480_FMwebp_QL65_.jpg",
     32999, 5.0, "Washing_Machine"),
    ("Samsung 6.5kg Full Automatic", "Samsung",
     "https://m.media-amazon.com/images/I/61+1gTYBhJL._AC_UL480_FMwebp_QL65_.jpg",
     44444, 5.0, "Washing_Machine"),
    ("Samsung 8.5kg Semi Automatic", "Samsung",
     "https://m.media-amazon.com/images/I/71hZy1F9tlL._AC_UL480_FMwebp_QL65_.jpg",
     119999, 3.0, "Washing_Machine"),
    ("Whirlpool 7kg Full Automatic", "Whirlpool",
     "https://m.media-amazon.com/images/I/61pg390x--L._AC_UL480_FMwebp_QL65_.jpg",
     25999, 3.0, "Washing_Machine"),
    ("Whirlpool 6.5kg Semi Automatic", "Whirlpool",
     "https://m.media-amazon.com/images/I/61wjegDtB5L._AC_UL480_FMwebp_QL65_.jpg",
     12999, 5.0, "Washing_Machine"),
    ("Bosch 7kg Front Load", "Bosch",
     "https://m.media-amazon.com/images/I/41OYSP0glWL._AC_UL480_FMwebp_QL65_.jpg",
     45999, 3.0, "Washing_Machine"),
    ("Bosch 7kg Top Load", "Bosch",
     "https://m.media-amazon.com/images/I/41OYSP0glWL._AC_UL480_FMwebp_QL65_.jpg",
     28999, 5.0, "Washing_Machine"),
    ("Bosch 6kg Top Load", "Bosch",
     "https://m.media-amazon.com/images/I/31PafZrmyyL._AC_UL480_FMwebp_QL65_.jpg",
     24999, 5.0, "Washing_Machine"),
    ("Bosch 8kg Front Load", "Bosch",
     "https://m.media-amazon.com/images/I/411TVBfyA5L._AC_UL480_FMwebp_QL65_.jpg",
     32999, 5.0, "Washing_Machine"),
    ("Whirlpool 8kg Semi Automatic Pro", "Whirlpool",
     "https://m.media-amazon.com/images/I/31C9cdx2hcL._AC_UL480_FMwebp_QL65_.jpg",
     8999, 5.0, "Washing_Machine"),
    ("IFB 8kg Front Load Elite", "IFB",
     "https://m.media-amazon.com/images/I/61yvbripxsL._AC_UL480_FMwebp_QL65_.jpg",
     15499, 5.0, "Washing_Machine"),
    ("IFB 8kg Top Load Pro", "IFB",
     "https://m.media-amazon.com/images/I/61CH5bFxAlL._AC_UL480_FMwebp_QL65_.jpg",
     29999, 5.0, "Washing_Machine"),
    ("IFB 8kg Front Load Max", "IFB",
     "https://m.media-amazon.com/images/I/61XEW0cyE7L._AC_UL480_FMwebp_QL65_.jpg",
     32999, 5.0, "Washing_Machine"),
]

CATEGORIES = ["Laptop", "Mobile", "Television", "Washing_Machine"]


async def seed():
    engine = create_async_engine(settings.DATABASE_URL, echo=False)
    session_factory = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with session_factory() as session:
        # Check if already seeded
        result = await session.execute(select(Category))
        if result.scalars().first():
            print("Database already seeded — skipping.")
            await engine.dispose()
            return

        # Insert categories
        category_map: dict[str, int] = {}
        for cat_name in CATEGORIES:
            cat = Category(name=cat_name)
            session.add(cat)
            await session.flush()
            category_map[cat_name] = cat.id

        # Insert products
        for title, brand, image_url, price, rating_avg, cat_name in PRODUCTS:
            product = Product(
                title=title,
                brand=brand,
                image_url=image_url,
                price=price,
                rating_avg=rating_avg,
                rating_count=0,
                category_id=category_map[cat_name],
            )
            session.add(product)

        await session.commit()
        print(f"Seeded {len(CATEGORIES)} categories and {len(PRODUCTS)} products.")

    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(seed())

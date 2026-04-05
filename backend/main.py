import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, cart, orders, products, wishlist

app = FastAPI(title="Store@Home API", version="1.0.0")

# Allow localhost in dev + any Vercel deployment URL in production
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    os.getenv("FRONTEND_URL", ""),          # set this on Railway to your Vercel URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o for o in ALLOWED_ORIGINS if o],  # filter empty strings
    allow_origin_regex=r"https://.*\.vercel\.app",    # allow all *.vercel.app previews
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router, prefix="/api")
app.include_router(auth.router, prefix="/api")
app.include_router(cart.router, prefix="/api")
app.include_router(wishlist.router, prefix="/api")
app.include_router(orders.router, prefix="/api")


@app.get("/")
async def root():
    return {"message": "Store@Home API is running"}

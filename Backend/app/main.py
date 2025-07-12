from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import zoning, population, land_price_subd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(zoning.router, prefix="/api")
app.include_router(population.router, prefix="/api")
app.include_router(land_price_subd.router, prefix="/api")
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import zoning, population, land_price_subd, bound_mun, bound_tambon, bound_amphoe

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
app.include_router(bound_mun.router, prefix="/api")
app.include_router(bound_tambon.router, prefix="/api")
app.include_router(bound_amphoe.router, prefix="/api")
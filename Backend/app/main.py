from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import zoning, population, land_price_subd, bound_mun, bound_tambon, bound_amphoe, bound_province, gate_count, bus_stop, bus_route, LRT_route, road, parking_lot, rural_argi, recreat_env, art_cult, low_dense_res_area, med_dense_res_area, education

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
app.include_router(bound_province.router, prefix="/api")

app.include_router(gate_count.router, prefix="/api")
app.include_router(bus_stop.router, prefix="/api")
app.include_router(bus_route.router, prefix="/api")
app.include_router(LRT_route.router, prefix="/api")
app.include_router(road.router, prefix="/api")
app.include_router(parking_lot.router, prefix="/api")

app.include_router(rural_argi.router, prefix="/api")
app.include_router(recreat_env.router, prefix="/api")
app.include_router(art_cult.router, prefix="/api")
app.include_router(low_dense_res_area.router, prefix="/api")
app.include_router(med_dense_res_area.router, prefix="/api")
app.include_router(education.router, prefix="/api")
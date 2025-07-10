from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import zoning

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(zoning.router, prefix="/api")

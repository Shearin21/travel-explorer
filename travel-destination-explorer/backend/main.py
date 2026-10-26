"""FastAPI backend for Travel Destination Explorer.
Run:  uvicorn main:app --reload --port 8000
"""
import sqlite3
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from database import get_connection, init_db
from models import Destination


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()  # runs once when the server starts
    yield


app = FastAPI(title="Travel Destination Explorer API", lifespan=lifespan)

# CORS: allows the React dev server (port 5173) to call this API (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok", "message": "Backend is running"}


@app.get("/api/destinations", response_model=list[Destination])
def list_destinations():
    try:
        conn = get_connection()
        try:
            rows = conn.execute("SELECT * FROM destinations ORDER BY id").fetchall()
        finally:
            conn.close()
        return [dict(r) for r in rows]
    except sqlite3.Error:
        raise HTTPException(status_code=500, detail="Database error while loading destinations")


@app.get("/api/destinations/{destination_id}", response_model=Destination)
def get_destination(destination_id: int):
    try:
        conn = get_connection()
        try:
            row = conn.execute(
                "SELECT * FROM destinations WHERE id = ?", (destination_id,)
            ).fetchone()
        finally:
            conn.close()
    except sqlite3.Error:
        raise HTTPException(status_code=500, detail="Database error while loading destination")
    if row is None:
        raise HTTPException(status_code=404, detail="Destination not found")
    return dict(row)


@app.get("/api/categories")
def list_categories():
    try:
        conn = get_connection()
        try:
            rows = conn.execute(
                "SELECT DISTINCT category FROM destinations ORDER BY category"
            ).fetchall()
        finally:
            conn.close()
        return [r["category"] for r in rows]
    except sqlite3.Error:
        raise HTTPException(status_code=500, detail="Database error while loading categories")

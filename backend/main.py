"""FastAPI application entry point."""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import API_HOST, API_PORT
from database import init_db
from routers import applications, browser_activity, categories, schedules, screen_time, settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    # Startup
    init_db()
    # TODO: Start screen time tracker background task
    # TODO: Start minimizer engine background task
    yield
    # Shutdown
    # TODO: Stop background tasks gracefully


app = FastAPI(
    title="Minimize Application API",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5199",
        "http://localhost:5173",
        "http://localhost:3000",
        "chrome-extension://*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(applications.router, prefix="/api/applications", tags=["applications"])
app.include_router(categories.router, prefix="/api/categories", tags=["categories"])
app.include_router(schedules.router, prefix="/api/schedules", tags=["schedules"])
app.include_router(screen_time.router, prefix="/api/screen-time", tags=["screen-time"])
app.include_router(settings.router, prefix="/api/settings", tags=["settings"])
app.include_router(
    browser_activity.router,
    prefix="/api/browser-activity",
    tags=["browser-activity"],
)


@app.get("/api/health")
async def health_check():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host=API_HOST, port=API_PORT)

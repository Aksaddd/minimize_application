"""Application configuration and constants."""

import os
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent
DATA_DIR = PROJECT_ROOT / "data"
DATABASE_PATH = DATA_DIR / "minimize_app.db"

# Ensure data directory exists
DATA_DIR.mkdir(exist_ok=True)

# Database
DATABASE_URL = f"sqlite:///{DATABASE_PATH}"

# Screen time tracking
DEFAULT_TRACKING_INTERVAL_MS = 5000

# API
API_HOST = "127.0.0.1"
API_PORT = 8742

# System windows to ignore during window enumeration
SYSTEM_WINDOW_TITLES = frozenset([
    "Default IME",
    "MSCTFIME UI",
    "Windows Input Experience",
    "Program Manager",
    "Settings",
])

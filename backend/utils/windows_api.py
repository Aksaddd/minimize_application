"""Windows API wrappers via ctypes.

Centralizes all direct Windows API calls so the rest of the codebase
works through clean Python interfaces.
"""

import ctypes
import ctypes.wintypes


def get_idle_duration_ms() -> int:
    """Get the system idle time in milliseconds.

    Uses GetLastInputInfo and GetTickCount to determine how long
    since the last keyboard or mouse input.
    """

    class LASTINPUTINFO(ctypes.Structure):
        _fields_ = [
            ("cbSize", ctypes.wintypes.UINT),
            ("dwTime", ctypes.wintypes.DWORD),
        ]

    lii = LASTINPUTINFO()
    lii.cbSize = ctypes.sizeof(LASTINPUTINFO)
    ctypes.windll.user32.GetLastInputInfo(ctypes.byref(lii))
    current_tick = ctypes.windll.kernel32.GetTickCount()
    return current_tick - lii.dwTime


def get_foreground_window_pid() -> int | None:
    """Get the PID of the foreground window's owning process."""
    hwnd = ctypes.windll.user32.GetForegroundWindow()
    if not hwnd:
        return None
    pid = ctypes.wintypes.DWORD()
    ctypes.windll.user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
    return pid.value


def get_window_title(hwnd: int) -> str:
    """Get the title text of a window by its handle."""
    length = ctypes.windll.user32.GetWindowTextLengthW(hwnd)
    if not length:
        return ""
    buf = ctypes.create_unicode_buffer(length + 1)
    ctypes.windll.user32.GetWindowTextW(hwnd, buf, length + 1)
    return buf.value


def minimize_window(hwnd: int):
    """Minimize a window by its handle."""
    SW_MINIMIZE = 6
    ctypes.windll.user32.ShowWindow(hwnd, SW_MINIMIZE)

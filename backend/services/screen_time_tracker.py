"""Screen time tracking service.

Polls the foreground window at regular intervals to record which
application the user is actively using. Data is stored as events
in the screen_time_events table.
"""


class ScreenTimeTracker:
    """Background service that records foreground application usage."""

    def __init__(self, interval_ms: int = 5000):
        self._interval_ms = interval_ms
        self._running = False
        self._current_app_id: int | None = None
        self._current_event_id: int | None = None

    async def start(self):
        """Start the screen time polling loop."""
        self._running = True
        # TODO: Begin polling GetForegroundWindow()
        # TODO: On app switch, close old event and open new one

    async def stop(self):
        """Stop tracking and close the current event."""
        self._running = False
        # TODO: Close current open event

    def _get_foreground_app(self) -> dict | None:
        """Get the currently focused application's process name and window title."""
        # TODO: Use ctypes GetForegroundWindow -> GetWindowThreadProcessId -> psutil
        return None

    def _record_app_switch(self, process_name: str, window_title: str):
        """Record a switch to a different foreground application."""
        # TODO: Close previous event, open new event
        # TODO: Auto-register unknown apps
        pass

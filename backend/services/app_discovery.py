"""Application discovery service.

Scans running processes to detect applications that can be tracked
or targeted by minimize rules. Filters out system processes and
background services.
"""


class AppDiscoveryService:
    """Discovers and registers running desktop applications."""

    # Common system processes to ignore
    SYSTEM_PROCESSES = frozenset([
        "System", "svchost.exe", "csrss.exe", "wininit.exe",
        "services.exe", "lsass.exe", "smss.exe", "dwm.exe",
        "explorer.exe", "RuntimeBroker.exe", "SearchHost.exe",
        "StartMenuExperienceHost.exe", "ShellExperienceHost.exe",
        "TextInputHost.exe", "ctfmon.exe", "conhost.exe",
        "taskhostw.exe", "sihost.exe", "fontdrvhost.exe",
    ])

    def get_running_apps(self) -> list[dict]:
        """Return a list of currently running user-facing applications.

        Returns:
            List of dicts with keys: process_name, pid, window_titles
        """
        # TODO: Use psutil to enumerate processes
        # TODO: Filter to those with visible windows
        # TODO: Exclude SYSTEM_PROCESSES
        return []

    def register_new_apps(self, apps: list[dict]):
        """Insert newly discovered apps into the database if not already tracked."""
        # TODO: Bulk upsert into applications table
        pass

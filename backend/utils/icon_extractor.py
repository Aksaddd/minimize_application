"""Extract application icons for dashboard display.

Extracts icons from Windows executables and saves them as PNG files
for use in the dashboard UI.
"""

from pathlib import Path


def extract_icon(exe_path: str, output_dir: Path) -> str | None:
    """Extract the icon from an executable and save as PNG.

    Args:
        exe_path: Full path to the .exe file.
        output_dir: Directory to save the extracted icon.

    Returns:
        Path to the saved icon file, or None if extraction failed.
    """
    # TODO: Use win32gui.ExtractIcon or Pillow to extract and save
    return None


def get_exe_path_for_process(process_name: str) -> str | None:
    """Find the full executable path for a running process by name.

    Args:
        process_name: The process name (e.g., "Notion.exe").

    Returns:
        Full path to the executable, or None if not found.
    """
    # TODO: Use psutil to find the process and return exe path
    return None

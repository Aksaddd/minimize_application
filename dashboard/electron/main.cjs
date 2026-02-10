const { app, BrowserWindow, Tray, Menu, nativeImage } = require("electron");
const path = require("path");

let mainWindow = null;
let tray = null;

const isDev = process.env.NODE_ENV !== "production";
const VITE_DEV_URL = "http://localhost:5173";

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 600,
    title: "Minimize — Application Manager",
    backgroundColor: "#000000",
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Load the app
  if (isDev) {
    mainWindow.loadURL(VITE_DEV_URL);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  // Show window when ready (prevents white flash)
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  // Minimize to tray instead of closing
  mainWindow.on("close", (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

function createTray() {
  // Create a simple 16x16 tray icon (white square with M)
  const icon = nativeImage.createFromDataURL(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAARklEQVQ4y2NgGAWDHTASowhkMDIy/idEDwMuFxBrCE4XEGsIXhcQYwheA4gxBK8BxBiC0wBiDcHrAmINwesCYgzBawAxhgAA4KkPEUmJ4xIAAAAASUVORK5CYII=",
  );

  tray = new Tray(icon);
  tray.setToolTip("Minimize — Application Manager");

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open Dashboard",
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        }
      },
    },
    { type: "separator" },
    {
      label: "Tracking",
      submenu: [
        { label: "Pause Tracking", type: "checkbox", checked: false },
      ],
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => {
        app.isQuitting = true;
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);

  // Click tray icon to show/hide window
  tray.on("click", () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }
    }
  });
}

// Single instance lock — prevent multiple windows
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  createTray();
});

app.on("window-all-closed", () => {
  // On macOS, apps stay active until Cmd+Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS, re-create window when dock icon is clicked
  if (mainWindow === null) {
    createWindow();
  }
});

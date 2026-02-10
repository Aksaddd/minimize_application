const { contextBridge, ipcRenderer } = require("electron");

// Expose a safe API to the renderer process
contextBridge.exposeInMainWorld("electronAPI", {
  // App control
  minimize: () => ipcRenderer.send("window:minimize"),
  maximize: () => ipcRenderer.send("window:maximize"),
  close: () => ipcRenderer.send("window:close"),

  // Platform info
  platform: process.platform,
  isElectron: true,
});

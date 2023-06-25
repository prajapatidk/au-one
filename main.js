// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const log = require("electron-log");
const { autoUpdater } = require("electron-updater");
const path = require("path");

let mainWindow;

log.transports.file.resolvePath = () =>
  path.join("E:/jsframework/electron/au-one/", "logs/main.log");

Object.defineProperty(app, "isPackaged", {
  get() {
    return true;
  },
});

autoUpdater.setFeedURL({
  provider: "github",
  owner: "prajapatidk",
  repo: "au-one",
  private: true,
});
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  autoUpdater.checkForUpdates();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

autoUpdater.on("checking-for-update", (info) => {
  log.info("checking-for-update", info);
  mainWindow.webContents.send("checkingStatus", "Checking for new updates");
});

autoUpdater.on("update-available", (info) => {
  log.info("update-available", info);
});

autoUpdater.on("update-not-available", (info) => {
  log.info("update-available", info);
});

autoUpdater.on("error", (info) => {
  log.info("error", info);
});

autoUpdater.on("download-process", (progressTrack) => {
  log.info(progressTrack);
});

autoUpdater.on("update-downloaded", (info) => {
  log.info("update-downloaded", info);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

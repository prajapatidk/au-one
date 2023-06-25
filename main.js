// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const { autoUpdater } = require("electron-updater");

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

const path = require("path");

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
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
  console.log("checking-for-update");
});

autoUpdater.on("update-available", (info) => {
  console.log("update-available");
});

autoUpdater.on("update-not-available", (info) => {
  console.log("update-available");
});

autoUpdater.on("error", (info) => {
  console.log("error");
});

autoUpdater.on("download-process", (progressTrack) => {
  console.log("\n\ndownload-process");
  console.log(progressTrack);
});

autoUpdater.on("update-downloaded", (info) => {
  console.log("update-downloaded");
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const ipcRenderer = require("electron");

ipcRenderer.on("checkingStatus", (event, msg) => {
  console.log(msg);
});

const electron = require("electron");
const path = require("path");
const { app, BrowserWindow, Tray, ipcMain } = electron;
const isDev = require("electron-is-dev");
const { evaluate } = require("mathjs");

let mainWindow;
let tray;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 400,
    height: 400,
    show: false,
    movable:true,
    //frame: false,
    //transparent: true,
    resizable: false,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      //devTools: false,
    },
  });

  // and load the index.html of the app.
  // mainWindow.loadFile("index.html");
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  

  const iconName = path.join(__dirname, "../src/assets/calculator.png");
  tray = new Tray(iconName);
  tray.on("click", (event, bounds) => {
    // const { x, y } = bounds;
    // const { height, width } = mainWindow.getBounds();
    // const yPosition = process.platform === "darwin" ? y : y / 2;
    // mainWindow.setBounds({
    //   x: x - width / 2,
    //   y: yPosition,
    //   height,
    //   width,
    // });
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  mainWindow.on('closed', () => app.quit())


  //app.dock.hide();

  // mainWindow.on("blur", () => {
  //   mainWindow.hide();
  // });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("calculate:calc", (_, value) => {
  let result;
  try {
    result = evaluate(value).toString();
  } catch {
    result = "";
  }
  mainWindow.webContents.send("calculate:calc", result);
});

ipcMain.on("calculate:clear", () => {
  mainWindow.webContents.send("calculate:clear");
});

ipcMain.on("calculate:back", (_, value) => {
  let result = value.slice(0, -1) || "";
  mainWindow.webContents.send("calculate:back", result);
});

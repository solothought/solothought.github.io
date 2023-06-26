var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.





// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  var mainWindow = new BrowserWindow({
    "skipTaskbar": false,
    "resizable": false,
    "maxWidth": "",
    "useContentSize": false,
    "icon": "",
    "enableLargerThanScreen": false,
    "autoHideMenuBar": false,
    "alwaysOnTop": false,
    "width": 800,
    "minWidth": "",
    "height": 600,
    "backgroundColor": "#000000",
    "transparent": false,
    "darkTheme": false,
    "fullscreen": false,
    "exeIcon": "",
    "y": 100,
    "frame": true,
    "maxHeight": "",
    "acceptFirstMouse": false,
    "minHeight": "",
    "disableAutoHideCursor": false,
    "kiosk": false,
    "macIcon": "",
    "webPreferences": {
        "webSecurity": true,
        "plugins": false,
        "directWrite": true,
        "allowRunningInsecureContent": false,
        "javascript": true,
        "experimentalFeatures": false,
        "webaudio": true,
        "webgl": true,
        "allowDisplayingInsecureContent": false,
        "nodeIntegration": true,
        "images": true,
        "experimentalCanvasFeatures": false,
        "textAreasAreResizable": true,
        "blinkFeatures": "",
        "preload": "",
        "zoomFactor": 1.0,
        "partition": ""
    },
    "x": 100,
    "center": true,
    "titleBarStyle": "default",
    "show": true,
    "title": "imglab",
    "type": "git"
});
  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.webContents.setUserAgent("");

  mainWindow.webContents.on('did-finish-load',function(){
    mainWindow.setTitle("imglab");
    
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

'use strict'

const electron = require('electron')
// Module to control application life.
const {app} = electron
// Module to create native browser window.
const {BrowserWindow} = electron

const path = require('path')

// command arguments.
const {version} = require(path.join(__dirname, 'package.json'))
const Command = require('commander')
Command.version(version)
  .option('-l, --label [LABEL]', 'Button label', 'world')
try {
  Command.parse(process.argv)
} catch (e) {
  /* Discard the exception that occurs when process.argv is only $0.
  TypeError: Path must be a string. Received undefined
      at assertPath (path.js:7:11)
      at basename (path.js:1357:5)
      at Command.parse
   */
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

global.sharedObject = {commandArguments: Command}

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600, icon: path.join(__dirname, 'images/app.png')})

  // and load the index.html of the app.
  win.loadURL(`file://${path.join(__dirname, 'index.html')}`)

  // Open the DevTools.
  // win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

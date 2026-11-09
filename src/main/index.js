import path from 'node:path'
import { app, BrowserWindow, ipcMain } from 'electron'
import { openDatabase } from './database/connection.js'

let db

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js')
    }
  })

  // electron-vite: en desarrollo sirve el renderer por HTTP, en prod carga el bundle
  if (process.env.ELECTRON_RENDERER_URL) {
    win.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    win.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
  win.once('ready-to-show', () => win.show())
}

app.whenReady().then(() => {
  const dbPath = path.join(app.getPath('userData'), 'inventory.db')
  db = openDatabase(dbPath)

  ipcMain.handle('app:ping', () => 'pong')

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (db) db.close()
    app.quit()
  }
})

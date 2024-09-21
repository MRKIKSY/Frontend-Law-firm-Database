const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadURL('http://localhost:3000'); // Point to your React/Vite app
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
const sqlite3 = require('sqlite3').verbose();
const dbPath = path.join(app.getPath('userData'), 'lawfirmDB.sqlite');
let db = new sqlite3.Database(dbPath);

// Create customers table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    dob TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    caseFile TEXT,
    pdf BLOB
)`);

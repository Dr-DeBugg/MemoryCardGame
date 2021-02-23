// main.js

const {app, BrowserWindow} = require('electron')

function createWindow (){
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    window.loadFile('app/index.html')
    window.webContents.openDevTools()
    window.once('ready-to-show', () => {
        window.show()
    });
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit()
    }
})

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})


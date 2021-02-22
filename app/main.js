// main.js

const {app, BrowserWindow} = require('electron')

function createWindow (){
    const wind = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    wind.loadFile('app/index.html')

    wind.webContents.openDevTools()

    wind.once('ready-to-show', () => {
        wind.show()
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


const {app, BrowserWindow, Menu} = require('electron');
const url = require('url');
const path = require('path');
const main = require('electron-reload');
const fs = require('fs');
const youtubedl = require('youtube-dl');

if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', 'bin', 'electron')
    })
}


let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true,
        width: 700,
        height:700,
        title: 'YoutubeDownload'
    }))

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);
    mainWindow.webContents.openDevTools()

    mainWindow.on('close', ()=> {
        app.quit();
    })
});



const templateMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Nueva lista de descarga',
                accelerator: 'Ctrl+N',
                click(){
                    
                }
            }
        ]
    }
];
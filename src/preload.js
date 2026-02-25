const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    descargarMp3: (data) => ipcRenderer.send('iniciar-descarga-mp3', data),
    onStatusUpdate: (callback) => ipcRenderer.on('status-descarga', (event, arg) => callback(arg))
});
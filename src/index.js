const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const { execFile } = require("child_process");
const os = require("os");

let mainWindow;

function getBinaryPath() {
  const isDev = !app.isPackaged;
  const platform = process.platform === "win32" ? "win" : "linux";
  const binaryName = process.platform === "win32" ? "yt-dlp.exe" : "yt-dlp";

  return isDev
    ? path.join(__dirname, "../resources", platform, binaryName)
    : path.join(process.resourcesPath, "bin", binaryName);
}

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 750,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  mainWindow.loadFile(path.join(__dirname, "views/index.html"));
});

ipcMain.on("iniciar-descarga-mp3", (event, { url, folderName }) => {
  const binPath = getBinaryPath();
  // Detectamos la carpeta "Music" o "Música" del sistema de forma agnóstica
  const musicDir = path.join(os.homedir(), "Music");

  const outputPath = path.join(musicDir, folderName, "%(title)s.%(ext)s");

  const args = [
    url,
    "-x", // Extraer audio
    "--audio-format",
    "mp3", // Formato MP3
    "--audio-quality",
    "5", // Máxima calidad VBR
    "--format",
    "bestaudio/best", // Mejor fuente de audio
    "--add-metadata", // Insertar etiquetas de artista/título
    "--no-embed-thumbnail", // Sin miniatura (como pediste)
    "--no-warnings", // Limpiar logs
    "-o",
    outputPath, // Ruta en la carpeta Musica
  ];

  execFile(binPath, args, (error, stdout, stderr) => {
    const idVideo = url.split("v=")[1] || url;
    if (error) {
      console.error(`Error en ${process.platform}:`, stderr);
      event.reply("status-descarga", { id: idVideo, status: "Error" });
    } else {
      event.reply("status-descarga", { id: idVideo, status: "Completado" });
    }
  });
});

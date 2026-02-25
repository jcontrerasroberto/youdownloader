function downloadListMp3() {
    const dirnameinput = document.getElementById("dirnameinput");
    
    // 1. Validación robusta: .trim() es vital para evitar carpetas con solo espacios
    const dirname = dirnameinput.value.trim();

    if (!dirname) {
        alert("⚠️ Error: Por favor, escribe un nombre para la carpeta antes de descargar.");
        dirnameinput.classList.add("is-invalid"); // Opcional: Resaltar en rojo si usas Bootstrap
        dirnameinput.focus();
        return; // Salida limpia: no bloquea el resto de scripts
    }

    if (songs.length === 0) {
        alert("No hay canciones en la lista para descargar.");
        return;
    }

    // 2. Si pasa la validación, procedemos
    dirnameinput.classList.remove("is-invalid");
    totalDescargados = 0;

    songs.forEach(url => {
        const idVideo = url.split('v=')[1];
        const statusEl = document.getElementById(`status-${idVideo}`);
        
        if (statusEl) {
            statusEl.innerText = "Descargando...";
            statusEl.className = "status-badge status-pending";
        }

        window.api.descargarMp3({ url, folderName: dirname });
    });
}

// Escuchar actualizaciones de estado
let totalDescargados = 0;

window.api.onStatusUpdate((data) => {
    const { id, status } = data;
    const statusEl = document.getElementById(`status-${id}`);
    
    if (statusEl) {
        statusEl.innerText = status;
        statusEl.className = status === 'Completado' ? 'status-badge status-success' : 'status-badge status-error';
        
        // Incrementar contador si terminó (con éxito o error)
        totalDescargados++;

        // Si ya procesamos todos los videos de la lista
        if (totalDescargados === songs.length) {
            setTimeout(() => {
                alert("Todas las descargas han finalizado.");
                limpiarListaCompleta();
            }, 1500); // Esperar un poco para que el usuario vea el "Completado"
        }
    }
});

function limpiarListaCompleta() {
    songs = []; // Vaciar array global
    totalDescargados = 0;
    document.getElementById("added-songs").innerHTML = ""; // Limpiar UI
}
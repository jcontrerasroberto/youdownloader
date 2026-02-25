// Arreglo global para almacenar las URLs de la lista
let songs = [];

/**
 * Añade un video a la lista visual y al arreglo global
 * @param {string} name - Título del video
 * @param {string} id - ID de YouTube (ej: dQw4w9WgXcQ)
 */
function addVideo(name, id) {
    const videoUrl = "https://www.youtube.com/watch?v=" + id;

    if (!songs.includes(videoUrl)) {
        songs.push(videoUrl);
        
        const node = document.createElement("li");
        node.id = id;
        node.className = "list-group-item shadow-sm";
        
        node.innerHTML = `
            <div class="video-info">
                <span class="video-title">${name}</span>
                <span id="status-${id}" class="status-badge status-pending">En espera</span>
            </div>
            <button class="btn btn-outline-danger btn-delete ml-3" onclick="deleteVideo('${id}')">✕</button>
        `;
        
        document.getElementById("added-songs").appendChild(node);
    }
}

/**
 * Elimina un video de la lista visual y del arreglo
 * @param {string} id - ID de YouTube
 */
function deleteVideo(id) {
    const videoUrl = "https://www.youtube.com/watch?v=" + id;
    const index = songs.indexOf(videoUrl);
    
    if (index > -1) {
        songs.splice(index, 1); // Quitar del arreglo
        const element = document.getElementById(id);
        if (element) element.remove(); // Quitar del HTML
        console.log("Canción eliminada de la lista.");
    }
}

/**
 * Abre el video en una ventana pequeña (opcional)
 */
function openVideoRemote(id) {
    const url = `https://www.youtube.com/watch?v=${id}`;
    window.open(url, '_blank', "height=450,width=600,menubar=no,status=no");
}
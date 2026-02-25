/**
 * Función que se activa cuando la API o la página están listas
 */
function handleAPILoaded() {
  $("#search-button").attr("disabled", false);
}

// En src/views/js/search.js
function search() {
    const q = $('#query').val(); 
    const apiKey = ""; 
    
    if (!q) return alert("Escribe algo para buscar");

    // Agregamos &videoCategoryId=10 a la URL de consulta
const categoryId = 10; 
const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&videoCategoryId=${categoryId}&q=${encodeURIComponent(q)}&key=${apiKey}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.error) throw new Error(data.error.message);
            
            const container = $('#songs-list');
            container.empty();

            data.items.forEach(item => {
                const title = item.snippet.title;
                const videoId = item.id.videoId;
                const thumbnail = item.snippet.thumbnails.default.url; // Recuperamos la miniatura
                const cleanTitle = title.replace(/'/g, ""); 

                const html = `
                    <div class="list-group-item d-flex align-items-center mb-2 shadow-sm" style="background: #ffffff; color: #000000; border: 1px solid #ddd;">
                        <img src="${thumbnail}" class="mr-3" style="width: 80px; height: 60px; object-fit: cover; border-radius: 4px; cursor: pointer;" onclick="openVideoRemote('${videoId}')">
                        
                        <div class="flex-grow-1">
                            <h6 class="mb-0 font-weight-bold text-dark" style="cursor: pointer;" onclick="openVideoRemote('${videoId}')">${title}</h6>
                            <small class="text-muted">ID: ${videoId}</small>
                        </div>
                        
                        <button class="btn btn-danger btn-sm ml-2" 
                                onclick="addVideo('${cleanTitle}', '${videoId}')">
                            AÑADIR
                        </button>
                    </div>`;
                container.append(html);
            });
        })
        .catch(err => {
            console.error("Error:", err);
            alert("Error en la búsqueda.");
        });
}
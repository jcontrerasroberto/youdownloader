let songs = [];
var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

function searchVideo(evt) {
    videoname = document.getElementById("search-bar").value;
    //alert(videoname);
    evt.preventDefault();

    var listelem = document.getElementById('songs-list');
    listelem.innerHTML = '';
    var key = "youtube-api-key";
    var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&fields=items(id(videoId),snippet(title))&type=video&key=" + key + "&q=" + videoname;
    console.log(url);
    getJSON(url,
        function (err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {
                console.log(data);
                for (var k in data.items) {
                    var tituloVideo = data.items[k]["snippet"].title;
                    var urlVideo = data.items[k]["id"].videoId;

                    var node = document.createElement("il");                 // Create a <li> node
                    node.className += "list-group-item list-group-item-action flex-column align-items-start mb-3 active";

                    var divnode = document.createElement("div");
                    divnode.className += "d-flex w-100 justify-content-between";

                    var titlenode = document.createElement('h6');
                    titlenode.setAttribute("onclick", 'openVideo("' + urlVideo + '")');
                    titlenode.setAttribute("style", 'cursor:pointer');
                    titlenode.className += 'cursor:pointer';
                    var titletextnode = document.createTextNode(tituloVideo);
                    titlenode.appendChild(titletextnode);


                    var buttonaddnode = document.createElement('button');
                    buttonaddnode.className += 'btn btn-danger btn-sm';
                    buttonaddnode.setAttribute("type", 'submit');
                    buttonaddnode.setAttribute("onclick", 'addVideo("' + tituloVideo + '","' + urlVideo + '")');
                    buttonaddnode.appendChild(document.createTextNode("Añadir"));

                    divnode.appendChild(titlenode);
                    divnode.appendChild(buttonaddnode);



                    node.appendChild(divnode);

                    listelem.appendChild(node);
                }
            }
        });



}

function openVideo(url) {
    window.open("https://www.youtube.com/watch?v=" + url, '_blank', "height=400,width=500,frame=true,show=true");
}
function addVideo(name, url) {
    if (!songs.includes("https://www.youtube.com/watch?v=" + url)) {
        console.log("Añadir cancion")
        songs.push("https://www.youtube.com/watch?v=" + url);
        var node = document.createElement("LI");                 // Create a <li> node
        var textnode = document.createTextNode(name);         // Create a text node
        var buttonnode = document.createElement("button");
        buttonnode.className += "btn btn-danger btn-sm ml-4";
        buttonnode.appendChild(document.createTextNode("X"));
        buttonnode.setAttribute("onclick", 'deleteVideo("' + url + '")');
        buttonnode.setAttribute("id", url);
        node.appendChild(textnode);                              // Append the text to <li>
        node.appendChild(buttonnode);
        node.setAttribute("id", url);
        node.className += "list-group-item";
        document.getElementById("added-songs").appendChild(node);
    }
    else alert("Cancion ya añadida");
    console.log(songs)

}
function deleteVideo(url) {
    if (songs.includes("https://www.youtube.com/watch?v=" + url)) {
        document.getElementById(url).remove();
        songs.splice(songs.indexOf("https://www.youtube.com/watch?v=" + url), 1);
    }
    console.log(songs)
}

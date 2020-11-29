function downloadListMp3() {
  const ytdl = require('youtube-dl');
  const os = require('os');
  const path = require('path');

  dirname = document.getElementById("dirnameinput").value;

  if (dirname === null || dirname === "") {
    alert("Ingresa un nombre de carpeta");
    return 1;
  }
  var homeDir;
  if (process.platform === "win32") homeDir = path.join(os.homedir(), "Desktop");
  else homeDir = os.homedir();

  alert(homeDir + "/" + dirname);


  songs.forEach(element => {
    var name;
    var idvideo;
    ytdl.getInfo(element, function (err, info) {
      'use strict'
      if (err) {
        throw err
      }
      name = info.title;
      idvideo = info.id;
      console.log('title:', name)
      document.getElementById(idvideo).innerText= "Descargando - "+name +"...";
    });
    //ytdl(element, {filter: 'audioonly'}).pipe(fs.createWriteStream('audioVideo.mp3'));
    ytdl.exec(element, ['-x', '--audio-format', 'mp3', '-o', homeDir + "/" + dirname + '/%(title)s.%(ext)s'], {}, function exec(
      err,
      output
    ) {
      'use strict'
      if (err) {
        document.getElementById(idvideo).innerText= "ERROR -" + name;
        throw err;
      } else {
        document.getElementById(idvideo).innerText= "Descargado -"+ name;
        console.log(output)
      }
      

    })
  });

}
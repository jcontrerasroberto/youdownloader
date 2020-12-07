# YouDownloader

**Electron App to download audio of videos using youtube-dl**

<img src="https://raw.githubusercontent.com/jcontrerasroberto/youdownloader/master/screenshots/main.png" title="" alt="" data-align="center">

You can search the video (it uses the youtube API) and add songs to the download queue

<img src="https://raw.githubusercontent.com/jcontrerasroberto/youdownloader/master/screenshots/examples.png" title="" alt="" data-align="center">

Preview the video to see if is the one you want

<img src="https://raw.githubusercontent.com/jcontrerasroberto/youdownloader/master/screenshots/preview.png" title="" alt="" data-align="left">

Download the audios in the folder you want

<img src="https://raw.githubusercontent.com/jcontrerasroberto/youdownloader/master/screenshots/ready.png" title="" alt="" data-align="center"> The audios will be in your files

<img src="https://raw.githubusercontent.com/jcontrerasroberto/youdownloader/master/screenshots/dir.png" title="" alt="" data-align="center">

### How to use it?

You need to have node and electron installed in your machine.

Also you need to have a key of the youtube API and change the variable called **key** in *src/views/js/behavor.js*

Clone this repo:

```bash
git clone https://github.com/jcontrerasroberto/youdownloader
```

Install the dependencies 

```bash
npm install
```

Run the app

```bash
npm start
```

Or

```bash
electron src/index.js
```

const playButton = document.querySelector('#play');
const skipPrevButton = document.querySelector('#skip-prev');
const skipNextButton = document.querySelector('#skip-next');
const volumeSlider = document.querySelector('#volume');
const audio = document.querySelector('#audio');
const songtitle = document.querySelector('#song-title');
const artist = document.querySelector('#artist');
const info = document.querySelector('#info');
const newestSongsList = document.querySelector('#newest-songs');
const archiveList = document.querySelector('#archive-songs');
const archive = document.querySelector('#archive');
const toggleArchiveButton = document.querySelector('#toggle-archive');
const container = document.querySelector('.container');

let issongplaying = false;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    console.log("Mobile device detected");
    container.style.height = "100vh";
}
else {
    console.log('Not a mobile device');
}

const trackList = [
    { title: "sang1", src: "sang.mp3" },
    { title: "sang2", src: "track2.mp3" },
    { title: "sang3", src: "track3.mp3" }
];

let currentTrackIndex = 0;

audio.src = trackList[currentTrackIndex].src;

let isPlaying = false;

playButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playButton.textContent = '▶';
    } else {
        audio.play();
        playButton.textContent = '❚❚';
    }
    isPlaying = !isPlaying;
});

skipPrevButton.addEventListener('click', () => {
    console.log('Skipped to previous track');
});

skipNextButton.addEventListener('click', () => {
    console.log('Skipped to next track');
});

volumeSlider.addEventListener('input', (event) => {
    audio.volume = event.target.value / 100;
});

let currentIndex = 0;
let songs = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('list.json')
        .then(response => response.json())
        .then(data => {
            songs = data;
            loadSong(currentIndex);
            displayNewestSongs(songs.slice(-5)); 
        });

    skipNextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % songs.length;
        loadSong(currentIndex);
        if (isPlaying){
            audio.play();
        }
        else if (audio.paused) {
            audio.pause();
        }
    });

    skipPrevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + songs.length) % songs.length;
        loadSong(currentIndex);
    });

    toggleArchiveButton.addEventListener('click', () => {
        if (archive.style.display === 'none') {
            archive.style.display = 'block';
            toggleArchiveButton.textContent = 'Hide Archive';
        } else {
            archive.style.display = 'none';
            toggleArchiveButton.textContent = 'Show Archive';
        }
    });
});

function loadSong(index) {
    const song = songs[index];
    audio.src = song.path;
    songtitle.textContent = song.title;
    artist.textContent = song.artist;
    info.textContent = song.info;
}

function displayNewestSongs(newestSongs) {
    newestSongsList.innerHTML = '';
    newestSongs.forEach(song => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        newestSongsList.appendChild(li);
    });
}

function displayArchive(allSongs) {
    archiveList.innerHTML = '';
    allSongs.forEach(song => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        archiveList.appendChild(li);
    });
}

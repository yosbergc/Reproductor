const playButton = document.getElementById('play');
const backButton = document.getElementById('back');
const nextButton = document.getElementById('next');
const progressBar = document.getElementById('song');
const currentTime = document.getElementsByClassName('currentTime');
const endTime = document.getElementsByClassName('endTime');
const songTitle = document.getElementsByClassName('songTitle');
const songAuthor = document.getElementsByClassName('songAuthor');
const songImage = document.getElementsByClassName('songImage');
const songs = [
    {   songName: "Lost in the City Lights",
        songAuthor: "Cosmo Sheldrake",
        songLink: "forest-lullaby-110624.mp3",
    }
,
    {
        songName: "Lost in the City Lights",
        songAuthor: "Cosmo Sheldrake",
        songLink: "lost-in-city-lights-145038.mp3",
    }
,
    {
        songName: "Fly Up High",
        songAuthor: "SCVE",
        songLink: "scve - song.mp3",
    }
]
let player = new Audio(songs[0].songLink);
let currentSong = 0;
playButton.addEventListener("click", reproducirCancion);
nextButton.addEventListener("click", siguienteCancion);
backButton.addEventListener("click", anteriorCancion)
function reproducirCancion() {
    if (player.paused) {
        player.play();
    } else {
        player.pause();
    }
}
function siguienteCancion() {
    if (currentSong < songs.length - 1) {
        player.pause();
        currentSong = currentSong + 1;
        player = new Audio(songs[currentSong].songLink);
        player.play();
    } else {
        currentSong = 0;
        player.pause();
        player = new Audio(songs[currentSong].songLink);
        player.play();
    }
}
function anteriorCancion() {
    if (currentSong > 0) {
        player.pause();
        currentSong = currentSong - 1;
        player = new Audio(songs[currentSong].songLink);
        player.play();
    } else {
        player.pause();
        player = new Audio(songs[songs.length - 1].songLink);
        player.play();
    }
}
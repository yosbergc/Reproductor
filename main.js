const playButton = document.getElementById('play');
const backButton = document.getElementById('back');
const nextButton = document.getElementById('next');
const progressBar = document.querySelector('#song');
const currentTime = document.querySelector('.currentTime');
const endTime = document.querySelector('.endTime');
const songTitle = document.querySelector(".songTitle");
const songAuthor = document.querySelector('.songAuthor');
const songImage = document.querySelector('.songImage');
const songs = [
    {   songName: "Lost in the City Lights",
        songAuthor: "Cosmo Sheldrake",
        songLink: "forest-lullaby-110624.mp3",
        songImage: "cover-1.png",
    }
,
    {
        songName: "Second Song",
        songAuthor: "Cosmo Sheldrake",
        songLink: "lost-in-city-lights-145038.mp3",
        songImage: "cover-2.png"
    }
]
let player = new Audio(songs[0].songLink);
let currentSong = 0;
let actualizarTiempo;
progressBar.addEventListener("input", cambiarTiempo);
playButton.addEventListener("click", reproducirCancion);
nextButton.addEventListener("click", siguienteCancion);
backButton.addEventListener("click", anteriorCancion);
player.addEventListener('ended', matarActualizar);

function cambiarTiempo(event) {
    player.pause();
    player.currentTime = event.target.value;
    player.play().then(() => {
        insertarDatosCancion();
        actualizarTiempoActual();
    })

}
function matarActualizar() {
    clearInterval(actualizarTiempo);
}
function fijarMaximoProgreso() {
    progressBar.setAttribute("max", parseInt(player.duration))
}
function actualizarTiempoActual() {
    actualizarTiempo = setInterval(() => {
        let tiempoTotal = parseInt(player.currentTime);
        let minutos = parseInt(tiempoTotal/60)
        let segundos = parseInt(((tiempoTotal / 60) - minutos) * 60)
        if (segundos < 10) {
            currentTime.innerHTML = minutos + ":" + "0" + segundos;
        } else {
            currentTime.innerHTML = minutos + ":" + segundos;
        }
        progressBar.value = parseInt(player.currentTime);
    }, 1000)
}
function tiempoCancion() {
    let tiempoTotal = parseInt(player.duration);
    let minutos = parseInt(tiempoTotal/60)
    let segundos = parseInt(((tiempoTotal / 60) - minutos) * 60)
    return minutos + ":" + segundos;
}
function insertarDatosCancion() {
    songTitle.innerHTML = songs[currentSong].songName;
    songAuthor.innerHTML = songs[currentSong].songAuthor;

    if (songs[currentSong].songImage) {
        songImage.setAttribute("src", songs[currentSong].songImage)
    } else {
        songImage.setAttribute("src", "empty.jpg")
    }
    endTime.innerHTML = tiempoCancion();
    fijarMaximoProgreso();
}
function reproducirCancion() {
    if (player.paused) {
        player.play().then(() => {
            insertarDatosCancion();
            actualizarTiempoActual();
        })
    } else {
        player.pause();
        matarActualizar();
    }
}
function siguienteCancion() {
    if (currentSong < songs.length - 1) {
        player.pause();
        currentSong = currentSong + 1;
        player = new Audio(songs[currentSong].songLink);
        player.play().then (() => {
            insertarDatosCancion();
            clearInterval(actualizarTiempo);
            actualizarTiempoActual();
        });
    } else {
        currentSong = 0;
        player.pause();
        player = new Audio(songs[currentSong].songLink);
        player.play().then (() => {
            insertarDatosCancion();
            clearInterval(actualizarTiempo);
            actualizarTiempoActual();

        })
    }
}
function anteriorCancion() {
    if (currentSong > 0) {
        player.pause();
        currentSong = currentSong - 1;
        player = new Audio(songs[currentSong].songLink);
        player.play().then (() => {
            insertarDatosCancion();
            clearInterval(actualizarTiempo);
            actualizarTiempoActual();
        })
    } else {
        player.pause();
        currentSong = songs.length - 1;
        player = new Audio(songs[songs.length - 1].songLink);
        player.play().then (() => {
            insertarDatosCancion();
            clearInterval(actualizarTiempo);
            actualizarTiempoActual();
        })
    }
    insertarDatosCancion();
}
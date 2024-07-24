console.log("Welcome To Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let bottomPlayButton = document.querySelector(".bottom .lufi1");
let myProgressBar = document.getElementById("myProgressBar");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songBtns = Array.from(document.getElementsByClassName("lufi1"));
let forwardButton = document.querySelector(".bottom .lufi2");
let backwardButton = document.querySelector(".bottom .lufi3");
let songInfo = document.querySelector('.songInfo');

// Define the songs
let songs = [
    { songName: "Gym Electronic Music", filePath: "songs/1.mp3", coverPath: "covers/1.jpeg" },
    { songName: "Shubh Baller", filePath: "songs/2.mp3", coverPath: "covers/2.jpeg" },
    { songName: "High Rated Gabru", filePath: "songs/3.mp3", coverPath: "covers/3.jpeg" },
    { songName: "Lehanga", filePath: "songs/4.mp3", coverPath: "covers/4.jpeg" },
    { songName: "Ishq", filePath: "songs/5.mp3", coverPath: "covers/5.jpeg" },
    { songName: "Thodi jagah de de mujhe", filePath: "songs/6.mp3", coverPath: "covers/6.png" },
    { songName: "Chhod diya wo rasta", filePath: "songs/7.mp3", coverPath: "covers/7.png" },
    { songName: "Kaise bataye kyu tujhko chahe", filePath: "songs/8.mp3", coverPath: "covers/8.png" },
    { songName: "Tere bin", filePath: "songs/9.mp3", coverPath: "covers/9.png" },
    { songName: "Pehli nazar me aisa jadu", filePath: "songs/10.mp3", coverPath: "covers/10.png" }
];

// Set up song items
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.querySelector(".songName").innerText = songs[i].songName;
});

// Update play buttons
function updatePlayButtons(currentIndex, isPlaying) {
    songBtns.forEach((btn, index) => {
        btn.src = index === currentIndex ? (isPlaying ? "pause-icon.svg" : "circle-play.svg") : "circle-play.svg";
    });
    bottomPlayButton.src = isPlaying ? "pause-icon.svg" : "circle-play.svg";
}

// Play song
function playSong(index) {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0; // Reset time to start of the song
    audioElement.play(); // Play the new song

    updatePlayButtons(songIndex, true); // Update all buttons to show pause icon
    songInfo.innerHTML = `<img src="playing.gif" width="42px" alt="playing" id="gif"> ${songs[songIndex].songName}`;
}

// Toggle play/pause
function togglePlayPause() {
    if (audioElement.paused) {
        audioElement.play();
        updatePlayButtons(songIndex, true); // Update all buttons to show pause icon
        songInfo.querySelector("#gif").style.opacity = 1; // Show the GIF
    } else {
        audioElement.pause();
        updatePlayButtons(songIndex, false); // Update all buttons to show play icon
        songInfo.querySelector("#gif").style.opacity = 0; // Hide the GIF
    }
}

// Handle play/pause button click
function handlePlayPause() {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong(songIndex); // Play or resume the song
    } else {
        togglePlayPause(); // Pause the song
    }
}

// Play next song
function nextSong() {
    songIndex = (songIndex + 1) % songs.length; // Move to the next song and loop to start if at the end
    playSong(songIndex);
}

// Play previous song
function previousSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // Move to the previous song and loop to end if at the start
    playSong(songIndex);
}

// Handle play/pause click for bottom play button
bottomPlayButton.addEventListener("click", handlePlayPause);

// Handle play/pause click for individual song items
songBtns.forEach((element, index) => {
    element.addEventListener("click", () => {
        if (songIndex === index) {
            togglePlayPause();
        } else {
            playSong(index);
        }
    });
});

// Handle forward and backward button clicks
forwardButton.addEventListener("click", nextSong);
backwardButton.addEventListener("click", previousSong);

// Listen to time update for progress bar
audioElement.addEventListener("timeupdate", () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
});

// Handle manual seekbar change
myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Update GIF visibility based on play/pause state
audioElement.addEventListener("play", () => {
    songInfo.querySelector("#gif").style.opacity = 1;
});
audioElement.addEventListener("pause", () => {
    songInfo.querySelector("#gif").style.opacity = 0;
});
audioElement.addEventListener("ended", () => {
    songInfo.querySelector("#gif").style.opacity = 0;
});

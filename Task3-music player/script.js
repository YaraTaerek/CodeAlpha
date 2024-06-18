const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const songListEl = document.getElementById('song-list');
const volumeIcon = document.getElementById('volume-icon');

const songs = [
    {
        title: 'My Power',
        artist: 'Billie Eilish ',
        src: 'song1.mp3'
    },
    {
        title: 'Nobody Is Listening',
        artist: 'Vibez ',
        src: 'song2.mp3'
    },
    {
        title: 'Unstoppable',
        artist: 'Sia',
        src: 'song3.mp3'
    },
    {
        title: 'Skin',
        artist: 'Sabrina Carpenter ',
        src: 'song4.mp3'
    },
    {
        title: 'Play Date',
        artist: 'Lilly Brooks ',
        src: 'song5.mp3'
    },
    {
        title: 'Lovely ',
        artist: 'Billie Eilish ',
        src: 'song6.mp3'
    },
    {
        title: 'Floating Through Space ',
        artist: 'Sia ',
        src: 'song7.mp3'
    },
    {
        title: 'Electric ',
        artist: 'Katy Perry ',
        src: 'song8.mp3'
    },
    {
        title: 'Baila Conmigo ',
        artist: 'Selena Gomez ',
        src: 'song9.mp3'
    },
    {
        title: 'Anyone ',
        artist: 'Justin Bieber ',
        src: 'song10.mp3'
    },
    {
        title: 'Cheap Thrills ',
        artist: 'Sia ',
        src: 'song11.mp3'
    }
];

let songIndex = 0; // Index to keep track of the current song
let isMuted = false; // Flag to keep track of mute state
let previousVolume = 1; // Store the previous volume to restore it when unmuting

// Function to load a song's details
function loadSong(song) {
    console.log('Loading song:', song);
    title.innerText = song.title; // Set the title
    artist.innerText = song.artist; // Set the artist
    audio.src = song.src; // Set the audio source
}

// Function to play the song
function playSong() {
    console.log('Playing song');
    audio.play(); // Play the audio
    playBtn.innerText = 'Pause'; // Change button text to Pause
}

// Function to pause the song
function pauseSong() {
    console.log('Pausing song');
    audio.pause(); // Pause the audio
    playBtn.innerText = 'Play'; // Change button text to Play
}

// Function to play the previous song
function prevSong() {
    console.log('Previous song');
    songIndex = (songIndex - 1 + songs.length) % songs.length; // Decrement the song index
    loadSong(songs[songIndex]); // Load the previous song
    playSong(); // Play the loaded song
}

// Function to play the next song
function nextSong() {
    console.log('Next song');
    songIndex = (songIndex + 1) % songs.length; // Increment the song index
    loadSong(songs[songIndex]); // Load the next song
    playSong(); // Play the loaded song
}

// Function to update the progress bar and current time
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`; // Update progress bar width

    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    currentTimeEl.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Update current time

    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);
    durationEl.innerText = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`; // Update duration
}

// Function to set the progress based on user click
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration; // Set current time based on click position
    console.log('Setting progress:', (clickX / width) * duration);
}

// Event listener for play/pause button
playBtn.addEventListener('click', () => {
    const isPlaying = audio.paused ? false : true;
    if (isPlaying) {
        pauseSong(); // Pause if already playing
    } else {
        playSong(); // Play if paused
    }
});

// Event listeners for previous and next buttons
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress); // Update progress bar as song plays
progressContainer.addEventListener('click', setProgress); // Set progress based on click

// Event listener for volume/mute button
volumeIcon.addEventListener('click', () => {
    if (isMuted) {
        audio.volume = previousVolume; // Restore previous volume
        volumeIcon.innerText = '🔊'; // Change icon to unmute
        isMuted = false; // Update flag
    } else {
        previousVolume = audio.volume; // Store current volume
        audio.volume = 0; // Mute the audio
        volumeIcon.innerText = '🔇'; // Change icon to mute
        isMuted = true; // Update flag
    }
    console.log('Volume icon clicked, isMuted:', isMuted);
});

// Function to create the song list
function createSongList() {
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerText = song.title;
        li.addEventListener('click', () => {
            songIndex = index; // Update song index
            loadSong(song); // Load selected song
            playSong(); // Play selected song
        });
        songListEl.appendChild(li); // Add song to list
        console.log('Added song to list:', song.title);
    });
}

// Initialize the song list and load the first song
createSongList();
loadSong(songs[songIndex]);

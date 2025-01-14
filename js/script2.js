const songUl = document.getElementById("songUl");
const previous1 = document.getElementById('previous1');
const next1 = document.getElementById('next1');
const progressbar1 = document.getElementById('progressbar1');
const audio1 = document.getElementById('audio-player1');
const currenttime1 = document.getElementById('current-time1');
const totalduration1 = document.getElementById('total-duration1');
const displayName1 = document.getElementById('displayName1');
const volumee1 = document.getElementById('volume1');
const playbutton1 = document.getElementById('play1');
const musicImgg = document.getElementById('musicImgg');
const right = document.getElementById('right');
let currentSongIndex1 = 0;


const songs1 = [];
console.log(songs1)

async function loadSongs1() {
    try {
        const response = await fetch('SongFile1.JSON');
        const data = await response.json();
        songs1.push(...data);
        loadPlaylist1();
    }
    catch (error) {
        console.error('Error loading songs:', error);
    }
}
loadSongs1();


function loadPlaylist1() {
    songUl.innerHTML = '';   
    songs1.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = ` ${song.title} - ${song.artist} `;
        li.style.cursor = 'pointer';
        li.addEventListener('click', () => {
            audio1.src = song.file;
            audio1.play()
            displayName1.textContent = `${song.title}`;
            musicImgg.src = song.img;
            currentSongIndex1 = index;
            // loadSong(song);
            // playSong();
        });
        songUl.appendChild(li);
    });
}

function playsong1() {
    audio1.play();
    playbutton1.src = "images/Pause.svg"
}
function pausesong1() {
    audio1.pause();
    playbutton1.src = "images/Play.svg"
}
function togglePlayPause1() {
    if (audio1.paused) {
        playsong1();
        // playbutton1.src = "pause.svg";

    } else {
        pausesong1();
        // playbutton1.src = "Play.svg";
    }
}
function loadSongs(song) {
    displayName1.textContent = song.title;
    audio1.src = song.file;
    musicImgg.src = song.img;
}
function nextSong1() {      
    currentSongIndex1++;
    if (currentSongIndex1 >= songs1.length) {
        currentSongIndex1 = 0; 
    }  
    loadSongs(songs1[currentSongIndex1]);
    playsong1();
}

function previousSong1() {
    currentSongIndex1--;
    if (currentSongIndex1 < 0) {
        currentSongIndex1 = songs1.length - 1;        
    }
    loadSongs(songs1[currentSongIndex1]);
    playsong1();
}
playbutton1.addEventListener("click", togglePlayPause1)
next1.addEventListener("click", nextSong1,  () =>{
    console.log("pressedx")
});
previous1.addEventListener("click", previousSong1);
audio1.addEventListener("ended" , () =>{
    setTimeout(() => {
        nextSong1()
    }, 2000);
}
)

function Duration1(timee) {
    const minute = Math.floor(timee / 60);
    const seconds = Math.floor(timee % 60);
    return `${minute}:${seconds < 10 ? '0' : ''}${seconds}`;

}
audio1.addEventListener("timeupdate", function () {
    progressbar1.max = Math.floor(audio1.duration);
    progressbar1.value = Math.floor(audio1.currentTime);
    currenttime1.textContent = Duration1(audio1.currentTime);
    totalduration1.textContent = Duration1(audio1.duration);
        const min = progressbar1.min
        const max = progressbar1.max
        const currentVal = progressbar1.value
        progressbar1.style.backgroundSize = ((currentVal - min) / (max - min)) * 100 + "% 100%"
        progressbar1.style.backgroundImage = "linear-gradient(to right ,  rgb(76, 109, 124),rgb(100, 206, 255))"

})

progressbar1.addEventListener('input', () => {
    audio1.currentTime = progressbar1.value
});

audio1.volume = 0.1;
volumee1.addEventListener("input", () => {
    audio1.volume = volumee1.value;
})



const draggablepage = document.getElementById("draggablepage");
const draggableContent = document.getElementById("draggableContent");
const draggableContenttxt  = document.getElementById("draggableContenttxt");
const upDown = document.getElementById("upDown");
const maincontent = document.getElementById("maincontent");

draggableContent.addEventListener("mousedown", dragging);
draggableContent.addEventListener("touchstart", dragging, { passive: false });

let isDragging = false;
let dragY;
let startingHeight;

function dragging(e) {
    isDragging = true;
    dragY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
    startingHeight = draggablepage.offsetHeight; // it stores the height of the container element 
    draggablepage.style.transition = "none";
    document.addEventListener("mousemove", onDrag); // mousemove = When the mouse moves (while the button is held down), 
    document.addEventListener("mouseup", stopDrag); // mouseup = When the mouse button is released
    document.addEventListener("touchmove", onDrag, { passive: false }); // TouchMOVE =  occurs when a touch point is moved along the touch surface.
    document.addEventListener("touchend", stopDrag); // TOUCHEND=which occurs when a touch point is removed from the touch surface
    e.preventDefault();
}

function onDrag(e) {
    if (!isDragging) return;
    const currentY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
    const dragDistance = dragY - currentY;
    const newHeight = Math.min(window.innerHeight, Math.max(100, startingHeight + dragDistance));
    draggablepage.style.height = `${newHeight}px`;
    if (newHeight >= window.innerHeight * 0.3) {
        draggablepage.style.height = "100%";
        stopDrag(); // Stop dragging once the height is set to 100%
        draggableContenttxt.style.display = "none"; // Hide the text when the height is set to 100%
        draggableContent.style.justifyContent = "flex-end";
        draggableContent.style.padding = "0 20px 0 0 ";
        upDown.src = "images/down.svg"
    }
    if(newHeight >= window.innerHeight * 0.2){
        maincontent.style.display = "flex"
    }
    e.preventDefault();
}

function stopDrag() {
    if (!isDragging) return;
    isDragging = false;
    draggablepage.style.transition = " height 0.3s ease"; // Reset the transition
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchmove", onDrag);
    document.removeEventListener("touchend", stopDrag);
}
upDown.addEventListener("click" , () =>{
    if (draggablepage.style.height === "100%") {
        draggablepage.style.height = "10%";
        draggableContenttxt.style.display = "block";
        draggableContent.style.justifyContent = "center";
        draggableContent.style.padding = "0";
        right.style.height = "105%";
        maincontent.style.display = "none"
        upDown.src = "images/up.svg"
    }
})
upDown.addEventListener("touchend" , () =>{
    if (draggablepage.style.height === "100%") {
        draggablepage.style.height = "10%";
        draggableContenttxt.style.display = "block";
        draggableContent.style.justifyContent = "center";
        draggableContent.style.padding = "0";
        right.style.height = "105%";
        maincontent.style.display = "none"
        upDown.src = "images/up.svg"
        
    }
    pausesong1();

})
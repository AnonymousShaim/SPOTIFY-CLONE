alert("Hey!  Only top first playlist is functional")
let plusHover = document.getElementById('plusHover'); //
let greenbutton = document.getElementById("greenButton1")
let playlist = document.getElementById("PlayList")
let l2A = document.getElementById("l2A")
let l2B = document.getElementById("l2B")
let pluslogoDIV = document.getElementById('pluslogoDIV');
let plusClick = document.getElementById('plusClick'); // 
let menuButton = document.getElementById('menubar');
let menuBar = document.getElementById("menuBar");
let cross = document.getElementById("cross");
let overlay = document.getElementById("overlay");
let overlayHide = document.getElementById("overlayHide");
let showAll = document.getElementById("showAll");
let showAll2 = document.getElementById("showAll2")
let showAll3 = document.getElementById("showAll3")
let showAll4 = document.getElementById("showAll4")
let showAll5 = document.getElementById("showAll5")
let table1 = document.getElementById("table1");
let table2 = document.getElementById("table2");
let table3 = document.getElementById("table3");
let table4 = document.getElementById("table4");
let table5 = document.getElementById("table5");
const playerBar = document.getElementById("playerBar");
const section = document.getElementById("section");
const footerwrapper = document.getElementById("footerwrapper");
let draggablepage = document.getElementById("draggablepage");
const plusImg = document.getElementById("plusImg");
const plusCross = document.getElementById("plusCross");

pluslogoDIV.addEventListener('mouseover', function () {
    plusHover.style.display = 'block';
})
pluslogoDIV.addEventListener('mouseout', function () {
    plusHover.style.display = 'none';
})
pluslogoDIV.addEventListener("click", function () {
    plusClick.style.display = 'flex';
    plusHover.style.display = 'none';
})

menuButton.addEventListener('click', function () {
    menuBar.style.visibility = "visible";
    menuBar.style.opacity = "1";
});
cross.addEventListener('click', function () {
    menuBar.style.opacity = "0";
    setTimeout(() => {
        menuBar.style.visibility = "hidden";
    }, 500);
});

greenbutton.addEventListener('click', function () {
    playlist.style.display = "block";
    playlist.style.opacity = "1";
    playerBar.style.display = "flex"
    playerBar.style.opacity = "1"
    plusClick.style.display = "none"
    footer.style.height = "80px"
    section.style.height = "calc(100vh - 140px)"
    footerwrapper.style.display = "none"
    draggablepage.style.height = "80px"
    l2B.style.display = "none";
    l2A.style.display = "none"
    pluslogoDIV.style.display = "none"
    plusCross.style.display = "flex"
  

})

plusCross.addEventListener('click', function () {
    playlist.style.display = "none";
    playlist.style.opacity = "0";
    playerBar.style.display = "none"
    playerBar.style.opacity = "0"
    footer.style.height = "80px"
    section.style.height = "calc(100vh - 120px)"
    footerwrapper.style.display = "flex"
    l2B.style.display = "flex";
    l2A.style.display = "flex"
    pluslogoDIV.style.display = "flex"
    plusCross.style.display = "none"
    audio.pause();
})
showAll.addEventListener('click', function () {
    overlay.style.visibility = "visible";
    overlay.style.opacity = "1";
    overlayHide.style.opacity = "1"
    table1.style.display = "flex"
});
showAll2.addEventListener('click', function () {
    overlay.style.visibility = "visible";
    overlay.style.opacity = "1";
    overlayHide.style.opacity = "1"
    table2.style.display = "flex"
});
showAll3.addEventListener('click', function () {
    overlay.style.visibility = "visible";
    overlay.style.opacity = "1";
    overlayHide.style.opacity = "1"
    table3.style.display = "flex"
});
showAll4.addEventListener('click', function () {
    overlay.style.visibility = "visible";
    overlay.style.opacity = "1";
    overlayHide.style.opacity = "1"
    table4.style.display = "flex"
});
showAll5.addEventListener('click', function () {
    overlay.style.visibility = "visible";
    overlay.style.opacity = "1";
    overlayHide.style.opacity = "1"
    table5.style.display = "flex"
});


overlayHide.addEventListener("click", function () {
    overlay.style.opacity = "0"
    table2.style.display = "none"
    table1.style.display = "none"
    table3.style.display = "none"
    table4.style.display = "none"
    table5.style.display = "none"

    setTimeout(() => {
        overlay.style.visibility = "hidden"
    }, 500);


})
// MUSIC PLAYER ------------------------------->

const songList = document.getElementById("songList");
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const progressbar = document.getElementById('progressbar');
const audio = document.getElementById('audio-player');
const currenttime = document.getElementById('current-time');
const totalduration = document.getElementById('total-duration');
const displayName = document.getElementById('displayName');
const volumee1 = document.getElementById('volume');
const volumee12 = document.getElementById('volume');
const playbutton = document.getElementById('playbutton');
let currentSongIndex = 0;


const songs = [];
console.log(songs)

async function loadSongs() {
    try {
        const response = await fetch('SongFile1.JSON');
        const data = await response.json();
        songs.push(...data);
        loadPlaylist();
    }
    catch (error) {
        console.error('Error loading songs:', error);
    }
}
loadSongs();


function loadPlaylist() {
    songList.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = ` ${song.title} - ${song.artist} `;
        li.style.cursor = 'pointer';
        li.addEventListener('click', () => {
            audio.src = song.file;
            audio.play()
            displayName.textContent = ` Now Playing  : ${song.title}`;
            currentSongIndex = index;
        });
        songList.appendChild(li);
    });
}

function playsong() {
    audio.play();
    playbutton.src = "images/Pause.svg"
}
function pausesong() {
    audio.pause();
    playbutton.src = "images/Play.svg"
}
function togglePlayPause() {
    if (audio.paused) {
        playsong();
        

    } else {
        pausesong();
        
    }
}

function loadSong(song) {
    displayName.textContent = song.title;
    audio.src = song.file;
}
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0; 
    }  
    loadSong(songs[currentSongIndex]);
    playsong();
}

function previousSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;        
    }
    loadSong(songs[currentSongIndex]);
    playsong();
}

previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
audio.addEventListener('ended', () =>{
    setTimeout(() => {
        setTimeout( () => {
            nextSong();
        }) 
    }, 2000);
});
playbutton.addEventListener("click", togglePlayPause)
function Duration(timee) {
    const minute = Math.floor(timee / 60);
    const seconds = Math.floor(timee % 60);
    return `${minute}:${seconds < 10 ? '0' : ''}${seconds}`;

}
audio.addEventListener("timeupdate", function () {
    progressbar.max = Math.floor(audio.duration);
    progressbar.value = Math.floor(audio.currentTime);
    currenttime.textContent = Duration(audio.currentTime);
    totalduration.textContent = Duration(audio.duration);
    const min = progressbar.min
    const max = progressbar.max
    const currentVal = progressbar.value
    progressbar.style.backgroundSize = ((currentVal - min) / (max - min)) * 100 + "% 100%"
    progressbar.style.backgroundImage = "linear-gradient(to right ,  rgb(76, 109, 124),rgb(100, 206, 255))"
})

progressbar.addEventListener('input', () => {
    audio.currentTime = progressbar.value
});

audio.volume = 0.1;
volumee12.addEventListener("input", () => {
    audio.volume = volumee12.value;
    updateVolumeIcon();
})

function updateVolumeIcon() {
    if (audio.volume === 0.0) {
        volImg.src = "images/mute.svg";
    }
    else if (audio.volume > 0.0 && audio.volume <= 0.33) {
        volImg.src = "images/vol1.svg";
    }
    else {
        volImg.src = "images/vol3.svg";
    }
}

updateVolumeIcon();

volImg.addEventListener("click", () => {
    if (audio.volume === 0.0) {
        audio.volume = 0.1;
        volImg.src = "images/vol1.svg";
        volumee.value = 0.1;
    }
    else {
        audio.volume = 0.0;
        volImg.src = "images/mute.svg";
        volumee.value = 0.0;
    }
    updateVolumeIcon();

})


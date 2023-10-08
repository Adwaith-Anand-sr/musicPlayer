var is_paused= true;
var songIndex=0;
const progressBar = document.querySelector('.progress');
const song = document.querySelector('.song');
const start = document.querySelector('.start');
const duration = document.querySelector('.end');
const playPause = document.querySelector('.pausePlay-btn');
const songName = document.querySelector('.songName');
const songImage = document.querySelector('.songIMG');
const playPauseIcon=document.querySelector('#playPause-icon');
const forward = document.querySelector('.next-btn');
const backward= document.querySelector('.back-btn');
song.src=songs[songIndex].path;

function songname(){
  songName.textContent=songs[songIndex].name;
}
function songImg(){
  songImage.style.backgroundImage=`url("violin.jpeg")`;
}
function timeDuration(){
  setTimeout(function(){
    var time= song.duration;
    var min= Math.floor(time/60);
    var sec= Math.floor(time%60);
    if(min<10){
      if(sec<10){
        duration.textContent= '0'+min +':'+ '0'+sec;
      }
      else{
        duration.textContent= '0'+min +':'+ sec;
      }
    }else{
      if(sec<10){
        duration.textContent= min +':'+ '0'+sec;
      }
      else{
        duration.textContent= min +':'+ sec;
      }
    }
    progressBar.max=song.duration;
  },500)
  // to fix NaN problem in timeDuration
  var currentTimeIntervel= setInterval(function(){
    if(duration.textContent== 'NaN:NaN'){
      timeDuration();
    }else{
      clearInterval(currentTimeIntervel);
      console.log('intervel cleared');
    }
  },500);
  
}
function currentTime(){
  setInterval (function(){
    var time= song.currentTime;
    var min= Math.floor(time/60);
    var sec= Math.floor(time%60);
    if(min<10){
      if(sec<10){
        start.textContent= '0'+min +':'+ '0'+sec;
      }
      else{
        start.textContent= '0'+min +':'+ sec;
      }
    }
    else{
      if(sec<10){
        start.textContent= min +':'+ '0'+sec;
      }
      else{
        start.textContent= min +':'+ sec;
      }
    }
    playNext()
  },100);
}

playPause.addEventListener('click', function(){
  if(is_paused==true){
    is_paused=false;
    setTimeout(function() {
      song.play();
    }, 700);
    playPauseIcon.classList.add("fa-pause");
    playPauseIcon.classList.remove("fa-play");
    playPause.style.animationPlayState='running';
  }else{
    is_paused=true;
    song.pause();
    playPauseIcon.classList.remove("fa-pause");
    playPauseIcon.classList.add("fa-play");
    playPause.style.animationPlayState='paused';
  }
})
forward.addEventListener('click', function(){
  if (songIndex==songs.length-1) {
    songIndex=0;
  }else{
    songIndex++;
  }
  song.src=songs[songIndex].path;
  songname()
  timeDuration()
    setTimeout(function() {
      song.play();
    }, 800);
    playPauseIcon.classList.add("fa-pause");
    playPauseIcon.classList.remove("fa-play");
    playPause.style.animationPlayState='running';
})
backward.addEventListener('click', function(){
  if (songIndex==0) {
    songIndex=songs.length -1;
  }else{
    songIndex--;
  }
  song.src=songs[songIndex].path;
  songname()
  timeDuration()
    setTimeout(function() {
      song.play();
    }, 800);
    playPauseIcon.classList.add("fa-pause");
    playPauseIcon.classList.remove("fa-play");
    playPause.style.animationPlayState='running';
  })
setInterval(function() {
  setTimeout(function() {
    progressBar.value = song.currentTime;
  }, 1200);
},500);
progressBar.addEventListener('change', function(){
  song.currentTime=progressBar.value;
})
currentTime()
timeDuration()
songname()
songImg()

function playNext() {
  if (song.currentTime==song.duration) {
    if (songIndex==songs.length-1) {
     songIndex=0;
    }else{
      songIndex++;
    }
    song.src=songs[songIndex].path;
    songname()
    timeDuration()
    setTimeout(function() {
      song.play()
    }, 800);
    
  }
}

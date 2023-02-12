let playlist = document.querySelector(`.playlist`);
let container = document.querySelector(`.album`);
let search = new URLSearchParams(window.location.search);

let i = search.get(`i`);
let album = albums[i];

container.innerHTML = `

    <div class="card mb-3">
        <div class="row cart">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <img src="${album.img}" alt="" class="img-fluid">
            </div>
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                <div class="card-body">
                    <h5 class="card-title">${album.title}</h5>
                    <p class="card-text">${album.description}</p>
                    <p class="card-text">
                        <smal class="text-muted">Альбом выпущен в ${album.year} году</smal>
                    </p>
                </div>
            </div>
        </div>
    </div>


`;

let tracks = album.tracks;

for (let i = 0; i < tracks.length; i++) {
  let track = tracks[i];
  playlist.innerHTML += `
    <li class="list-group-item d-flex align-items-center track">
        <img src="assets/290128_audio_media_music_play_player_icon.png" alt="" height="30px" class="me-3 img-pause">
        <img src="assets/music_play.png" alt="" height="30px" class="me-3 d-none img-play">
        <div>
            <div>${track.title}</div>
            <div><smal class="text-muted">${track.author}</smal></div>
        </div>
        <div class="ms-auto time">${track.time}</div>
        <audio class="audio" src="${track.src}"></audio>
    </li>
    `;
}

function setupAudio() {
  // Найди коллекцию с треками
  let trackNodes = document.querySelectorAll(`.track`);
  let tracks = album.tracks;
  for (let i = 0; i < trackNodes.length; i++) {
    // Один элемент
    let node = trackNodes[i];
    let timeNode = node.querySelector(`.time`);
    // Тег аудио внутри этого элемента
    let audio = node.querySelector(`.audio`);

    // продолжи самостоятельно
    let track = tracks[i];
    let imgPause = node.querySelector(`.img-pause`);
    let imgPlay = node.querySelector(`.img-play`);
    node.addEventListener(`click`, function () {
      // Если трек сейчас играет...
      if (track.isPlaying) {
        track.isPlaying = false;
        // Поставить на паузу
        audio.pause();
        imgPause.classList.remove(`d-none`);
        imgPlay.classList.add(`d-none`);

        // Если трек сейчас не играет...
      } else {
        track.isPlaying = true;
        // Включить проигрывание
        audio.play();
        imgPause.classList.add(`d-none`);
        imgPlay.classList.remove(`d-none`);
        updateProgress()
      }
    });
    function updateProgress() {
      // Нарисовать актуальное время
      let time = getTime(audio.currentTime)
      if(time != timeNode.innerHTML){
        timeNode.innerHTML = getTime(audio.currentTime);
      }
      

      // Нужно ли вызвать её ещё раз?
      if (track.isPlaying) {
        requestAnimationFrame(updateProgress);
      }
    }
    
  }
}
setupAudio();
function getTime(time){
  let currentSeconds = Math.floor(time);
  let minutes = Math.floor(currentSeconds / 60);
  let seconds = Math.floor(currentSeconds % 60);
  if(minutes < 10){
    minutes = `0` + minutes;
  }
  if(seconds < 10){
    seconds = `0` + seconds;
  }
  return `${minutes}:${seconds}`
}

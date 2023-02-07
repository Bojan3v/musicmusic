let playlist = document.querySelector(`.playlist`);
let container = document.querySelector(`.album`);
let search = new URLSearchParams(window.location.search);

let i = search.get(`i`);
let album = albums[i];

if (!album) {
  container.innerHTML = `Ошибка`;
  setTimeout(() => {
    window.location.pathname = `index.html`;
  }, 5000);
} else {
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
    <li class="list-group-item d-flex align-items-center">
        <img src="assets/290128_audio_media_music_play_player_icon.png" alt="" height="30px"
            class="me-3">
        <div>
            <div>${track.title}</div>
            <div><smal class="text-muted">${track.author}</smal></div>
        </div>
        <div class="ms-auto">${track.time}</div>
    </li>
    `;
  }
}

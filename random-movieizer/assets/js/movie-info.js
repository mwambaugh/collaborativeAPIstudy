var watchInfoEl = document.querySelector("#movie-info-container");
var movieTitleEl = document.querySelector("#movie-title");

function getmovieId() {
  // This is coming from the URL search bar in the browser. It is what comes after the `?`.

  const params = new URLSearchParams(document.location.search);
  const movieId = params.get("movieId");
  const movieTitle = params.get("movietitle");
  console.log("movie id = ", movieId);
  console.log("movie title = " + movieTitle);
  movieTitleEl.innerHTML = movieTitle;

  if (movieId) {
    getmovieWatchInfo(movieId);
  } else {
    // This will run and return to the homepage if there was nothing in the URL query parameter.
    document.location.replace("./index.html");
  }
}

function getmovieWatchInfo(id) {
  var apiUrl =
    "https://api.watchmode.com/v1/title/" +
    id +
    "/sources/?apiKey=ZqhSD2vFtLVlH11SqKHryG520s5TtBvCjaf4sNLR";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          renderMovieWatchInfo(data);
        });
      } else {
        alert("error id");
      }
    })
    .catch(function (error) {
      alert("unable to connect to watchmode api");
    });
}

//Create and render the elements
function renderMovieWatchInfo(watchInfo) {
  // create and render the elements
  for (var i = 0; i < watchInfo.length; i++) {
    // Create a sub div container to display movie info
    var divEl = document.createElement("div");
    divEl.className = "watch-movie-info";

    // Create name element for the sub div
    var nameEl = document.createElement("p");
    nameEl.innerHTML = watchInfo[i].name;
    divEl.appendChild(nameEl);

    // Create the  element to hold web_url
    var webUrlEl = document.createElement("a");
    webUrlEl.setAttribute("href", watchInfo[i].web_url);
    webUrlEl.innerHTML = watchInfo[i].web_url;
    divEl.appendChild(webUrlEl);

    // Create the element to hold the format
    var formatEl = document.createElement("p");
    formatEl.innerHTML = "Format: " + watchInfo[i].format;
    divEl.appendChild(formatEl);

    //
    watchInfoEl.appendChild(divEl);

    var justTitle = document.createElement("h1");
    justTitle.innerHTML = watchInfo[i].title;
  }
}

getmovieId();
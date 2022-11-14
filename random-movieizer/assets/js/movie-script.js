var generateBtnEl = document.querySelector("#generateBtn");
var imageEl = document.querySelector("#movie-image");
var movieMoreInfo = document.querySelector(".movie-info");
var titleEl = document.querySelector("#movie-title");
var plotEl = document.querySelector("#movie-plot");
var infoEl = document.querySelector("#more-info");
generateBtnEl.addEventListener("click", randomMovie);
var movieApi = "k_1o5t5erq";

var randomizedMoviesEl = document.querySelector("#randomized-movies");
var movieInfoEl = document.querySelector(".movie-info");
var deleteHistoryEl = document.querySelector("#delete-history");
var randomizedMovies = [];

function init() {
  //current date
  var currentDate = moment().format("YYYYMMDD");
  // get date from local storage
  var storedDate = localStorage.getItem("date");
  if (storedDate !== null) {
    // compare it with current date
    if (storedDate !== currentDate) {
      //delete previous randomized movies from storage and set date to current date
      localStorage.setItem("date", currentDate);
      localStorage.removeItem("randomizedMovies");
    } else {
      var storeditems = JSON.parse(localStorage.getItem("randomizedMovies"));
      if (storeditems !== null) {
        randomizedMovies = JSON.parse(localStorage.getItem("randomizedMovies"));
      }
      //randomizedMovies = JSON.parse(localStorage.getItem("randomizedMovies"));
    }
  } else {
    localStorage.setItem("date", currentDate);
  }

  // display history of randomized movies if any
  if (randomizedMovies !== null) {
    if (randomizedMovies.length > 0) {
      displayHistory();
    }
  }
}

function randomizedButtonClickHandler(event) {
  var element = event.target;

  // Check if element is a button
  if (element.matches("button") === true) {
    var movieId = element.getAttribute("data-movieId");
    getMovie(movieId);
    //to clear .movie-info before showing the stored movie
    document.querySelector("#movie-image").innerHTML = "";
    document.querySelector("#movie-title").innerHTML = "";
    document.querySelector("#movie-plot").innerHTML = "";
    document.querySelector("#more-info").innerHTML = "";
  }
}

function clearHistoryButtonClickHandler(event) {
  var element = event.target;
  // Check if element is a button
  if (element.matches("button") === true) {
    localStorage.removeItem("randomizedMovies");
    randomizedMoviesEl.innerHTML = "";
    deleteHistoryEl.innerHTML = "";

    var arrLength = randomizedMovies.length;
    randomizedMovies.splice(0, arrLength);
  }
}

function randomMovie() {
  var movieUrl = "https://imdb-api.com/en/API/Top250Movies/" + movieApi;
  fetch(movieUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          document.querySelector("#movie-image").innerHTML = "";
          document.querySelector("#movie-title").innerHTML = "";
          document.querySelector("#movie-plot").innerHTML = "";
          document.querySelector("#more-info").innerHTML = "";
          var randomIndex = Math.floor(Math.random() * data.items.length);
          console.log(data.items[randomIndex].id);
          var movieId = data.items[randomIndex].id;

          getMovie(movieId);
        });
      } else {
        alert("error");
      }
    })
    .catch(function (error) {
      alert("unable to connect to the movieAPI");
    });
}

function getMovie(movieId) {
  var movieUrl =
    "https://imdb-api.com/en/API/Title/" +
    movieApi +
    "/" +
    movieId +
    "/FullActor,Posters";
  fetch(movieUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          renderMovieInfo(data);
          storeRandomizedMovies(data);
        });
      } else {
        alert("error id");
      }
    })
    .catch(function (error) {
      alert("unable to connect to the movieAPI");
    });
}

function renderMovieInfo(movieInfo) {
  //to show image
  var img = document.createElement("img");
  img.src = movieInfo.image;
  imageEl.appendChild(img);

  //to show Movie Title
  var title = document.createElement("h2");
  title.innerHTML = "<strong>" + movieInfo.fullTitle + "</strong>";
  titleEl.appendChild(title);

  //to show summary plot
  var summary = document.createElement("p");
  summary.innerHTML = "Summary: " + movieInfo.plot;
  plotEl.appendChild(summary);

  //to show directors of the movie
  var directors = document.createElement("p");
  directors.innerHTML = "Directors: " + movieInfo.directors;
  infoEl.appendChild(directors);

  //to show directors of the movie
  var awards = document.createElement("p");
  awards.innerHTML = "Awards: " + movieInfo.awards;
  infoEl.appendChild(awards);

  //to show directors of the movie
  var runTime = document.createElement("p");
  runTime.innerHTML = "Run Time: " + movieInfo.runtimeStr;
  infoEl.appendChild(runTime);

  // Create the link element to link to movie-info html page
  var movieLink = document.createElement("a");
  movieLink.setAttribute(
    "href",
    "./movie-info.html?movieId=" +
      movieInfo.id +
      "&movietitle=" +
      movieInfo.fullTitle
  );
  movieLink.innerHTML = "Click here for Streaming Info";
  infoEl.appendChild(movieLink);
  movieMoreInfo.style.display = "block";
}

function storeRandomizedMovies(movieData) {
  //console.log("storeRandomizedMovies routine");

  var movieInfo = {
    movieId: "",
    movieTitle: "",
  };

  var storedmovieflag = false;

  if (movieData.id) {
    //check to see if movie already stored
    if (randomizedMovies !== null) {
      for (var i = 0; i < randomizedMovies.length; i++) {
        if (randomizedMovies[i].movieId === movieData.id) {
          storedmovieflag = true;
        }
      }
    }

    if (storedmovieflag === false) {
      movieInfo.movieId = movieData.id;
      movieInfo.movieTitle = movieData.fullTitle;
      randomizedMovies.push(movieInfo);
    }

    localStorage.setItem("randomizedMovies", JSON.stringify(randomizedMovies));
    displayHistory();
  }
}

function displayHistory() {
  randomizedMoviesEl.innerHTML = "";
  deleteHistoryEl.innerHTML = "";
  var historyTitle = document.createElement("p");
  historyTitle.className = "history-header";
  historyTitle.innerHTML = "Randomized Movie History";
  randomizedMoviesEl.appendChild(historyTitle);

  // Create button elements
  for (var i = 0; i < randomizedMovies.length; i++) {
    var btnEl = document.createElement("button");
    btnEl.classList.add("history-btn");
    btnEl.innerHTML = randomizedMovies[i].movieTitle;
    btnEl.setAttribute("data-movieId", randomizedMovies[i].movieId);
    btnEl.setAttribute("type", "button");
    randomizedMoviesEl.appendChild(btnEl);
  }

  var hrEl = document.createElement("hr");
  deleteHistoryEl.appendChild(hrEl);

  var clearbtnEl = document.createElement("button");
  clearbtnEl.classList.add("clear-btn");
  clearbtnEl.innerHTML = "Clear History";
  clearbtnEl.setAttribute("type", "button");
  deleteHistoryEl.appendChild(clearbtnEl);
}

deleteHistoryEl.addEventListener("click", clearHistoryButtonClickHandler);

randomizedMoviesEl.addEventListener("click", randomizedButtonClickHandler);

init();
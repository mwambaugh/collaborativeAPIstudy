// 1. setting var
// 2. stating var
//Hooks
var api_key = "api_key=krIy1i5fL7pkviggfyuAli8fyRvpj4yejHKSRxSK"
var searchField = document.querySelector("#searchActivitiesField");
var stateField = document.querySelector("#stateField");
var dataListEl = document.querySelector("#activitiesList");
var dataListEl1 = document.querySelector("#statesList");
var findBtn = document.querySelector("#findBtn");

var displayCardEl = document.getElementsByClassName("section-1")
var parkNameDisplay = document.getElementById("park")
var parkImageDisplay = document.getElementById("parkImage")
var parkDescription = document.getElementsByClassName("desription")

var parkNameDisplay = document.getElementById("park")
var parkImageDisplay = document.getElementById("parkImage")
var parkDescription = document.getElementsByClassName("desription")

//var arrays
var dataArr = [];
var parksArr = [];

//base string variables for nps API
var npsBaseAPIUrl = "https://developer.nps.gov/api/v1"
var npsAPI_data = ["/activities?","/activities/parks?","/topics?","/parks?","/places?"]
var npsAPIkey = "api_key=jFUiLTrcoquzkLV62lQbZqbdBOHbJVMRKkHy3F2Y";

//base string variables for OMDB API
var omdbBaseAPIUrl = "https://www.omdbapi.com/?t=";
var omdbAPIkey = "apikey=49e6bea4";

//base string variables for Open library API
var openlibraryBaseAPIUrl = "https://openlibrary.org/search.json?q=";

//options for states API
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3485d2416dmshf3851a0ece18262p1388bcjsnc27df98ffa00',
		'X-RapidAPI-Host': 'us-states.p.rapidapi.com'
	}
};


// basic function to retrieve NP data
async function getNPSdata(requestUrl) {
    const responce = await fetch(requestUrl);
    return await responce.json()
    .then(function (data) {
        for (let index = 0; index < data.data.length; index++) {
            dataArr.push(data.data[index]);
        }    
        });
}

// get list of activities list
async function getActivitiesList(limit){
    await getNPSdata(npsBaseAPIUrl+npsAPI_data[0]+"&limit="+limit+"&"+npsAPIkey);
            dataArr.forEach(element => {
                var optionEl = document.createElement("option");
                optionEl.setAttribute("value", element.name);
                dataListEl.append(optionEl);
            });
            
};

//get activity ID by name
async function getActivityIdByName(name) {
    dataArr = [];
    await getNPSdata(npsBaseAPIUrl+npsAPI_data[0]+"&"+npsAPIkey);
    if (dataArr.some(obj => obj.name === name)) {
        return dataArr.find(obj => obj.name === name).id;
    }
}

//get list of parks by activity ID
async function getParksListByActivityId(activityId, limit) {
    dataArr = [];
    await getNPSdata(npsBaseAPIUrl+npsAPI_data[1]+"&limit="+limit+"&"+activityId+"&"+npsAPIkey);
}

//get all states (US States API)
// async function getAllStates() {
//     const response = await fetch('https://us-states.p.rapidapi.com/basic', options);
//     return await response.json()
//     .then(function (data) {
//         data.forEach(element => {
//             var option = document.createElement("option");
//             option.setAttribute("value", element.postal);
//             dataListEl1.appendChild(option);
//         });
//     });
// }

// get movie (OMDB API)
async function getMovieInfo(requestUrl) {
    const responce = await fetch(requestUrl);
    return await responce.json()
    .then(function (data) {
       console.log(data);
        });
}

//get books
async function getBooks(requestUrl) {
    const responce = await fetch(requestUrl);
    return await responce.json()
    .then(function (data) {
       console.log(data);
        });
}

//get places (NPA API)
async function getPlaces(requestUrl) {
    const responce = await fetch(requestUrl);
    return await responce.json()
    .then(function (data) {
       console.log(data); 
       var card = document.querySelectorAll(".card-image img");
       console.log(card[0]);
       card[0].setAttribute("src", data.data[0].images[0].url);
            });
}


getActivitiesList(40);
// getAllStates();

//find button handler
findBtn.addEventListener("click", async function (ev) {
    var activityId = "id="+ await getActivityIdByName(searchField.value);
    await getParksListByActivityId(activityId,1);
    var parksByState = dataArr[0].parks.filter(function(state) {
        return state.states == stateField.value;
    });
    
    // //get movie info by park name (designation)
    // parksByState.forEach(async element => {
    //     await getMovieInfo(omdbBaseAPIUrl+element.designation+"&"+omdbAPIkey);
    //     console.log(element);
    // });

    // //get books by by park name (fullName)
    // parksByState.forEach(async element => {
    //     await getBooks(openlibraryBaseAPIUrl+element.fullName.replace(" ","+"));
    //     console.log(element);
    // });

    //getPlaces
    //parksByState.forEach(async element => {
        
        await getPlaces(npsBaseAPIUrl+npsAPI_data[3]+"&parkCode="+parksByState[0].parkCode+"&limit=1"+"&stateCode="+ stateField.value+"&"+npsAPIkey);
    //});



});

//1. api pull config on console to find data is being pulled
//2. what event we are pulling from the api
//3. 


function getAPI() {
    userChoice = "WA"
    var NPAPI = "https://developer.nps.gov/api/v1/parks?&statecode="+userChoice+"&api_key=krIy1i5fL7pkviggfyuAli8fyRvpj4yejHKSRxSK"

    fetch(NPAPI)
        .then(function (response) {

        return response.json();
        })

    .then(function (data) {
        console.log(data);
    })

      
}

function getweatherdata() {
    var lat = 47.8021//data.latitute
    var lon = 123.6044//date.longitute
    queryURL = "http://api.openweathermap.org/data/2.5/air_pollution?lat="+lat+"&"+"lon="+lon+"&appid=5106b1dd029f01436cf1eff2fabc4fcf"

    fetch(queryURL)
        .then(function (response){
            if(!response.ok) {
                console.log("error","tessssttttttttt NOT WORKING!!!")
            } else {
                return response.json();
            }
        })
        .then(function(data){
            console.log(data, "teeeeessssssssssttt IT WORKS!!!!!")
            displayData(data)

        })   
      
}

function displayData(data){
displayCardEl.innerHTML = "";


}

getAPI();
getweatherdata();
// displayData()

renderCard(data) {
var parkInfo = data;
var parkName = document.createElement("h2");
var parkPic = document.createElement("img");
var parkDescription = document.createElement("p");


}

displayCardEl.append(parkName);
displayCardEl.append(parkPic);
displayCardEl.append(parkDescription);
}

getAPI();
getweatherdata();
// displayData()


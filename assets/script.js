// 1. setting var
// 2. stating var
//Hooks
var searchField = document.querySelector("#searchActivitiesField");
var stateField = document.querySelector("#stateField");
var dataListEl = document.querySelector("#activitiesList");
var dataListEl1 = document.querySelector("#statesList");
var findBtn = document.querySelector("#findBtn");

//var arrays
var dataArr = [];
var parksArr = [];

//base string variables for nps API
var npsBaseAPIUrl = "https://developer.nps.gov/api/v1"
var npsAPI_data = ["/activities?","/activities/parks?","/topics?"]
var npsAPIkey = "api_key=jFUiLTrcoquzkLV62lQbZqbdBOHbJVMRKkHy3F2Y";

//base string variables for OMDB API
var omdbBaseAPIUrl = "https://www.omdbapi.com/?t=";
var omdbAPIkey = "apikey=49e6bea4";

//options for states API
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3485d2416dmshf3851a0ece18262p1388bcjsnc27df98ffa00',
		'X-RapidAPI-Host': 'us-states.p.rapidapi.com'
	}
};

//get all states
async function getAllStates() {
    const response = await fetch('https://us-states.p.rapidapi.com/basic', options);
    return await response.json()
    .then(function (data) {
        data.forEach(element => {
            var option = document.createElement("option");
            option.setAttribute("value", element.postal);
            dataListEl1.appendChild(option);
        });
    });
}

// get movie
async function getMovieInfo(requestUrl) {
    const responce = await fetch(requestUrl);
    return await responce.json()
    .then(function (data) {
       console.log(data);
        });
}

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

getActivitiesList(40);
getAllStates();

//find button handler
findBtn.addEventListener("click", async function (ev) {
    var activityId = "id="+ await getActivityIdByName(searchField.value);
    await getParksListByActivityId(activityId,1);
    var parksByState = dataArr[0].parks.filter(function(state) {
        return state.states == stateField.value;
    });
    parksByState.forEach(async element => {
        await getMovieInfo(omdbBaseAPIUrl+element.designation+"&"+omdbAPIkey);
        console.log(element);
    });

});

//1. api pull config on console to find data is being pulled
//2. what event we are pulling from the api
//3. 


function getApi() {
    var NPAPI = "https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=krIy1i5fL7pkviggfyuAli8fyRvpj4yejHKSRxSK"

    fetch(NPAPI)
        .then(function (response) {

        return response.json();
        })

    .then(function (data) {
        console.log(data);
    })
        
      
}

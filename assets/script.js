// 1. setting var
// 2. stating var
// 3. add specific arrays for id on selectors of activites
// 4. call arrays by id for activities instead of a list
//Hooks
var searchField = document.querySelector("#searchActivitiesField");
var stateField = document.querySelector("#stateField");
var dataListEl = document.querySelector("#activitiesList");
var dataListEl1 = document.querySelector("#statesList");
var findBtn = document.querySelector("#findBtn");

//var arrays
var dataArr = [];
var parksArr = [];
// var activitesArr = ["fishing", "hiking", "snowshoeing", "tubing", "biking", "boating", "junior ranging program",
//  "climbing", "skiing", "wildlife watchin"];
var uniqueIDActivities = ["7CE6E935-F839-4FEC-A63E-052B1DEF39D2", "A59947B7-3376-49B4-AD02-C0423E08C5F7", "B12FAAB9-713F-4B38-83E4-A273F5A43C77", "AE42B46C-E4B7-4889-A122-08FE180371AE",
"BFF8C027-7C8F-480B-A5F8-CD8CE490BFBA", "DF4A35E0-7983-4A3E-BC47-F37B872B0F25", "01D717BC-18BB-4FE4-95BA-6B13AD702038", 
"4D06CEED-90C6-4B69-B264-32CC90B69BA6" ];


//base string variables for nps API
var npsBaseAPIUrl = "https://developer.nps.gov/api/v1"
var npsAPI_data = ["/activities?","/activities/parks?","/topics?"]
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

// fetch("npsBaseAPIUrl+npsAPIkey", {
//     cache: 'reload',
// })
// .then(function (response) {
//     return responce.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });

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

// //  not working 
// async function getActivitiesList(id){
//     await getNPSdata(npsBaseAPIUrl+npsAPI_data+activityId&+uniqueIDActivities+npsAPIkey);
//             dataArr.forEach(element => {
//                 var optionEl = document.createElement("option");
//                 optionEl.setAttribute("value", element.name);
//                 dataListEl.append(optionEl);
//             });
            
// };



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


getActivitiesList(40);
getAllStates();

//find button handler
findBtn.addEventListener("click", async function (ev) {
    var activityId = "id="+ await getActivityIdByName(searchField.value);
    await getParksListByActivityId(activityId,1);
    var parksByState = dataArr[0].parks.filter(function(state) {
        return state.states == stateField.value;
    });
    
    //get movie info by park name (designation)
    parksByState.forEach(async element => {
        await getMovieInfo(omdbBaseAPIUrl+element.designation+"&"+omdbAPIkey);
        console.log(element);
    });

    //get books by by park name (fullName)
    parksByState.forEach(async element => {
        await getBooks(openlibraryBaseAPIUrl+element.fullName.replace(" ","+"));
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
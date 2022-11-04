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

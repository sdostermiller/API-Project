const countryName = document.getElementById("countryName");
const totalCases = document.getElementById("totalCases");
const progressDeaths = document.getElementById("deaths");
const progressActive = document.getElementById("active");
const progressRecovered = document.getElementById("recovered");

let apiCountries = "https://api.covid19api.com/countries";
let randCountry = {};
let liveData = {};
let totalConfirmed;
let pctDeaths;
let pctRecovered;
let pctActive;
let country;
let deaths;
let active;
let recovered;

fetchCountry();
fetchData();

function fetchCountry() {
    fetch(apiCountries)
    .then(response =>response.json())
    .then(function(json){
         randCountry = json[Math.floor(Math.random() * 248)]
         console.log(randCountry);
                     fetchData(randCountry)})  
}

function fetchData(randCountry) {

    let apiLive =`https://api.covid19api.com/live/country/${randCountry.Slug}/status/confirmed`;
    console.log(apiLive);
    fetch(apiLive)
    .then(response => response.json())
    .then(function(json){
        console.log(json[0])
        liveData = json[0];
        country = liveData.Country;
        totalConfirmed = liveData.Confirmed;
        deaths = liveData.Deaths;
        recovered = liveData.Recovered;
        active = liveData.Active;
        pctDeaths = (liveData.Deaths/totalConfirmed*100);
        pctRecovered = (liveData.Recovered/totalConfirmed*100);
        pctActive = (liveData.Active/totalConfirmed*100);
        
        console.log(country, deaths, recovered, active, totalConfirmed);
        console.log("Percents:", pctDeaths.toFixed(0), pctRecovered.toFixed(0), pctActive.toFixed(0));

        nameInsert = document.createElement('h1');
        nameInsert.textContent = `${country}`;
        countryName.appendChild(nameInsert);

        casesInsert = document.createElement('h2');
        casesInsert.textContent = `Total Cases to Date: ${totalConfirmed}`;
        totalCases.appendChild(casesInsert);

        progressDeaths.style.width =`${pctDeaths.toFixed(0)}%`;
        progressActive.style.width = `${pctActive.toFixed(0)}%`;
        progressRecovered.style.width = `${pctRecovered.toFixed(0)}%`;

        console.log(deaths, totalConfirmed, recovered, active, country);
        console.log(`"${pctDeaths.toFixed(0)}%"`);
    })
}

    






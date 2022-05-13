// Weather App JS

// Variables

// 1. Make an input => WRITE CITY.
// 2. 


let apikey = 'ca23d7602f5e48aba68192621221105';

let valorBuscado = document.querySelector('.buscador');
console.log(valorBuscado);
let buscarBtn = document.querySelector('.buscarBtn');
let midIconContainer = document.querySelector('.middle-icon')

// Valores cambiantes

let midIcon = document.querySelector('.mid-icon');
let fechaActual = document.querySelector('.dia-actual');
let tempDia = document.querySelector('.temp-dia');
let descClima = document.querySelector('.clima-desc');
let velWind = document.querySelector('.vel-wind');
let humClima = document.querySelector('.per-hum');

// Event Listeners

buscarBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let infoBuscar = valorBuscado.value;
    let letters = /^[A-Za-z]+$/;
    if (infoBuscar == "" || !isNaN(infoBuscar)) {
        console.log("Introducir nombre valido");
    }else{
        getSimpleClimaData(infoBuscar);
    }
})

// valorBuscado.addEventListener('input', () => {
//     let teclaEnter = keyCode(13)
//     let buscar = valorBuscado.value;
//     if (teclaEnter) {
//         getSimpleClimaData(buscar);
//     }
// })



// Functions


function getSimpleClimaData(ciudad) {
    getForecast(ciudad);

    // getDailyForecast(ciudad);
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${ciudad}&days=5&aqi=no&alerts=no`)
        .then((resp) => resp.json())
        .then((data) => {
            [data].forEach(el => {
                console.log(el)
                climaData = {
                    climaLng: el.location.lon,
                    climaLat: el.location.lat,
                    climaDia: el.forecast.forecastday[0].date,
                    climaGral: el.current.condition.text,
                    climaIcon: el.current.condition.icon,
                    climaPais: el.location.country,
                    climaLocalidad: el.location.region,
                    climaNube: `${el.current.cloud}%`,
                    climaTempC: el.current.feelslike_c,
                    climaWind: el.current.wind_kph
                }
                changeValues(climaData);
            });
        })
        .catch( (error) => {
            console.log(error)
        })
}

function getForecast(ciudad) {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${ciudad}&days=5&aqi=no&alerts=no`)
        .then((resp) => resp.json())
        .then((data) => {
            [data].forEach(clima => {
                // console.log(clima)
                infoDias = {
                    primDia: {
                        climaDia: clima.forecast.forecastday[0].date,
                        climaIcon: clima.forecast.forecastday[0].day.condition.icon,
                        climaTempMin: clima.forecast.forecastday[0].day.mintemp_c,
                        climaTempMax: clima.forecast.forecastday[0].day.maxtemp_c
                    },
                    segDia: {
                        climaDia: clima.forecast.forecastday[1].date,
                        climaIcon: clima.forecast.forecastday[1].day.condition.icon,
                        climaTempMin: clima.forecast.forecastday[1].day.mintemp_c,
                        climaTempMax: clima.forecast.forecastday[1].day.maxtemp_c
                    },
                    terDia: {
                        climaDia: clima.forecast.forecastday[2].date,
                        climaIcon: clima.forecast.forecastday[2].day.condition.icon,
                        climaTempMin: clima.forecast.forecastday[2].day.mintemp_c,
                        climaTempMax: clima.forecast.forecastday[2].day.maxtemp_c
                    }
                }
            });
        })
}

const changeValues = (climaData) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    let cutIconLink = climaData.climaIcon.replace("//cdn.weatherapi.com/weather/64x64/", "");
    midIcon.src = `icons/${cutIconLink}`;
    fechaActual.textContent = `Today, ${todayDate} ${monthNames[todayMonth]} `;
    tempDia.textContent = `${climaData.climaTempC}º`;
    descClima.textContent = climaData.climaGral;
    velWind.textContent = `${Math.floor(climaData.climaWind)}km/h`;
    humClima.textContent = climaData.climaNube;
    centerMap(`${climaData.climaLng}`, `${climaData.climaLat}`);
}






// GET WEATHER BASED ON MY COORDS (NEED TO ACCEPT or GET RANDOM COORDS) 

let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function getMyLocation() {
    navigator.geolocation.getCurrentPosition(success, error)
    
}

function success(data) {
    let myRoundLng = parseFloat(data.coords.longitude).toFixed(4);
    let myRoundLat = parseFloat(data.coords.latitude).toFixed(4);
    let myCoords = `${myRoundLat}, ${myRoundLng}`;
    getSimpleClimaData(myCoords);
    centerMap(myRoundLng, myRoundLat)
}

function error() {
    let randomLng = parseFloat(Math.random() * (45 - -50) + - 50).toFixed(4);
    let randomLat = parseFloat(Math.random() * (45 - -45) + - 45).toFixed(4);
    let myCoords = `${randomLat}, ${randomLng}`;
    getSimpleClimaData(myCoords);
    console.log(randomLat, randomLng)
}

getMyLocation()
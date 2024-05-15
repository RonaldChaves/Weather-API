import API_Key from './config.js';


const inputCity = document.querySelector('#input-city');
const searchBtn = document.querySelector('#search');

const cityWeather = async (city) => {
    const apitest = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&lang=pt_br`;

    const data = fetch(apitest)
        .then((response) => response.json())
        .then((cityDetails) => cityDetails);

    return data;
}

const cityName = document.querySelector('#name-city');
const cityBadge = document.querySelector('#badge');
const cityTemp = document.querySelector('.temp');
const cityhumidity = document.querySelector('#humidity');
const cityWind = document.querySelector('#wind');
const cityWeatherIcon = document.querySelector('.weather-icon');
const cityDescription = document.querySelector('#description');
const cityMinTemp = document.querySelector('#min-temp');
const cityMaxTemp = document.querySelector('#max-temp');

// Functions

const getCity = async (city) => {
    const data = await cityWeather(city);
    const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    cityName.innerHTML = data.name;
    cityTemp.innerHTML = parseInt((data.main.temp) - 273.15);
    cityhumidity.innerHTML = data.main.humidity;
    cityWind.innerHTML = parseInt((data.wind.speed) * 3.6);
    cityWeatherIcon.src = weatherIcon;
    cityDescription.innerHTML = data.weather[0].description;
    cityMinTemp.innerHTML = parseInt((data.main.temp_min) - 273.15);
    cityMaxTemp.innerHTML = parseInt((data.main.temp_max) - 273.15);
};


const getBadge = async (city) => {
    const data = await cityWeather(city);
    const badge = data.sys.country;
    const API_Flags = `https://flagsapi.com/${badge}/flat/32.png`;

    cityBadge.src = API_Flags;
}

// Events

searchBtn.addEventListener('click', (e) => {
    const city = inputCity.value;
    e.preventDefault();

    getCity(city);
    getBadge(city);
    enabledDisplayWeather();

    inputCity.value = '';

});

inputCity.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
        const city = e.target.value;
        getCity(city);
        getBadge(city);
        enabledDisplayWeather();

        inputCity.value = '';
    }

})

// function para esconder o "default" da inicialização do app

const weather = document.querySelector('.weather');

const enabledDisplayWeather = () => {
    weather.classList.add('enabled');
}
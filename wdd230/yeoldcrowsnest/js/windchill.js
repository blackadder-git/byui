let zip = 5604473;
let town = document.querySelector('title').text;
if (town.includes('Soda Springs Town')) {
    zip = 5607916;
}
else if (town.includes('Fish Haven Town')) {
    zip = 5585010;
}


let getWindchill = function(temperature, windspeed) {
    if (temperature <= 50 && windspeed > 3) {

        return Math.round((
            35.74 + 
            (0.6215 * temperature) - 
            (35.75 * Math.pow(windspeed, 0.16)) + 
            (0.4275 * temperature * Math.pow(windspeed, 0.16))
        ));
    }
    else {
        return '0';
    }
}


const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?id=${zip}&appid=034a5149f25e27e12ccb79045e2460c2&units=imperial`;

fetch(weatherAPI)
.then(function (response) {
    return response.json();
})
.then(function (jsonObject) {
    console.table(jsonObject);
  
    const temp = jsonObject.main.temp;
    const wind = jsonObject.wind.speed;
    document.querySelector('.description').textContent = `${jsonObject.weather[0].main}`;
    document.querySelector('.temperature').textContent = `${temp} ºF`;
    document.querySelector('.windchill').textContent = `${getWindchill(temp, wind)} ºF`;
    document.querySelector('.humidity').textContent = `${jsonObject.main.humidity} %`;
    document.querySelector('.windspeed').textContent = `${wind} mph`;
});

const forcastAPI = `https://api.openweathermap.org/data/2.5/forecast?id=${zip}&appid=034a5149f25e27e12ccb79045e2460c2&units=imperial`;

fetch(forcastAPI)
.then(function (response) {
    return response.json();
})
.then(function (jsonObject) {
    console.table(jsonObject);
    let i = 0;
    const weekdays =['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    jsonObject.list.forEach(day => {
        if (day.dt_txt.includes('18:00:00')) {
            i++;
            let today = new Date(day.dt_txt).getDay();
            document.querySelector('#weekday' + i).textContent = weekdays[today]; 
            document.querySelector('#day' + i).textContent = `${day.main.temp} ºF`;
            document.querySelector('#icon' + i).src = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
            document.querySelector('#icon' + i).alt = day.weather[0].main;
        }
    })
});
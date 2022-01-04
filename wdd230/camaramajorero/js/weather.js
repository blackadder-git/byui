const forcastAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=28.53&lon=13.93&exclude=minutely,hourly&units=metric&appid=034a5149f25e27e12ccb79045e2460c2`;

fetch(forcastAPI)
.then(function (response) {
    return response.json();
})
.then(function (jsonObject) {
    //console.table(jsonObject);

    let temp = document.querySelector('#temp'); 
    let condition = document.querySelector('#condition'); 
    let humidity = document.querySelector('#humidity'); 
    let description = jsonObject.current['weather'][0]['description'];
    let icon = jsonObject.current['weather'][0].icon;

    temp.innerHTML = `<em>Temperatura actual:</em> ${jsonObject.current['temp']}ºC, `;
    humidity.innerHTML = `<em>Humedad:</em> ${jsonObject.current['humidity']}%, `;
    condition.innerHTML = `<em>Condición:</em> ${description} <img id="weathericon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description} condición">`;

    document.querySelector('#weathericon').src = `https://openweathermap.org/img/wn/${jsonObject.current['weather'][0].icon}@2x.png`;
    document.querySelector('#weathericon').alt = jsonObject.current['weather'][0]['description'];


    const weekdays =['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab']
    const day = new Date();
    let today = day.getDay();
    //alert('current day=' + today);
    
    // get the current day temp for today and next two days (3 days total)
    for (let i = 0; i < 3; i++) {
        if (today == 7) {
            today = 0;
        }

        let current = document.querySelector('#day' + (i + 1)); 
        current.innerHTML = `<h3>${weekdays[today]}</h3> ${jsonObject.daily[today].temp.day}ºC`;
        today++;
    }

    // alerts
    let alert = document.querySelector('#alert'); 
    if (jsonObject.hasOwnProperty('event')) {
        let event = jsonObject.alerts['event'];
        let description = jsonObject.alerts['description'];
        alert.insertAdjacentHTML = `<h3>${event}: ${description}</h3>`;
    }
    else {
        alert.insertAdjacentHTML('afterbegin', '<h3>Alerta: no hay alertas en esta momento</h3>');
    }
});


document.querySelector('.close').addEventListener('click', () => { 
    document.querySelector("#alert").style.display = "none";
}, false);
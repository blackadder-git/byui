const towntURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(towntURL)
.then(function (response) {
    return response.json();
})
.then(function (jsonObject) {
    console.table(jsonObject);

    const validtowns = ["Preston", "Soda Springs", "Fish Haven"];
    const towns = jsonObject['towns'];

    towns.forEach(town => {
        if (validtowns.includes(town.name)) {
            let card = document.createElement('section');
            card.classList.add('placeholder');
            let h2 = document.createElement('h2');
            let picture = document.createElement('picture');
            let motto = document.createElement('h3');
            motto.classList.add('motto');
            let data = document.createElement('div');
            data.classList.add('towndata');
            let founded = document.createElement('p');
            let population = document.createElement('p');
            let rainfall = document.createElement('p');
            let report = document.createElement('button')
            let image = document.createElement('img');
            let link = document.createElement('a');

            h2.textContent = town.name;
            founded.textContent = `Year Founded: ${town.yearFounded}`;
            population.textContent = `Population: ${town.currentPopulation}`;
            rainfall.textContent = `Annual Rain Fall: ${town.averageRainfall}`;
            image.setAttribute('src', `images/${(town.name).replace(' ','').toLowerCase()}.webp`);
            image.setAttribute('alt', `weather in ${town.name}`);
            motto.textContent = town.motto;
            report.onclick = reportweather;
            report.textContent = 'Report weather';
            link.innerHTML = `<br><br>visit ${town.name}`;
            link.setAttribute('href', `${(town.name).replace(' ','').toLowerCase()}.html`);

            card.appendChild(h2);
            picture.appendChild(image);
            picture.appendChild(motto);
            data.appendChild(founded);
            data.appendChild(population);
            data.appendChild(rainfall);
            data.appendChild(report);
            data.appendChild(link);
            card.appendChild(picture);
            card.appendChild(data);

            document.querySelector('div.towns').appendChild(card);
        }
    });
});

function reportweather() {
    window.location.replace("stormcenter.html");
}
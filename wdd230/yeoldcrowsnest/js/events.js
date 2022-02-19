let townevents = function(town) {
    let h3 = document.createElement('h3');
    h3.textContent = 'Upcoming Events';
    document.querySelector('.events').appendChild(h3);

    let ul = document.createElement('ul');
    town.events.forEach(event => {
        let upcoming = document.createElement('li');
        upcoming.textContent = event;
        ul.appendChild(upcoming);
    });

    document.querySelector('.events').appendChild(ul);
}

const towntURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(towntURL)
.then(function (response) {
    return response.json();
})
.then(function (jsonObject) {
    console.table(jsonObject);

    const validtowns = ["Preston", "Soda Springs", "Fish Haven"];
    const towns = jsonObject['towns'];

    let townname = document.querySelector('title').text;

    towns.forEach(town => {
        if (town.name === 'Preston' && townname.includes('Preston')) {
            townevents(town);
        }
        else if (town.name === 'Soda Springs' && townname.includes('Soda')) {
            townevents(town);
        }
        else if (town.name === 'Fish Haven' && townname.includes('Fish')) {
            townevents(town);
        }
    });
});
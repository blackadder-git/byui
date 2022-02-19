const quotetURL = 'js/quotes.json';

fetch(quotetURL)
.then(function (response) {
    return response.json();
})
.then(function (jsonObject) {
    console.table(jsonObject);

    const quotes = jsonObject['quotes'];

    let quote = quotes[Math.floor(Math.random()*quotes.length)];

    document.querySelector('#quote').innerHTML = `<em>${quote.quote}</em> <br><span style="float:right"> -- ${quote.author}</span>`;
});
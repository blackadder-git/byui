const queryString = window.location.search;
//console.log(queryString);

const urlParams = new URLSearchParams(queryString);
const values = urlParams.values();

/*
https://www.sitepoint.com/get-url-parameters-with-javascript/
const keys = urlParams.keys(), values = urlParams.values(), entries = urlParams.entries();
for (const key of keys) {
    // product, color, newuser, size
    console.log(key);
}*/

let asunto = document.createElement('div');

document.querySelector('#code').textContent = new Date().getTime();

for (const value of values) {
    //console.log(value);

    let data = document.createElement('div');
    data.textContent = value;
    asunto.appendChild(data);
}

document.querySelector('#asunto').appendChild(asunto);
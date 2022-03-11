 //query = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=2020-02-02&latitude=42.29311044576422&longitude=18.8441793057848&maxradiuskm=100`;
/*
 const latitude = '42.29311044576422';
 const longitude = '18.8441793057848';

 const query =
   baseUrl +
   `&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${radius}`;
*/

import { getJSON } from './utilities.js';
// Quake Model
export default class Quake {
  constructor() {
    this.baseUrl =
      'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-03-02';
    // this is where we will store the last batch of retrieved quakes in the model.  I don't always do this...in this case the api doesn't have an endpoint to request one quake.
    this._quakes = [];
  }
  async getEarthQuakesByRadius(position, radius = 100) {
    // use the getJSON function and the position provided to build out the correct URL to get the data we need.  Store it into this._quakes, then return it
    this._quakes = getJSON(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=2020-02-02&latitude=42.29311044576422&longitude=18.8441793057848&maxradiuskm=100`);
    return this._quakes;
  }
  getQuakeById(id) {
    // filter this._quakes for the record identified by id and return it
    return this._quakes.features.filter(item => item.id === id)[0];
  }
}




async function showQuakes() {
    // get the current location
    const location = await initPos();
    // get the list of quakes for the location
    quakes = await getQuakesForLocation(location);
    // render the list to the list element
    const listElement = document.querySelector("#quakeList");
    listElement.innerHTML = generateListMarkup(
      quakes.features,
      earthQuakeListTemplate
    );
  
    // attach a listener to the quakes that will listen for a click and render out details about the quake
    listElement.addEventListener("click", earthQuakeClickHandler);
}


function initPos() {

}

function getQuakesForLocation(location) {

}

function generateListMarkup(list, templateCallback) {

}

function earthQuakeListTemplate(data) {

}

function earthQuakeClickHandler(event) {

}

showQuakes();
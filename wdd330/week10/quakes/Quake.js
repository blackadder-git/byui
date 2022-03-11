import { getJSON } from './utilities.js';
// Quake Model
export default class Quake {
  constructor() {
    this.baseUrl =
      'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';
    // store the last batch of retrieved quakes in the model.  I don't always do this...in this case the api doesn't have an endpoint to request one quake.
    this._quakes = [];
  }
  async getEarthQuakesByRadius(position, radius = 100) {
    this._quakes = await getJSON(

      // HAD TO CHANGE THE DATE TO SOMETHING DIFFERENT e.g. 2020 because the default 2019 didn´t have earthquakes
      this.baseUrl +
        `&starttime=2020-01-01&endtime=2020-03-02&latitude=${
          position.lat
        }&longitude=${position.lon}&maxradiuskm=${radius}`
    );
  /*
    console.log(position.lat);
    console.log(position.lon);
    console.log(this.baseUrl +
      `&starttime=2019-01-01&endtime=2019-03-02&latitude=${
        position.lat
      }&longitude=${position.lon}&maxradiuskm=${radius}`);
  */
    return this._quakes;
  }
  getQuakeById(id) {
    return this._quakes.features.filter(item => item.id === id)[0];
  }
}
/****************************************
 * SHOPPING CONTROLLER
*****************************************/
const DEBUG = true;

import Model from './model.js';
import View from './view.js';

export default class Shopping {

    /****************************************
    // constructor
    *****************************************/
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    // default greeting
    hello (message = "matey") {
        alert("Hello " + message);
    }

} // END CLASS

const shopping = new Shopping(new Model(), new View());
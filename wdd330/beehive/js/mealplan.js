/********************************************
 * Mealplan Controller 
 * https://stackabuse.com/drag-and-drop-in-vanilla-javascript/
 *******************************************/
 const DEBUG = true;

 import Model from './model.js';
 import View from './view.js';
 
 export default class Mealplan {
 
     /****************************************
     // constructor
     *****************************************/
     constructor (model, view) {
        this.model = model;
        this.view = view;
 
         // add listeners
        //this.addMealplanListener();
        //this.editMealplanListener();        
        this.cancelListener();
     }


     cancelListener() {
        if (DEBUG) console.log('cancel mealplan listener');
        
        document.querySelector('#cancel').addEventListener('click', (e) => {
            // redirect to main page
            window.location.replace("../index.html");
        });
    }

} // END CLASS

const pantry = new Mealplan(new Model(), new View());     
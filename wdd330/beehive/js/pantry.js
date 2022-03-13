/****************************************
 * PANTRY CONTROLLER
*****************************************/

const DEBUG = true;

import Model from './model.js';
import View from './view.js';

export default class Pantry {

    /****************************************
    // constructor
    *****************************************/
    constructor() {
        this.model = new Model();
        this.view = new View();

        // add listeners
        this.addPantryItemListener();
    }

    // default greeting
    hello (message = "matey") {
        alert("Hello " + message);
    }

    addPantryItemListener() {
        document.querySelector('#addPantryItem').addEventListener('click', (e) => {
            if (DEBUG) console.log('add pantry item listener');
            this.addPantryItem();
        });
    }

    addPantryItem() {
        if (DEBUG) console.log('add pantry item');
/*
        const id = '#familyMember';

        const familyMember = this.view.getFormElements(id);

        if (familyMember != null && familyMember.name.value != '') {
            const newMember = {id: Date.now(), name: familyMember.name.value, age: familyMember.age.value, sex: familyMember.sex.value, activity: familyMember.activity.value};
            console.log(newMember);
            
            let family = this.model.readFromLocalStorage('family');
            family.push(newMember);
            this.model.writeToLocalStorage(family, 'family');

            this.view.clearForm(id);
        }
        else {
            // TODO: let user know there was a problem
            console.log('could not add family member, the form is missing content');
        }
*/
    }

} // END CLASS

const pantry = new Pantry();
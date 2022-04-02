/********************************************
 * Family Controller 
 *******************************************/
const DEBUG = true;

import Model from './model.js';
import View from './view.js';

export default class Family {

    /****************************************
    // constructor
    *****************************************/
    constructor (model, view) {
        this.model = model;
        this.view = view;

        // add listeners
        this.addFamilyMemberListener();
        this.editFamilyMemberListener();        
        this.cancelListener();
    }

    // default greeting
    hello (message = "matey") {
        alert("Hello " + message);
    }

    addFamilyMemberListener() {
        if (DEBUG) console.log('add family member listener');

        document.querySelector('#addFamilyMember').addEventListener('click', (e) => {
            if (document.querySelector('#id').value != '') {

                // delete item from pantry
                this.delFamilyMember(document.querySelector('#id').value);
            }

            this.addFamilyMember();

            // redirect to main page
            // window.location.replace("../index.html");
        });
    }

    // check for existing household member when the url contains an id 
    editFamilyMemberListener() {
        if (DEBUG) console.log('edit family member listener');

        const members = document.querySelectorAll('.editFamilyMember');
        
        if (DEBUG) console.log('edit family member listener');
        // check the query string for edit?
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');
        if (id != undefined) {
            this.editFamilyMember(id);
        }
    }

    cancelListener() {
        if (DEBUG) console.log('cancel listener');
        
        document.querySelector('#cancel').addEventListener('click', (e) => {
            // redirect to main page
            window.location.replace("../index.html");
        });
    }

    // do the work to add a new member of the household
    addFamilyMember() {
        if (DEBUG) console.log('add family member');

        const id = '#familyMember';

        const form = this.view.getFormElements(id);

        if (form != null && form.name.value != '') {
            const newMember = {id: Date.now(), 
                               name: form.name.value, 
                               age: form.age.value, 
                               sex: form.sex.value, 
                               activity: form.activity.value
                            };

            newMember.calories = getCalories(newMember);
                            
            // new family member object
            if (DEBUG) console.log(newMember);
            
            let family = this.model.readFromLocalStorage('family');
            family.push(newMember);
            this.model.writeToLocalStorage(family, 'family');

            this.view.showMessage(`Now in your household: ${form.name.value}`);

            this.view.clearForm(id);
        }
        else {
            // TODO: let user know there was a problem
            console.log('could not add family member, the form is missing content');
        }
    }
    
    // use id to look for existing family member, if found send to view
    editFamilyMember(id) {
        if (DEBUG) console.log('edit family member');

        const family = this.model.readFromLocalStorage('family');
        family.forEach(member => {
            if (member.id == id) {
                this.view.editFamilyMember(member);
            }
        });
    }

    // delete family member if found, update list
    delFamilyMember(id) {
        if (DEBUG) console.log('delete family member');

        const family = this.model.readFromLocalStorage('family');

        // loop each item
        family.forEach(function(member, index, object) {
            // if member is found, delete
            if (member.id == id) {
                object.splice(index, 1); // remove member from array
            }
        });

        // save updated list to disk
        this.model.writeToLocalStorage(family, 'family');
    }

} // END CLASS

const family = new Family(new Model(), new View());

// https://www.fda.gov/media/112972/download
function  getCalories(newMember) {
    let calories = 10;
    // maleconsole.log('delete family member');
    if (DEBUG) console.log(newMember.sex, newMember.age, newMember.activity);
    if (newMember.sex == 'male') {
        switch (newMember.activity) {
            case 'sedentary':
                calories = getCaloriesSedentaryMale(newMember.age);
                break;
            case 'moderate':
                calories = getCaloriesModerateMale(newMember.age);
                break;
            case 'active':
                calories = getCaloriesActiveMale(newMember.age);
                break;
            default:
        }
    }
    // female
    else {

    }
    return calories;
}

function getCaloriesSedentaryMale(age) {
    let calories = 0;

    switch(Number(age)) {
        //  infants (< 1) need to eat about 35-50 calories a day per pound of weight
        case 1: case 2: case 3:
            calories = 1000;
            break;
        case 4: case 5: 
            calories = 1200;
            break;
        case 6: case 7: case 8:
            calories = 1400;
            break;
        case 9: case 10:
            calories = 1600;
            break;
        case 11: case 12:
            calories = 1800;
            break;
        case 15: case 41: case 42: case 43: case 44: case 45: case 46: case 47: case 48: case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: case 58: case 59: case 60:
            calories = 2200;
            break;
        case 16: case 17: case 18: case 21: case 22: case 23: case 24: case 25: case 26: case 27: case 28: case 29: case 30: case 31: case 32: case 33: case 34: case 35: case 36: case 37: case 38: case 39: case 40:
            calories = 2400;
            break;
        // 13, 14, > 61
        default:
            calories = 2000;
    }
    return calories;
}

function getCaloriesModerateMale(age) {
    let calories = 0;
    switch(Number(age)) {
        //  infants (< 1) need to eat about 35-50 calories a day per pound of weight
        case 1: case 2:
            calories = 1000;
            break;
        case 3: case 4: case 5: 
            calories = 1400;
            break;
        case 6: case 7: case 8:
            calories = 1600;
            break;
        case 9: case 10:
            calories = 1800;
            break;
        case 11:
            calories = 2000;
            break;
        case 14: case 51: case 52: case 53: case 54: case 55: case 56: case 57: case 58: case 59: case 60: case 61: case 62: case 63: case 64: case 65:
            calories = 2400;
            break;
        case 15:
            calories = 2600;
            break;
        case 16: case 17: case 18: case 19: case 20: case 21: case 22: case 23: case 24: case 25: case 26: case 27: case 28: case 29: case 30: case 31: case 32: case 33: case 34: case 35: case 36: case 37: case 38: case 39: case 40: case 41: case 42: case 43: case 44: case 45:
            calories = 2800;
            break;
        // 12, 13, 14, > 66
        default:
            calories = 2200;
    }
    return calories;
}


function  getCaloriesActiveMale(age) {
    let calories = 0;
    switch(Number(age)) {
        //  infants (< 1) need to eat about 35-50 calories a day per pound of weight
        case 1: case 2:
            calories = 1000;
            break;
        case 3:
            calories = 1400;
            break;
        case 4: case 5: 
            calories = 1600;
            break;
        case 6: case 7:
            calories = 1800;
            break;
        case 8: case 9:
            calories = 2000;
            break;
        case 13: case 56: case 57: case 58: case 59: case 60: case 61: case 62: case 63: case 64: case 65: case 66: case 67: case 68: case 69: case 70: case 71: case 72: case 73: case 74: case 75:
            calories = 2600;
            break;                
        case 14: case 36: case 37: case 38: case 39: case 40: case 41: case 42: case 43: case 44: case 45: case 46: case 47: case 48: case 49: case 50: case 51: case 52: case 53: case 54: case 55: 
            calories = 2800;
            break;
        case 15: case 19: case 20: case 21: case 22: case 23: case 24: case 25: case 26: case 27: case 28: case 29: case 30: case 31: case 32: case 33: case 34: case 35:
            calories = 3000;
            break;
        case 16: case 17: case 18:
            calories = 3200;
            break;
        // 10, 11, 12, > 66
        default:
            calories = 2200;
    }
    return calories;
}
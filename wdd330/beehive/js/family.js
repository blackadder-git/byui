// family

import Model from './model.js';

/****************************************
 * CONTROLLER CLASS
*****************************************/
export default class Family {

    /****************************************
    // constructor
    *****************************************/
    constructor () {
        // const model = new Model();
        this.model = new Model();

    }

    hello (message = "matey") {
        alert("Hello " + message);
    }

    addFamilyMember(name, age, sex, activity) {
        const familyMember = {id: Date.now(), name: name, age: age, sex: sex, activity: activity};
        console.log(name, age, sex, activity);
        let family = this.model.readFromLocalStorage('family');
        family.push(familyMember);
        this.model.writeToLocalStorage(family, 'family');
    }

    getFamilyMembers() {
        return this.model.readFromLocalStorage('family');
    }

    getEstimatedDailyCalorieNeeds(familyMembers) {
        let calories = 0;

        familyMembers.forEach(member => {
            console.log(member);
            calories += this.getIndividualCalorieNeeds(member.sex, member.age, member.activity);
        });
        return calories;
    }


    // https://www.fda.gov/media/112972/download
    getIndividualCalorieNeeds(sex, age, activity) {
        let calories = 10;
        // male
        console.log(sex, age, activity);
        if (sex == 'male') {
            switch (activity) {
                case 'sedentary':
                    calories = this.getCaloriesSedentaryMale(age);
                    break;
                case 'moderate':
                    calories = this.getCaloriesModerateMale(age);
                    break;
                case 'active':
                    calories = this.getCaloriesActiveMale(age);                    
                    break;
                default:
            }
        }
        // female
        else {

        }
        return calories;
    }

    getCaloriesSedentaryMale(age) {
        let calories = 0;
        switch(age) {
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

    getCaloriesModerateMale(age) {
        let calories = 0;
        switch(age) {
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


    getCaloriesActiveMale(age) {
        let calories = 0;
        switch(age) {
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


} // END CLASS


const family = new Family();

if (document.querySelector("#addFamilyMember")) {
    document.querySelector("#addFamilyMember").addEventListener('click', (e) => {
        //alert("Add family member");
        //family.hello();
        const name = document.querySelector('#name').value;
        const age = document.querySelector('#age').value;
        const sex = document.querySelector('#sex').value;
        const activity = document.querySelector('#activity').value;
        if (name) {
            family.addFamilyMember(name, age, sex, activity);
        }
        else {
            alert('no name');
        }
    });
}
else {
    //alert('not here');
}
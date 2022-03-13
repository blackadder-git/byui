/********************************************
 * View
 *******************************************/


 export default class View {
 
    /****************************************
     * constructor
     *****************************************/
    constructor() {
    }
 
    hello () {
        alert('Aye matey ...');
    }

    /****************************************
     * generic way to get form elememts
     *****************************************/
    getFormElements(id) {
        if (document.querySelector(id)) {
            return document.querySelector(id).elements;
        }
        else {
            console.log(`${id} does not exist`);
            return null;
        }
    }

    clearForm(id) {
        document.querySelector(id).reset();
        //let elements = document.querySelector(id).elements;
        //console.log(elements);
        // from converts elements to an array
        /*
        Array.from(elements).forEach((element) => {
            if (element.type == 'text' || element.type == 'textarea' || element.type == 'number') {
                document.querySelector(`#${element.id}`).value = '';
            }
            else if (element.type == 'select-one' || element.type == 'select-multiple') {
                document.querySelector(`#${element.id}`).selectedIndex = 0;
            }
            else {
                alert(`#${element.id} = ${element.type}`);
            }
        });
        */
    }
 }
 // end class







/*

import Family from './family.js';

const DEBUG = true;

/****************************************
 * VIEW CLASS
*****************************************
/
export default class View {

    /****************************************
    // 
    *****************************************
    /
    showFamilyMembers(family, id) {
        let parent = document.querySelector(id);

        family.forEach(element => {
            let div = document.createElement('div');
            div.innerHTML = `${element.name} ${element.age} <span id="${element.id}" class="delFamily">X</span>`;
            parent.appendChild(div);
        });
    }

    showFamilyCalories(calories, familyMembers, id) {
        let parent = document.querySelector(id);

        parent.innerHTML = `Your ${familyMembers} family members need a total of ${calories} calories per day according to WHO `;
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
*/
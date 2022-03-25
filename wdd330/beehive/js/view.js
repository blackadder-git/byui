/********************************************
 * View
 *******************************************/
const DEBUG = true;

/****************************************
 * VIEW CLASS
*****************************************/
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
     * generic way to get all elememts from a form
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

    showMessage(message) {
        document.querySelector('#message').innerHTML = message;
    }

    // FAMILY
    buildFamilyTable(family) {
        let table = document.createElement('table');
        table.setAttribute('id', 'familyData');
 
        // table header
        let thead = document.createElement('thead');
        table.appendChild(thead);
        let row_1 = document.createElement('tr');
        let heading_1 = document.createElement('th');
        heading_1.innerHTML = "Name";
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "Age";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "Sex";
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "Activity";

        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);
        thead.appendChild(row_1);

        // table body
        let tbody = document.createElement('tbody');
        table.appendChild(tbody);
        family.forEach(member => {
            let row = document.createElement('tr');
            let row_data_1 = document.createElement('td');
            row_data_1.innerHTML = `<a href="" id="${member.id}" class="editFamily">${member.name}</a>`;
            let row_data_2 = document.createElement('td');
            row_data_2.innerHTML = member.age;
            let row_data_3 = document.createElement('td');
            row_data_3.innerHTML = member.sex;
            let row_data_4 = document.createElement('td');
            row_data_4.innerHTML = member.activity;
            
            row.appendChild(row_data_1);
            row.appendChild(row_data_2);
            row.appendChild(row_data_3);
            row.appendChild(row_data_4);
            tbody.appendChild(row);

            console.log(member.name);
        });

        // add to view
        document.querySelector('#familyMembers').appendChild(table);

    }

    // PANTRY


    // RECIPE

    // https://www.thecookierookie.com/cooking-measurements-kitchen-conversion-chart/
    buildMeasureList(id) {
        const us = ['tsp', 'tbsp', 'fl ounce', 'pint', 'quart', 'gallon', 'oz', 'pound'];
        //const metric = ['ml', 'liter', 'gram'];
        let dl = document.querySelector(id);
        us.forEach((measure) => {
            let option = document.createElement('option');
            option.value = measure;
            dl.appendChild(option);
            console.log(measure);
        }); 
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
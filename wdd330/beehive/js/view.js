const DEBUG = true;

/****************************************
 * VIEW CLASS
*****************************************/
export default class View {

    /****************************************
    // 
    *****************************************/
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
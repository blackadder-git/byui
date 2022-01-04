function filter() {
    //let filter = function filter() {
        let sector = document.querySelector("#sector");
    
        let option = sector.options[sector.selectedIndex].text;    
        // alert(option);
    
        let items = document.querySelectorAll(".item");
        items.forEach((item) => {
            if (item.classList.contains(option) || option == '') {
                if (localStorage.getItem("show") == "block") {
                    item.style.display = "block";
                }
                else {
                    item.style.display = "grid";
                }
                //alert("show");
            }
            else {
                item.style.display = "none";
                //alert("hide");
            }
        });
    }

// https://code-boxx.com/list-grid-view-html-css/
window.addEventListener("DOMContentLoaded", function(){
    document.querySelector("#list").addEventListener("click", function() {
        //alert("list");
        document.querySelector("#gridlist").classList.remove("grid");
        // add grid to items
        let items = document.querySelectorAll(".item");
        items.forEach(function(item) {
            item.style.display = "grid";
            // alert("add grid display");
        });
        localStorage.setItem("show", "grid"); // used to filter
        filter();
    });
    document.querySelector("#grid").addEventListener("click", function() {
        //alert("grid");
        document.querySelector("#gridlist").classList.add("grid");
        // remove grid from item
        let items = document.querySelectorAll(".item")
        items.forEach(function(item) {
            item.style.display = "block";
            // alert("remove grid display");
        });
        localStorage.setItem("show", "block"); // used to filter
        filter();
    });
});


const businessURL = 'js/business.json';
let sectors = [];
fetch (businessURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        //console.table(jsonObject);

        let sector = document.querySelector('#sector');
        const businesses = jsonObject['business'];

        businesses.forEach(business => {

            // create article
            let article = document.createElement('article');
            article.classList.add('item');
            article.classList.add(business.sector);
            // create logo
            let logo = document.createElement('div');
            logo.innerHTML = `<img src="images/${business.logo}" alt="Logo de ${business.name}">`;
            article.appendChild(logo);
            // create data & h3
            let data = document.createElement('div');
            let h3 = document.createElement('h3');
            h3.textContent = business.name;
            data.appendChild(h3);    
            let p = document.createElement('p');
            p.innerHTML = `${business.phone}<br>${business.email}<br><a href="${business.web}" rel="noreferrer" target="_blank" aria-label="Visita la pagina de ${business.name}">website</a><br>${business.address}<br>${business.sector}<br>`;
            data.appendChild(p);
            article.appendChild(data);

            document.querySelector('#gridlist').appendChild(article);

            let sector = business.sector;
            if (!sectors.includes(sector)) {
                sectors.push(sector);
                // alert("ADD" + sector);
            }
            else {
                // alert("NOT" + sector);
            }

        /*
        displayTemples = temples.filter((temple) => {
            // filter logic
            return templesVisited.includes(temple.templeName); // include temple if I have been there
        });*/
        });

        let select = document.querySelector("#sector");
        select.add(document.createElement("option"));
        sectors.forEach((sector) => {
            var option = document.createElement("option");
            option.text = sector;
            // alert(option.text);
            select.add(option);
        });
    });
// END FETCH
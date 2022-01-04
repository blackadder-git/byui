// https://dev.to/webdeasy/10-awesome-css-hamburger-menus-1iho
const navigation = document.querySelector('.navigation')
const burger = document.querySelector('.burger');

window.onresize = () => {
    if (window.innerWidth > 560) {
        navigation.classList.add('show');
        burger.classList.remove("open");
    }
    else {
        navigation.classList.remove('show');
    }
};

burger.addEventListener('click', () => { navigation.classList.toggle("show"); }, false);

const menu = document.querySelectorAll('.menu');
menu.forEach (icon => {  
    icon.addEventListener('click', (event) => {
        icon.classList.toggle("open");
    });
});

// sticky header
// When the user scrolls the page, execute myFunction
window.onscroll = function() { stickNav()};

// Get the header
var nav = document.querySelector('nav');

// Get the offset position of the navbar
var sticky = nav.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickNav() {
  if (window.pageYOffset > sticky) {
    nav.classList.add("sticky");
  }
  else {
    nav.classList.remove("sticky");
  }
}

document.querySelector('.scroll').addEventListener('click', () => { 
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}, false);


var acc = document.querySelectorAll(".accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
        panel.style.display = "none";
    }
    else {
        panel.style.display = "block";
    }
  });
}


// quotes
const quotetURL = 'js/quotes.json';

fetch(quotetURL)
.then(function (response) {
    return response.json();
})
.then(function (jsonObject) {
    //console.table(jsonObject);

    const quotes = jsonObject['quotes'];
    let quote = quotes[Math.floor(Math.random()*quotes.length)];

    document.querySelector('#quote').innerHTML = `<em>${quote.quote}</em><br><span> -- ${quote.author}</span>`;
});


// current date
const today = new Date();
document.querySelector("#currentdate").textContent = today.toLocaleString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'});

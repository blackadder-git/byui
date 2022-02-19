const today = new Date();
document.querySelector("#currentdate").textContent = today.toLocaleString('default', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'});

const hambutton = document.querySelector('.ham');
const nav = document.querySelector('.navigation')

hambutton.addEventListener('click', () => { nav.classList.toggle("show"); }, false);

window.onresize = () => {if (window.innerWidth > 560) nav.classList.remove('show')};
if (today.getDay() == 5) {
    document.querySelector("#announcement").style.display = "block";
    document.querySelector("header").style.margin = '12em 0 0 0';
}

document.querySelector('.close').addEventListener('click', () => { 
    document.querySelector("#announcement").style.display = "none"; 
    document.querySelector("header").style.margin = '1em 0 0 0';
}, false);
/*
    Modified codepen to make the matrix responsive https://codepen.io/yaclive/pen/EayLYO 
*/
unlocked = 0;
const _collections = JSON.parse( localStorage.getItem( 'collections' ));
if ( _collections && _collections.includes( 'cracked' ) ) {
    cracked(_collections, ".collections");
}
const _error = localStorage.getItem( 'error' );
if ( _error && _error.includes( 'cracked' )) {
    cracked(_error, ".error");
}
const _hibernate = localStorage.getItem( 'hibernate' );
if ( _hibernate && _hibernate.includes( 'cracked' )) {
    cracked(_hibernate, ".hibernate");
}
const _json = localStorage.getItem( 'json' );
if ( _json && _json.includes( 'cracked' )) {
    cracked(_json, ".json");
}
const _junit = localStorage.getItem( 'junit' );
if ( _junit && _junit.includes( 'cracked' )) {
    cracked(_junit, ".junit");
}
const _servlets = localStorage.getItem( 'servlets' );
if ( _servlets && _servlets.includes( 'cracked' )) {
    cracked(_servlets, ".servlets");
}
const _threads = localStorage.getItem( 'threads' );
if ( _threads && _threads.includes( 'cracked' )) {
    cracked(_threads, ".threads");
}
const _uml = localStorage.getItem( 'uml' );
if ( _uml && _uml.includes( 'cracked' )) {
    cracked(_uml, ".uml");
}
const _usecase = localStorage.getItem( 'usecase' );
if ( _usecase && _usecase.includes( 'cracked' )) {
    cracked(_usecase, ".usecase");
}

function cracked( _topic, className) {
    unlocked++;
    // alert(`${className}, ${_topic.length - 1}`);
    let topic = document.querySelector( `${className}` );
    topic.classList.add( 'code' );
    // topic.innerHTML = _topic.length - 1;
    if (unlocked == 9) {
        document.querySelector( '.unlocked' ).style.display = 'block' ;
    }
}

// Initializing the canvas
let canvas = document.querySelector( 'canvas' ),
    ctx = canvas.getContext( '2d' );

// Setting up the letters
let letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
//let letters = 'CIT360Object Oriented Development';

letters = letters.split('');

// Setting the width and height of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Setting up the columns
let fontSize = 12,
    columns = canvas.width / fontSize;

// Setting up the drops
let drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

// Setting up the draw function
function draw() {

    ctx.fillStyle = 'rgba(0, 0, 0, .1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < drops.length; i++) {
        let text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillStyle = '#0f0';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
            drops[i] = 0;
        }
    }
}

// recalculate if the screen is resized
function reportWindowSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Setting up the columns
    columns = canvas.width / fontSize;

    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }    
}

// Loop the animation
setInterval(draw, 90);

window.onresize = reportWindowSize;
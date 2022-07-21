const DEBUG = false;

const _topic = 'junit';
const _key = '6';
key = document.querySelector(".key");

let topic = JSON.parse( localStorage.getItem( _topic ));

if ( topic == null ) {
    topic = [];
}
else {
    isUnlocked();
}

// add listeners for all the clues
const clues = document.querySelectorAll( '.clue' );
clues.forEach(clue => {
    clue.addEventListener('click', (e) => {
    
        const id = e.target.getAttribute('id');
        // alert( id );
        if ( !topic.includes( id )) {

            topic.push( id );
            
            key.innerHTML = parseInt( key.innerHTML ) + 1;

            if ( key.innerHTML == _key ) {
                topic.push('cracked');
            }

            localStorage.setItem( _topic, ( JSON.stringify( topic )));
        }
        else {
            // alert('duplicate');
        }
        isUnlocked();        
    });
});


// has this page been cracked ?
function isUnlocked() {
    if ( topic.includes("cracked") ) {
        key.innerHTML = _key;
        document.querySelector('.key').classList.add( 'correct' );
        alert( 'Congratulations, you cracked the code' );
    }
    else {
        key.innerHTML = topic.length;
    }
}


class Controller {
 
    /****************************************
     * constructor
     *****************************************/
    constructor() {
        this.openModalListener();
        this.closeModalListener();
    }

    // open modal dialog
    openModalListener() {
        if (DEBUG) console.log('open modal listener');

        /*
            add class of openModal to element
            add data-id to element
        */
        const modals = document.querySelectorAll('.openModal');

        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (DEBUG) console.log('show modal');
                let modalWindow = document.querySelector('#modal');
                const showModal = e.currentTarget.getAttribute('id');
                let h2 = document.querySelector('.modal-header h2');
                let modal = document.querySelector('.modal-content');
                let footer = document.querySelector('.modal-footer');

                switch( showModal ) {
                    case 'light':
                        h2.textContent = 'Light';

                        modal.textContent = `What conclusions can I make?`;

                        footer.textContent = `For years I have wanted to understand how to test a piece of code. I 
                        believe there is a freedom that comes when you know a change you make won't inadvertently 
                        break something you have already written. Knowing how to write unit tests is one of the
                        highlights of my learning thus far.`;
                    break;
                    case 'plant':
                        h2.textContent = 'Plant';

                        modal.textContent = `What stands out to me? What makes me wonder?`;

                        footer.textContent = `I realized that knowing technically how to write a unit test is
                        still not the same as writing a good test. Instead, it is only the first step. I have 
                        heard that some developers write their tests first and then the program. I have a hard
                        time visualizing this so I wonder how often it is actually is done. I have also thought a lot 
                        about how best to test a complex method; something that might require changing parts of the program
                        that exist outside the scope of the method being tested. I guess I could replicate a specific
                        condition before testing. Or that could be a sign that what I am trying to test needs to be broken
                        and/or reorganized. Also, maybe some high level parts of the code simply aren't testable.
                        Or is everything testable? At this point I don't have an answer.`;
                    break;
                    case 'chair':
                        h2.textContent = 'Chair';

                        modal.textContent = `What questions will I ask myself next time I'm working these types of problems?`;

                        footer.textContent = `The next time I am developing a program and specifically a function or
                        method, I will ask myself how can I test this. Ideally, I will want to have a meaningful test for
                        every part of the code to ensure that when I change one part, I don't break code in another.`;
                    break;                    
                    case 'screen':
                        h2.textContent = 'Screen';

                        modal.textContent = `What are the relationships between these two concepts?`;

                        footer.textContent = `Unit tests and methods/functions in any language go together like peanut butter
                        and jelly. I learned it's not as simple as changing the code when a test fails. Sometimes a test may 
                        need to be modified and improved in order to be a better test. Likewise, simply having and passing a test doesn't 
                        mean the code will work. Instead, the two need to support their overall intended use in the program.`;
                    break;
                    case 'bin':
                        h2.textContent = 'Bin';

                        modal.textContent = `How am I progressing as a learner?`;

                        footer.textContent = `As a learner, I realized that answering one question often raises 
                        several more. Learning feels like a never ending ocean tide. No matter how much I understand, there
                        will always be more questions. I accept and love the concept of life long learning. I heard this phrase often
                        as a BYU Pathway student. The idea is comforting and carries with it implied iteration.`;
                    break;
                    case 'folders':
                        h2.textContent = 'Binders';

                        modal.textContent = `Why is this idea important?`;

                        footer.textContent = `Being able to automate your testing opens the possibility of trying new things in a
                        program without the fear of breaking other areas. I imagine this would mostly apply to programs with 
                        larger codebases however I am just as interested in creating tests for smaller programs. In any 
                        case, being able to run tests and write good tests is good practice and makes better code for everyone.`;
                    break;
                 }

                document.querySelector("#modal").classList.add("is-visible");
            });
        });
    }

    // close modal dialog
    closeModalListener() {
        if (DEBUG) console.log('close modal');

        document.querySelector('.closeModal').addEventListener('click', (e) => {
            document.querySelector("#modal").classList.remove("is-visible");
        });
    }
}

const controller = new Controller();
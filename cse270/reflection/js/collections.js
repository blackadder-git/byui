const DEBUG = false;

const _topic = 'collections';
const _key = '9';
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
                    case 'lamp':
                        h2.textContent = 'Lamp';

                        modal.textContent = `Where the strategies and skills I used effective for this assignment?`;

                        footer.textContent = `To learn about collections, I began by searching online.  I read through
                        multiple tutorials but it wasn't until I read and reread the actual documentation that I began
                        to see a pattern in what each collection was good for e.g. sort order, duplication, access, etc.
                        
                        So yes, I think so. I still need to find a good use case for some of the collections, but I 
                        have a better understanding of what options I have to work with.`;
                    break;
                    case 'portrait':
                        h2.textContent = 'Portrait';

                        modal.textContent = `What can/should I do next?`;

                        footer.textContent = `I want to find a good way to use all the Java collections and write a
                        program for each. Unfortunately, like so many other things I would like to learn better, I
                        need to prioritize my time.`;
                    break;
                    case 'tea':
                        h2.textContent = 'Tea set';

                        modal.textContent = `How did my mindset affect how I approached my work?`;

                        footer.textContent = `As this was the first assignment, I really wanted to understand the topic.
                        My expectation coming into this course was that I'd learn to program Android apps and I felt
                        that knowing how to use collections well would be a good starting point. As a result, I was 
                        excited to learn and made an effort to read all the material, watch all the videos and begin 
                        the assignment early.`;
                    break;
                    case 'chandelier':
                        h2.textContent = 'Chandelier';

                        modal.textContent = `What have I learned about my strengths and my areas in need of improvement?`;

                        footer.textContent = `I have learned that my ability to ask the right question is even more
                        important than the ability to find an answer quickly. The answers are probably already there in 
                        some form. Whatever question I have about this or any other subject, it's more likely than not 
                        someone else has already asked and even solved the same problem. I also realized I need to get
                        better at asking Heavenly Father for help.`;
                    break;
                    case 'vase':
                        h2.textContent = 'Vase';

                        modal.textContent = `How can I best use my strengths to learn?`;

                        footer.textContent = `My greatest strength right now is knowing I can do hard things. I am reminded
                        of a story I read in the Friend, "I Can Do Hard Things". First I need to figure out what I don't
                        know. Then I compare that with what I do know to create a path to move forward. Asking good questions
                        is a skill along with patience and determination and hope that I can find and understand the answers.`;
                    break;
                    case 'books':
                        h2.textContent = 'Books';

                        modal.textContent = `How am I progressing as a learner?`;

                        footer.textContent = `As a learner, I am more able to recognize what I don't know. I feel like my 
                        critical thinking skills are improving with each class I take and I am better able to create a plan 
                        to move forward each time I face a problem.`;
                    break;
                    case 'fireplace':
                        h2.textContent = 'Fireplace';

                        modal.textContent = `Do I see patterns in what I did?`;

                        footer.textContent = `Java has many collections which are similar to many those I have seen and used in
                        C++, JavaScript, PHP, and Python. Learning to find similarities and differences made this assignment 
                        easier because I had something to work with. Also, I learned to see patterns in the Java collections
                        themselves including the way in which many added and removed items along with the iterators use to
                        loop each collection.`;
                    break;
                    case 'chair':
                        h2.textContent = 'Arm chair';

                        modal.textContent = `Why is this idea important?`;

                        footer.textContent = `Just like real world, being able to organize and access information
                        makes it more manageable. I have often written programs that collect and store data. Figuring 
                        out how to do that in Java is an essential step towards learning the language and ultimately
                        being able to write Java programs.`;
                    break;
                    case 'sofa':
                        h2.textContent = 'Victorian sofa';

                        modal.textContent = `How can my learning environment be improved?`;

                        footer.textContent = `The area where I study at home is close to bedrooms. I have done
                        my best to isolate myself from the rest of my family but it is still hard to do this
                        fully. If I could somehow create a door, it would be a good first step.`;
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
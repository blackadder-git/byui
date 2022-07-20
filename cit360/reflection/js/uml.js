const DEBUG = false;

const _topic = 'uml';
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
                    case 'art':
                        h2.textContent = 'Framed art';

                        modal.textContent = `What follow-up questions do I have? `;

                        footer.textContent = `I have a hard time seeing the value of a sequence diagram for the simple
                        reason that there are so many moving parts in a program. I find it difficult to accurately
                        show all the possibilities. And using too many if/else representations or loops can quickly 
                        make the diagram difficult to read. But overall, I would like to know what value someone who
                        didn't develop the program gets from them beyond an overall view.`;
                    break;
                    case 'bottle':
                        h2.textContent = 'Bottle';

                        modal.textContent = `What is confusing about this topic?`;

                        footer.textContent = `How do I represent a branch in response or a loop within a loop within a loop.
                        Also, is each interaction meant to written up as its own diagram? If so, I would hate to be the one to 
                        update these any time the codebase is modified.`;
                    break;
                    case 'bottles':
                        h2.textContent = 'Bottles';

                        modal.textContent = `Do I see patterns in what I did?`;

                        footer.textContent = `I drew parallels between UML diagrams and Use Case documents. Both, at least in 
                        my case, began with a user. However, I don't believe this is necessarily true or required. For me it 
                        was easier to think of interactions in terms of what the user would see however the diagram does show
                        many behind the curtain events such as writing to the file system and requesting resources from the
                        internet.`;
                    break;
                    case 'skylight':
                        h2.textContent = 'Skylight';

                        modal.textContent = `What follow-up questions do I have? `;

                        footer.textContent = `I would like to know who often UML Sequence Diagrams are used and in what
                        context. I would also like to know how to better represent branches in a sequence. `;
                    break;
                    case 'tv':
                        h2.textContent = 'TV';

                        modal.textContent = `What strategy did I use to solve this problem that was helpful?`;

                        footer.textContent = `As with many other document related assignments, I began by reading the instructions, watching
                        the course videos and then going to Google for examples to learn what made an industry standard diagram.
                        In the end, I created something I could present to a manager and feel comfortable describing what
                        each part of the diagram intended to relay.`;
                    break;
                    case 'suitcase':
                        h2.textContent = 'Suitcase';

                        modal.textContent = `What are the relationships between Use Case documents and UML Sequence Diagrams?`;

                        footer.textContent = `Both seem to target a non-technical audience. Both seem to describe a 
                        particular interaction of a program. And both seem as though they would be difficult to maintain. I
                        believe that while the UML Sequence Diagram is easier to read, the Use Case Document is actually easier
                        to write.`;
                    break;
                    case 'chair':
                        h2.textContent = 'Chair';

                        modal.textContent = `Which parts or terms are new to me, and which parts do I recognize?`;

                        footer.textContent = `All the sequence diagram notation was new to me. I had to learn how to structure a 
                        proper diagram (left to right with time flowing from top to bottom). I learned to use dotted notation for 
                        return messages and how to trap loops inside of boxes. I would like to have found something a bit more 
                        standardized beyond the many examples I looked over. In the end however, I gained an appreciation for 
                        diagrams that got into the detail vs those that didn't.`;
                    break;
                    case 'sofa':
                        h2.textContent = 'Broken couch';

                        modal.textContent = `What can/should I do next?`;

                        footer.textContent = `Class is over, and while I have not learned everything I wanted to learn, I did learn
                        more. I have several projects I would like to add to my portfolio and even more I would like to build for 
                        practice. As part of my independent learning, I intend to document the little things I learned. For example, 
                        how to turn on auto imports in IntelliJ. Having a backed up repository of these details will give me peace of 
                        mind and ensure that they do not get lost among my documents.`;
                    break;
                    case 'shelf':
                        h2.textContent = 'Shelf';

                        modal.textContent = `How can my learning environment be improved?`;

                        footer.textContent = `While my mobile office has proven to be a saving grace this semester, it would be
                        nice to have something more permanent. Once we do a bit of spring cleaning, I may look into getting the
                        attic or a closet. In addition, my computer began to shut down unexpectedly during the semester. It is a 
                        terrible feeling not having a backup so I would like to invest in some better equipment.`;
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
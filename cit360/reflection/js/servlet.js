const DEBUG = false;

const _topic = 'servlets';
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
                    case 'mirror':
                        h2.textContent = 'Mirror';

                        modal.textContent = `What is confusing about this topic?`;

                        footer.textContent = `Servlets seem to be a dated technology. I say that because I don't really
                        understand how they work. But it seems to me there may be more efficient technologies to serve
                        up web pages. Certainly there are easier ways. I was happy to get my assignment working however
                        I would hate to trouble shoot a servlet.`;
                    break;
                    case 'lamp':
                        h2.textContent = 'Lamp';

                        modal.textContent = `What follow-up questions do I have?`;

                        footer.textContent = `I would like to better understand where a servlet lives on the server.
                        I understand that technology like Tomcat and JBoss can be used but I don't really understand
                        how they fit in with the whole server architecture. I suppose I need to think not of a server
                        as a physical machine but rather as individual applications that handle specific requests based
                        on assigned ports.`;
                    break;
                    case 'footstool':
                        h2.textContent = 'Footstool';

                        modal.textContent = `Why is this idea important?`;

                        footer.textContent = `Understanding how and when to use servlets will benefit me as a developer.
                        Perhaps unfairly, and due to the error messages that are shown when a servlet fails, I associate
                        complexity of implementation and lack of back button functionality with servlets. Thus far, they are
                        not my favorite.`;
                    break;
                    case 'pillows':
                        h2.textContent = 'Pillows';

                        modal.textContent = `What have I learned about my strengths and my areas in need of improvement?`;

                        footer.textContent = `This was a technology I knew nothing about and I was able to not only get
                        my project working, I was also able to experiment with a few things. It felt sort of like taking
                        the next step after "Hello World". Overall, I learned when I spend the time and put in the work, I
                        am able to accomplish more than I would otherwise. Likewise, I need to remember that just because I
                        have done something once doesn't mean I am guaranteed to do it again what with different versions,
                        development environments and other variations.`;
                    break;
                    case 'curtains':
                        h2.textContent = 'Curtains';

                        modal.textContent = `What strategy did I use to solve this problem that was helpful?`;

                        footer.textContent = `Because this was a technology I knew very little about, I reached out
                        to my group for support. I also did a lot of searching on line. As I worked, I also tested
                        frequently making sure that I knew what I had just changed in case something broke I was 
                        quickly able to isolate and fix the problem. Good advice to start from a known position.`;
                    break;
                    case 'vase':
                        h2.textContent = 'Vase';

                        modal.textContent = `How did my mindset affect how I approached my work?`;
 
                        footer.textContent = `Knowing that I didn't know this topic meant that I came to my team
                        meeting with questions. This was easy as I started my project early. I also reviewed our presentation
                        several times. In the end, I was happy to create a working assignment.`;
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
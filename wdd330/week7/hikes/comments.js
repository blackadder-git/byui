export default class Comments {

    addCommentListener(hike) {
        const commentButton = document.querySelector(`.commentButton`);
        console.log(`#comment${hike.name}`);

        commentButton.addEventListener('click', e => {
            const comment = document.querySelector('#commentText').value;
            this.addComment(hike, comment);
            console.log(comment);
          });

          /*
.closest(selectors)          
          */

    }

    addComment(hike, comment) {

        const newComment = {
            name: hike.name,
            date: new Date(),
            content: comment
          };

          console.log(newComment);
    }

    getAllComments() {

    }

    getComments() {
        const comments = {}
        return Comments;
    }


    renderCommentList() {

    }

    filterCommentsByName() {

    }

}
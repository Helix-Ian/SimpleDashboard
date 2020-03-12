import React from 'react';

const CommentNavButtons = (props) => {

    /**
     * Focus a comment
     */
    const drawFocus = (comment) => {
        props.pageSwitchCallback(comment.page);
        props.commentCallback(false, {id: comment.id});
        comment.ref.current.focus();
        comment.ref.current.scrollIntoView({behavior:'smooth', block:'center'});
    }

    /**
     * Fired whenever the Back button is clicked
     */
    const onBackButtonClick = () => {
        // starting from the last focused, find the previous available comment box and focus it
        for (var i = props.lastActiveCommentId - 1; i >= 0; i--) {
            if (props.comments[i]) {
                drawFocus(props.comments[i]);
                break;
            }
        }
    }

    /**
     * Fired whenever the Next button is clicked
     */
    const onNextButtonClick = () => {
        // starting from the last focused, find the next available comment box and focus it
        for (var i = props.lastActiveCommentId + 1; i < props.comments.length; i++) {
            if (props.comments[i]) {
                drawFocus(props.comments[i]);
                break;
            }
        }
    }

    return (
        <div>
            <button onClick={onBackButtonClick}>Back</button>
            <button onClick={onNextButtonClick}>Next</button>
        </div>
    )
}

export default CommentNavButtons;
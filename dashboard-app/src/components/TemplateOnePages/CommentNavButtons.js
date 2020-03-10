import React from 'react';

const CommentNavButtons = (props) => {

    /**
     * Focus an element
     */
    const drawFocus = (ref) => {
        ref.current.focus();
        ref.current.scrollIntoView({behavior:'smooth', block:'center'});
    }

    /**
     * Fired whenever the Back button is clicked
     */
    const onBackButtonClick = () => {
        // starting from the last focused, find the previous available comment box and focus it
        for (var i = props.lastActiveCommentId - 1; i >= 0; i--) {
            if (props.commentRefs[i]) {
                drawFocus(props.commentRefs[i]);
                break;
            }
        }
    }

    /**
     * Fired whenever the Next button is clicked
     */
    const onNextButtonClick = () => {
        // starting from the last focused, find the next available comment box and focus it
        for (var i = props.lastActiveCommentId + 1; i < props.commentRefs.length; i++) {
            if (props.commentRefs[i]) {
                drawFocus(props.commentRefs[i]);
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
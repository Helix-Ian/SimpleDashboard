import React from 'react';

const NextCommentButton = (props) => {

    const onButtonClick = () => {
        for (var i = 0; i < props.commentRefs.length; i++) {
            var ref = props.commentRefs[i];
            if (ref.current.value.length === 0) {
                ref.current.focus();
                ref.current.scrollIntoView({behavior:'smooth', block:'center'});
                break;
            }
        }
    }

    return (
        <button onClick={onButtonClick}>Next</button>
    )
}

export default NextCommentButton;
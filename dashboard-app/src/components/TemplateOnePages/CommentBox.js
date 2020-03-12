import React, { useRef, useEffect } from 'react';

const CommentBox = (props) => {
    var textRef = useRef();
    var boxId = props.id;
    var pageNumber = props.pageNumber;

    /**
     * Fired when the text area is focused
     */
    const onFocus = () => {
        props.commentCallback(false, {id: boxId});
    }

    /**
     * Fired when the text area is removed from focus
     */
    const onBlur = () => {
        props.commentCallback(false, {id: boxId});
    }

    // initialize only
    useEffect(() => {
        props.commentCallback(true, {ref: textRef, id: boxId, page: pageNumber});
    }, []);

    return (
        <div>
            <textarea ref={textRef} onFocus={onFocus} onBlur={onBlur} placeholder={"Comment..."} rows={3} style={{resize: 'none', width: '100%'}}></textarea>
        </div>
    )
}

export default CommentBox;
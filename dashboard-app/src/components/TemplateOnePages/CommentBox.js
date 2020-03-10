import React, { useRef } from 'react';

const CommentBox = (props) => {

    const onChange = function(e) {
        var val = e.target.value;
    }

    var textRef = useRef();
    props.commentRef(textRef);

    return (
        <div>
            <textarea ref={textRef} onChange={onChange} placeholder={"Comment..."} rows={3} style={{resize: 'none', width: '100%'}}></textarea>
        </div>
    )
}

export default CommentBox;
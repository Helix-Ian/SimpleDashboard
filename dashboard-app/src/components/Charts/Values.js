import React from 'react';

const Values = (props) => {
    
    var content = props.info.Content;

    function decodeHTML(str) {
        var txt = document.createElement('textarea');
        txt.innerHTML = str;
        return txt.value;
    }

    return (
        <div>
            <div dangerouslySetInnerHTML={{__html: decodeHTML(content)}} />
        </div>
    )
};

export default Values;
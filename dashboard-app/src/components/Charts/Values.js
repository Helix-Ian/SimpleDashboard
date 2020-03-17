import React from 'react';

const Values = (props) => {
    
    var content = props.info.Content;

    /**
     * Decodes an html-escaped string into its raw form
     * @param {string} str the escaped string to decode
     * @returns {string} the decoded html
     */
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
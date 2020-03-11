import React from 'react';
//import { Link } from 'react-router-dom';
import '../../App.css';
import CommentNavButtons from './CommentNavButtons';
import DoneButton from './DoneButton';

const InnerObj = (props) => {
    var content = props.content
    var depth = props.depth

    if (!content) {
        return null
    }

    return (
        <div>
            <div>            
                {content.map((innerContent, i) =>
                  <div key={innerContent.Access + "_" + depth + "_" + i} onClick={() => props.refArray[i].current.scrollIntoView({behavior:'smooth'})}>
                    <div className={"TOCRow + ContentStyle_" + depth}>
                        <div className="TOCColumnLeft">{innerContent.Title}</div>
                        <div className="TOCColumnRight">{depth}</div>
                    </div>
                    <InnerObj content={innerContent.Sub} depth={depth+1} refArray={props.refArray}/>
                </div>
                )}
            </div>
        </div>
    )
}

const TableOfContents = (props) => {
    return(
    <div>
        <InnerObj content={props.tocJson} refArray={props.refArray} depth={0}/>
        <CommentNavButtons commentRefs={props.commentRefs} lastActiveCommentId={props.lastActiveCommentId} />
        <DoneButton commentRefs={props.commentRefs} />
    </div>
    )
}

export default TableOfContents;


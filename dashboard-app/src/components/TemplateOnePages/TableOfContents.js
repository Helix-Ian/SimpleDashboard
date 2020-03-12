import React from 'react';
//import { Link } from 'react-router-dom';
import '../../App.css';
import CommentNavButtons from './CommentNavButtons';
import DoneButton from './DoneButton';
import PageDisplayButtons from './PageDisplayButtons';

const InnerObj = (props) => {
    var content = props.content
    var depth = props.depth
    // left undefined for first layer, which will generate based off i in the map and passed to each child
    var pageNum = props.pageNum;

    if (!content) {
        return null
    }

    return (
        <div>
            <div>            
                {content.map((innerContent, i) =>
                  <div key={innerContent.Access + "_" + depth + "_" + i} onClick={() => {props.refArray[i].current.scrollIntoView({behavior:'smooth'}); props.pageSwitchCallback(pageNum ? pageNum : (i + 1));}}>
                    <div className={"TOCRow + ContentStyle_" + depth}>
                        <div className="TOCColumnLeft">{innerContent.Title}</div>
                        <div className="TOCColumnRight">{pageNum ? pageNum : (i + 1)}</div>
                    </div>
                    <InnerObj content={innerContent.Sub} depth={depth+1} refArray={props.refArray} pageNum={pageNum ? pageNum : (i + 1)} pageSwitchCallback={props.pageSwitchCallback}/>
                </div>
                )}
            </div>
        </div>
    )
}

const TableOfContents = (props) => {
    return(
    <div>
        <PageDisplayButtons viewModeCallback={props.viewModeCallback} />
        <InnerObj content={props.tocJson} refArray={props.refArray} depth={0} pageSwitchCallback={props.pageSwitchCallback}/>
        <CommentNavButtons commentCallback={props.commentCallback} pageSwitchCallback={props.pageSwitchCallback} comments={props.comments} lastActiveCommentId={props.lastActiveCommentId} />
        <DoneButton comments={props.comments} />
    </div>
    )
}

export default TableOfContents;


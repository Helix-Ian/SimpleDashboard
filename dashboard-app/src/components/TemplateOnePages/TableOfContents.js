import React from 'react';
//import { Link } from 'react-router-dom';
import '../../App.css';
import CommentNavButtons from './CommentNavButtons';
import DoneButton from './DoneButton';
import PageDisplayButtons from './PageDisplayButtons';

const ToCRow = (props) => {
    var content = props.content;
    var depth = props.depth
    var pageNum = props.pageNum;
    var sub = props.sub;

    return (
        <div>
            <div onClick={() => {props.refArray[pageNum - 1].current.scrollIntoView({behavior:'smooth'}); props.pageSwitchCallback(pageNum);}}>
                <div className={"TOCRow + ContentStyle_" + depth}>
                    <div className="TOCColumnLeft">{content.Title}</div>
                    <div className="TOCColumnRight">{pageNum}</div>
                </div>
            </div>
            {sub ? sub.map((subObj, i) =>
                <ToCRow key={i} content={subObj} refArray={props.refArray} depth={depth + 1} pageSwitchCallback={props.pageSwitchCallback} pageNum={pageNum} sub={subObj.Sub}></ToCRow>
             ) : undefined}
        </div>
    )
}

const TableOfContents = (props) => {
    if (props.tocJson) {
        var tocRows = [];
        var pageNumber = 1;
        for (var i = 0; i < props.tocJson.length; i++) {
            var currentObj = props.tocJson[i];
            tocRows.push(<ToCRow key={pageNumber} content={currentObj} refArray={props.refArray} depth={0} pageSwitchCallback={props.pageSwitchCallback} pageNum={pageNumber}/>);
            pageNumber += 1;

            if (currentObj.Sub) {
                for (var j = 0; j < currentObj.Sub.length; j++) {
                    var childObj = currentObj.Sub[j];
                    tocRows.push(<ToCRow key={pageNumber} content={childObj} refArray={props.refArray} depth={1} pageSwitchCallback={props.pageSwitchCallback} pageNum={pageNumber} sub={childObj.Sub}></ToCRow>);
                    pageNumber += 1;
                }
            }
        }
    }

    return(
    <div>
        <PageDisplayButtons viewModeCallback={props.viewModeCallback} />
        <div className="TOCRowsContainer">
            {tocRows}
        </div>
        <CommentNavButtons commentCallback={props.commentCallback} pageSwitchCallback={props.pageSwitchCallback} comments={props.comments} lastActiveCommentId={props.lastActiveCommentId} />
        <DoneButton comments={props.comments} />
    </div>
    )
}

export default TableOfContents;


import React from 'react';
//import { Link } from 'react-router-dom';
import '../../App.css';

const InnerObj = (props) => {
    var content = props.content
    var depth = props.depth

    if (!content) {
        return null
    }
    return (
        <div>
            <div>            
                {content.map(innerContent =>
                <div>
                    <div className={"TOCRow + ContentStyle_" + depth}>
                        <div className="TOCColumnLeft"  key={innerContent.Access} onClick={e => {props.onClick(e, innerContent.Access)}}>{innerContent.Title}</div>
                        <div className="TOCColumnRight">{depth}</div>
                    </div>
                    <InnerObj content={innerContent.Sub} onClick={e => {props.onClick(e, innerContent.Access)}} depth={depth+1}/>
                </div>
                )}
            </div>
        </div>
    )
}

const TableOfContents = (props) => {

    return(<InnerObj content={props.tocJson} onClick={props.onClick} depth={0}/>)
}

export default TableOfContents;
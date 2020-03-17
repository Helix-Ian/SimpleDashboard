import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import '../../App.css';
import CommentNavButtons from './CommentNavButtons';
import DoneButton from './DoneButton';
import PageDisplayButtons from './PageDisplayButtons';


class TableOfContents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentSelections : []
        }
        this.pageNumber = 0
    }
    
     /**
     * Toggles selected items when clicked in the ToC dropdown
     * @param {Obj} content This is the entire content object. 
     * @param {Number} Depth Determines the index of the array in which the content will be placed/removed. Used to slice end off of array based on where user clicks
     */
    handleSelection(content, depth) {
        var selectionArray = this.state.currentSelections
        if (selectionArray[depth] == content) {
            selectionArray.length = depth
        } else {
            selectionArray[depth] = content
            selectionArray.length = depth + 1
        }
        this.setState({currentSelections:selectionArray})
    }

    /**
     * Recursive Function to create all the ToC Rows without nesting Divs
     * @param {Map} rowMap The items that will be needed to create the row
     * @param {List of ToCRows} tocRows list of the rows that we have collected recursively
     * @param {parentObj} parentObj parent object (if it exists) of the object we are currently on
     */
    createToCRows(rowMap, tocRows, parentObj) {
        if (rowMap.tocJson) {
            // go through the top-level objects
            for (var i = 0; i < rowMap.tocJson.length; i++) {
                var currentObj = rowMap.tocJson[i];
                var numberOfChildren = 0
                if (currentObj.Sub) {
                    numberOfChildren = currentObj.Sub.length
                }
                if (rowMap.depth <= 1) {
                    this.pageNumber += 1
                }
                tocRows.push(<ToCRow key={currentObj.Title + "_" + this.pageNumber} parent={parentObj} content={currentObj} refArray={rowMap.refArray} depth={rowMap.depth} pageSwitchCallback={rowMap.pageSwitchCallback} pageNumber={this.pageNumber} handleSelection={this.handleSelection.bind(this)} numberOfChildren={numberOfChildren} currentSelections={this.state.currentSelections}/>);
                var nextProps = {"tocJson" : currentObj.Sub, "refArray" : rowMap.refArray, depth : rowMap.depth+1, pageSwitchCallback : rowMap.pageSwitchCallback}
                this.createToCRows(nextProps, tocRows, currentObj)
            }
        }
        return tocRows
    }

    render() {
        this.pageNumber = 0
        var recurseFuncMap = {"tocJson" : this.props.tocJson, "refArray" : this.props.refArray, depth : 0, pageSwitchCallback : this.props.pageSwitchCallback}
        var tocRows = this.createToCRows(recurseFuncMap, [], null);

        var filteredRows = tocRows.filter((row) => row.props.depth == 0 || row.props.parent == this.state.currentSelections[row.props.depth-1])


        return(
        <div>
            <PageDisplayButtons viewModeCallback={this.props.viewModeCallback} />
            <div className="TOCRowsContainer">
                {filteredRows}
            </div>
            <CommentNavButtons commentCallback={this.props.commentCallback} comments={this.props.comments} lastActiveCommentId={this.props.lastActiveCommentId} />
            <DoneButton comments={this.props.comments} />
        </div>
        )
    }
}


const ToCRow = (props) => {
    var content = props.content;
    var depth = props.depth
    var pageNum = props.pageNumber;
    var currentSelections = props.currentSelections

    var dropdown = ""
    if (props.numberOfChildren > 0) {
        if (currentSelections[depth] == content) {
            dropdown = "▿"
        } else {
            dropdown = "▹"
        }
    }

    

    return (
        <div>
            <div onClick={() => {props.refArray[pageNum - 1].current.scrollIntoView({behavior:'smooth'}); props.pageSwitchCallback(pageNum); props.handleSelection(content, depth)}}>
                <div className={"TOCRow + ContentStyle_" + depth}>
                    <div className="TOCColumnLeft">{content.Title} {dropdown}</div>
                    <div className="TOCColumnRight">{pageNum}</div>
                </div>
            </div>
        </div>
    )
}

export default TableOfContents;


import React from 'react';
//import { Link } from 'react-router-dom';
import '../../App.css';
import Header from './Header';
import Footer from './Footer';
import CommentBox from './CommentBox';
import SummaryTable from '../Charts/SummaryTable';
import GraphTable from '../Charts/GraphTable';
import DonutChart from '../Charts/DonutChart';
import SimpleTable from '../Charts/SimpleTable';
import BarChart from '../Charts/BarChart';
import AreaChart from '../Charts/AreaChart';
import PieChart from '../Charts/PieChart';
import LineGraph from '../Charts/LineGraph';
import Values from '../Charts/Values';
import Text from '../Charts/Text';




//Create Info Text Here
const InformationText = function() {
    return <div className="TestCompInfo">InformationTextHere</div>
}

const PlaceholderText = function(props) {
    return <div className="TestCompInfo">Type: {props.type ? props.type : "undefined"}, Access: {props.access}</div>
}

//Handler that will triage the creation of the display type we are looking for
//Inputs:
//--- props.type - "PieChart", "InformationText"
const InformationSection = (props) => {
    var object = props.obj.object;
    var type = (object ? object.DisplayType : undefined);
    switch (type) {
        case "Pie":
            return <PieChart info={object}/>
        case "Line":
            return <LineGraph info={object}/>
        case "InformationText":
            return <InformationText/>
        case "SummTable":
            return <SummaryTable info={object} />
        case "GraphTable":
            return <GraphTable info={object}/>
        case "Donut":
            return <DonutChart info={object} />
        case "Table":
            return <SimpleTable info={object}/>
        case "Bar":
            return <BarChart info={object} />
        case "Area":
            return <AreaChart info={object} />
        case "Values":
            return <Values info={object} />
        case "Text":
            return <Text info={object} />
        default:
            return <PlaceholderText type={type} access={props.obj.access}/>
    }
}

//Read in prop for this page based on what is passed from API
const ReportPage = (props) => {
    var pageJson = props.pageJson
    var title = pageJson.title
    var pageNumber = pageJson.pageNumber
    var totalPageNumber = pageJson.totalPageNumber
    var objectList = pageJson.objectList

    /**
     * Check if a section should have a comment box
     * @param {{}} obj The information section object from props
     * @returns {boolean} true if the section has a comment box, false otherwise
     */
    const hasCommentBox = (obj) => {
        return obj.object && obj.object.DisplayType === "Text";
    }
    
    return(
    <div className="ReportPageOuterStyle">
        <Header title={title}/>
        {objectList.map((obj, i) =>
            <div key={i}>
                <InformationSection obj={obj}/>
                {hasCommentBox(obj) ? <CommentBox commentCallback={props.commentCallback} id={pageNumber * 100 + i} pageNumber={pageNumber} /> : undefined}
            </div>
        )}
        <Footer pageNumber={pageNumber} totalPageNumber={totalPageNumber}/>
    </div>
    )

}

export default ReportPage;
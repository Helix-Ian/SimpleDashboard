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
        case "LineGraph":
            return <LineGraph info={object}/>
        case "InformationText":
            return <InformationText/>
        case "SummaryTable":
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
        default:
            return <PlaceholderText type={type} access={props.obj.access}/>
    }
}

//Read in prop for this page based on what is passed from API
const ReportPage = (props) => {
    var pageJson = props.pageJson
    var title = pageJson.title
    var pageNumber = pageJson.pageNumber
    var objectList = pageJson.objectList 
    
    return(
    <div className="ReportPageOuterStyle">
        <Header title={title}/>
        <CommentBox commentCallback={props.commentCallback} id={pageNumber} pageNumber={pageNumber} />
        {objectList.map(obj =>
            <InformationSection key={obj.access + "_" + pageNumber + "_" + obj.depth} obj={obj}/>
        )}
        <Footer pageNumber={pageNumber}/>
    </div>
    )

}

export default ReportPage;
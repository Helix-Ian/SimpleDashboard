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
  return <div className='TestCompInfo'>InformationTextHere</div>;
};

//Handler that will triage the creation of the display type we are looking for
//Inputs:
//--- props.type - "PieChart", "InformationText"
const InformationSection = props => {
  var type = props.info.DisplayType;
  switch (type) {
    case 'PieChart':
      return <PieChart info={props.info} />;
    case 'LineGraph':
      return <LineGraph info={props.info} />;
    case 'InformationText':
      return <InformationText />;
    case 'SummaryTable':
      return <SummaryTable info={props.info} />;
    case 'ChartTable':
      return <GraphTable info={props.info} />;
    case 'DonutChart':
      return <DonutChart info={props.info} />;
    case 'Table':
      return <SimpleTable info={props.info} />;
    case 'BarChart':
      return <BarChart info={props.info} />;
    case 'AreaChart':
      return <AreaChart info={props.info} />;
    default:
      return <InformationText />;
  }
};

//Read in prop for this page based on what is passed from API
const ReportPage = props => {
  var pageJson = props.pageJson;
  var title = pageJson.title;
  var pageNumber = pageJson.pageNumber;
  var objectList = pageJson.objectList;

  return (
    <div className='ReportPageOuterStyle'>
      <Header title={title} />
      <CommentBox commentCallback={props.commentCallback} id={pageNumber} />
      {objectList.map(obj => (
        // Added a 'dataid' prop to pass to chart components ('key' is not accessible) so that the divs can have unique IDs
        <InformationSection key={obj.Access + '_' + pageNumber} info={obj} />
      ))}
      <Footer pageJson={pageJson} />
    </div>
  );
};

export default ReportPage;

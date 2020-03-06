import React from 'react';
//import { Link } from 'react-router-dom';
import '../../App.css';
import Header from './Header';
import Footer from './Footer';
import SummaryTable from '../Charts/SummaryTable';
import PieChart from '../Charts/PieChart';
import GraphTable from '../Charts/GraphTable';
import DonutChart from '../Charts/DonutChart';
import SimpleTable from '../Charts/SimpleTable';

//Create PieChart Here
// const PieChart = function() {
//   return <div className='TestComponent'>Pie Chart here</div>;
// };

//Create Info Text Here
const InformationText = function() {
  return <div className='TestCompInfo'>InformationTextHere</div>;
};

//Handler that will triage the creation of the display type we are looking for
//Inputs:
//--- props.type - "PieChart", "InformationText"
const InformationSection = (props) => {
    var type = props.type;
    switch (type) {
        case "PieChart":
            return <PieChart chartName={props.dataid} />
        case "InformationText":
            return <InformationText/>
        case "SummaryTable":
            return <SummaryTable tableName={props.dataid} />
        case "GraphTable":
            return <GraphTable tableName={props.dataid} />
        case "DonutChart":
            return <DonutChart chartName={props.dataid} />
        case "SimpleTable":
            return <SimpleTable tableName={props.dataid} />
        default:
            return <InformationText/>
    }
}

//Read in prop for this page based on what is passed from API
const ReportPage = props => {
  var pageJson = props.pageJson;
  var title = pageJson.title;
  var pageNumber = pageJson.pageNumber;
  var objectList = pageJson.objectList;

  return (
    <div>
      <Header title={title} />
      {objectList.map(obj => (
        // Added a 'dataid' prop to pass to chart components ('key' is not accessible) so that the divs can have unique IDs
        <InformationSection key={obj.id} dataid={obj.id} type={obj.type} />
      ))}
      <Footer pageNumber={pageNumber} />
    </div>
  );
};

export default ReportPage;

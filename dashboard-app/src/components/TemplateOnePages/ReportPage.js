import React, { useEffect } from 'react';
//import { Link } from 'react-router-dom';
import '../../App.css';
import Header from './Header';
import Footer from './Footer';

//Create PieChart Here
const PieChart = function() {
    return <div className="TestComponent">Pie Chart here</div>
}

//Create Info Text Here
const InformationText = function() {
    return <div className="TestCompInfo">InformationTextHere</div>
}

const SummaryTable = (props) => {

    const renderTable = () => {
        var data = new window.google.visualization.DataTable();
        data.addColumn('string', 'Application');
        data.addColumn('string', 'User (or IP)');
        data.addColumn('number', 'Session');
        data.addColumn('number', '% of Subtotal');
        
        data.addRows([
            ['JonDo', '192.168.4.14', 9224, 100.00],
            ['Proxy.HTTP', '222.186.19.221', 146, 37.15]
        ]);

        var options = {

        };

        var table = new window.google.visualization.Table(document.getElementById(props.tableName));
        table.draw(data, options);
    }
    
    useEffect(() => {
        // delays loading until charts api is loaded
        if (!window.isGoogleChartsLoaded) {
            window.googleChartsLoadFunctions.push(renderTable);
            return;
        }

        renderTable();
    })

    return (
        <div id={props.tableName}></div>
    );
}

//Handler that will triage the creation of the display type we are looking for
//Inputs:
//--- props.type - "PieChart", "InformationText"
const InformationSection = (props) => {
    var type = props.type;
    switch (type) {
        case "PieChart":
            return <PieChart/>
        case "InformationText":
            return <InformationText/>
        case "SummaryTable":
            return <SummaryTable tableName={props.dataid} />
        default:
            return <InformationText/>
    }
}

//Read in prop for this page based on what is passed from API
const ReportPage = (props) => {
    var pageJson = props.pageJson
    var title = pageJson.title
    var pageNumber = pageJson.pageNumber
    var objectList = pageJson.objectList
    
    return(
    <div>
        <Header title={title}/>
        {objectList.map(obj =>
            // Added a 'dataid' prop to pass to chart components ('key' is not accessable) so that the divs can have unique IDs
            <InformationSection key={obj.id} dataid={obj.id} type={obj.type}/>
        )}
        <Footer pageNumber={pageNumber}/>
    </div>
    )

}

export default ReportPage;
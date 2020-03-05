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

    // temporary, will replace with json handled through props
    var dataObjects = [
        {name: "JonDo", data: [["192.168.4.14", 9224]]},
        {name: "Proxy.HTTP", data: [["192.168.5.1", 26], ["192.168.5.2", 9], ["192.168.5.3", 2]]}
    ];

    const renderTable = () => {
        var data = new window.google.visualization.DataTable();
        // TODO replace column generation with columns given by data fields
        data.addColumn('string', 'Application');
        data.addColumn('string', 'User (or IP)');
        data.addColumn('number', 'Session');
        data.addColumn('number', '% of Subtotal');
        
        for (var dataObject of dataObjects) {
            var objectData = dataObject.data;
            var objectValues = objectData.map((cur) => cur[1]);

            var total = objectValues.reduce((prev, cur) => prev + cur);
            var percentages = objectValues.map((cur) => (cur / total) * 100);

            var firstRow = objectData[0];
            data.addRow([dataObject.name, firstRow[0], firstRow[1], percentages[0]]);
            for (var i = 1; i < objectData.length; i++) {
                data.addRow(['', objectData[i][0], objectData[i][1], percentages[i]]);
            }
            var boldIndex = data.addRow(['', 'Subtotal', total, 100]);
            data.setProperty(boldIndex, 1, 'style', 'font-weight: bold;');
            data.setProperty(boldIndex, 2, 'style', 'font-weight: bold;');
            data.setProperty(boldIndex, 3, 'style', 'font-weight: bold;');
        }

        var percentFormat = new window.google.visualization.NumberFormat({suffix: '%'});
        percentFormat.format(data, 3);

        var options = {
            sort: 'disable',
            allowHtml: true
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
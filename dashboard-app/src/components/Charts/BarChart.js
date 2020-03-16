import React, { useEffect } from 'react';

/*
    Expecting Data to be a list of objects, each containing a string for the first column and a number for the second
*/
function BarChart(props) {

    var accessType = props.info.Access;

    var dataObjects = props.info.Data;
    var labels = props.info.Labels;

    const renderTable = () => {
        var data = new window.google.visualization.DataTable();

        // assuming col1 is always a String and col2 is always a Number
        data.addColumn('string', labels.col1);
        data.addColumn('number', labels.col2);

        // Add each row based on the data (assuming array of two values)
        for (var dataObject of dataObjects) {
            data.addRow([dataObject.col1, parseInt(dataObject.col2)]);
        }

        var options = {
            title: "Virus Timeline",
            sort: 'disable',
            allowHtml: true,
            legend: {
                position: 'none'
            }
        };

        var table = new window.google.visualization.ColumnChart(document.getElementById(accessType));
        table.draw(data, options);
        window.addEventListener('resize', renderTable, false);
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
        <div class='ChartDiv' id={accessType}></div>
    );
}

export default BarChart;
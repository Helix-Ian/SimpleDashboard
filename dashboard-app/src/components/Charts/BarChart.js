import React, { useEffect } from 'react';

/*
    Exact data format is unknown, but expecting nested arrays
*/
function BarChart(props) {

    var dataObjects = [['1/27/2020', 10], ['1/28/2020', 14], ['1/29/2020', 29], ['1/30/2020', 4], ['1/31/2020', 17], ['2/1/2020', 3], ['2/2/2020', 15]];

    const renderTable = () => {
        var data = new window.google.visualization.DataTable();
        // Static columns for now, but the names don't necessarily matter as there isn't a legend
        data.addColumn('string', 'Date');
        data.addColumn('number', 'Amount');

        // Add each row based on the data (assuming array of two values)
        for (var dataObject of dataObjects) {
            data.addRow(dataObject);
        }

        var options = {
            title: "Virus Timeline",
            sort: 'disable',
            allowHtml: true,
            legend: {
                position: 'none'
            }
        };

        var table = new window.google.visualization.ColumnChart(document.getElementById(props.chartName));
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
        <div id={props.chartName}></div>
    );
}

export default BarChart;
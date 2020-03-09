import React, { useEffect } from 'react';

function DonutChart(props) {

    var accessType = props.info.Access;

    var dataObjects = [['Web.Client', 36.14], ['Network.Service', 36.08], ['Collaboration', 10.48], ['Business', 7.64],
                       ['Email', 6.61], ['Remote.Access', 1.71], ['Storage.Backup', 1.16], ['Update', 0.11],
                       ['Mobile', 0.04], ['Proxy', 0.01], ['Others', 0.01]];

    const renderTable = () => {
        var data = new window.google.visualization.DataTable();
        data.addColumn('string', 'App Category');
        data.addColumn('number', 'Percentage');
        
        var total = dataObjects.map((cur) => cur[1]).reduce((prev, cur) => prev + cur);

        for (var dataObject of dataObjects) {
            var rowIndex = data.addRow(dataObject);
            var percentage = dataObject[1] * 100 / total;
            data.setFormattedValue(rowIndex, 0, dataObject[0] + " - " + percentage.toFixed(2) + "%");
        }

        var options = {
            title: 'App Categories',
            pieHole: 0.6,
            sort: 'disable',
            allowHtml: true,
            legend: {
                position: 'left',
                textStyle: {
                    fontSize: 12
                }
            },
            tooltip: {
                text: 'none'
            },
            sliceVisibilityThreshold: 0
        };

        var table = new window.google.visualization.PieChart(document.getElementById(accessType));
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
        <div id={accessType}></div>
    );
}

export default DonutChart;
import React, { useEffect } from 'react';

function DonutChart(props) {

    var accessType = props.info.Access;

    var dataObjects = props.info.Data;
    var labels = props.info.Labels;
    var title = props.info.Title;

    const renderTable = () => {
        var data = new window.google.visualization.DataTable();
        // assuming first column is string and second is number
        data.addColumn('string', labels[0].label);
        data.addColumn('number', labels[1].label);
        
        var total = dataObjects.map((cur) => parseFloat(cur.col2)).reduce((prev, cur) => prev + cur);

        for (var dataObject of dataObjects) {
            var rowIndex = data.addRow([dataObject.col1, parseFloat(dataObject.col2)]);
            var percentage = parseFloat(dataObject.col2) * 100 / total;
            data.setFormattedValue(rowIndex, 0, dataObject.col1 + " - " + percentage.toFixed(2) + "%");
        }

        var options = {
            title: title,
            pieHole: 0.6,
            pieSliceText: 'none',
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
        <div className='ChartDiv' id={accessType}></div>
    );
}

export default DonutChart;
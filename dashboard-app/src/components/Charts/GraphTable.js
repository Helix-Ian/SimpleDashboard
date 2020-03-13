import React, { useEffect } from 'react';

/*
props will have 1 key "info" - it will have this structure. Access will be the unique key of the 
chart and Title will be its title. The data of the chart will come in the structure shown below. Counts
will be the only column that is a numeric value and all other values will be strings.
{
    "Access": "AccessType",
    "DisplayType": "ChartTable",
    "Title" : "Chart Title",
    "Labels": {
        col1: "Column 1",
        col2: "Column 2"
    }
    "Data": [
        {
            col1: "rowValue",
            col2: 1000
        }
    ]
}
*/

function GraphTable(props) {

    var dataObjects = props.info.Data
    var labels = props.info.Labels
    var accessType = props.info.Access
    
    const renderTable = () => {
        var data = new window.google.visualization.DataTable();

        var dataColumnName = undefined;
        var dataColumnIndex = undefined;
        //Create column headers and define column types
        for (var key in labels) {
            var colName = labels[key];
            if (colName === "Count" || colName === "Counts") {
                dataColumnName = colName;
                dataColumnIndex = data.addColumn('number', colName);
            } else {
                data.addColumn('string', colName);
            }
        }
        
        //Organize row data for each column from the json
        for (var dataObject of dataObjects) {
            var rowObj = [];
            for (var key in dataObject) {
                if (labels[key] === dataColumnName) {
                    rowObj.push(parseInt(dataObject[key]));
                } else {
                    rowObj.push(dataObject[key]);
                }
            }
            data.addRow(rowObj);
        }

        if (dataColumnIndex) {
            var barFormat = new window.google.visualization.BarFormat({base: 0, min: 0});
            barFormat.format(data, dataColumnIndex);
        }

        var options = {
            sort: 'disable',
            allowHtml: true
        };

        var table = new window.google.visualization.Table(document.getElementById(accessType));
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

export default GraphTable;
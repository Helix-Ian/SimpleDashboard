import React, { useEffect } from 'react';

/*
props will have 1 key "info" - it will have this structure. Access will be the unique key of the 
chart and Title will be its title. The data of the chart will come in the structure shown below. Counts
will be the only column that is a numeric value and all other values will be strings.
{
    "Access": "AccessType",
    "DisplayType": "ChartTable",
    "Title" : "Chart Title",
    "Data": [
        {
            "Column1": "rowValue",
            "Column2": 1000
        }
    ]
}
*/

function GraphTable(props) {

    var dataObjects = props.info.Data
    var accessType = props.info.Access
    
    const renderTable = () => {
        var data = new window.google.visualization.DataTable();
        //Create column headers and define column types
        for (var key in dataObjects[0]) {
            var columnType = key !== 'Counts' ? 'string' : 'number'
            data.addColumn(columnType, key);
        }
        
        //Organize row data for each column from the json
        for (var dataObject of dataObjects) {
            var rowObj = [];
            for (var key in dataObject) {
                rowObj.push(dataObject[key]);
            }
            data.addRow(rowObj);
        }

        var barFormat = new window.google.visualization.BarFormat({base: 0, min: 0});
        barFormat.format(data, 1);

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
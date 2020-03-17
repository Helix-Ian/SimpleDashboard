import React, { useEffect } from 'react';
import ChartTitle from '../TemplateOnePages/ChartTitle';

/*
props will have 1 key "info" - it will have this structure. Access will be the unique key of the 
chart and Title will be its title. The data of the chart will come in the structure shown below.
Any column marked with "graph: true" will be numerical
{
    "Access": "AccessType",
    "DisplayType": "ChartTable",
    "Title" : "Chart Title",
    "Labels": {
        0: { label: "Column 1" },
        1: { label: "Column 2", graph: true }
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
    var title = props.info.Title
    
    const renderTable = () => {
        var data = new window.google.visualization.DataTable();

        var graphColumns = [];
        //Create column headers and define column types
        for (var key in labels) {
            var col = labels[key];
            if (col.graph) {
                graphColumns.push(data.addColumn('number', col.label));
            } else {
                data.addColumn('string', col.label);
            }
        }
        
        //Organize row data for each column from the json
        for (var dataObject of dataObjects) {
            var rowObj = [];
            for (var key in labels) {
                var colKey = `col${parseInt(key)+1}`;
                if (labels[key].graph) {
                    rowObj.push(parseInt(dataObject[colKey].replace(/,/g, '')));
                } else {
                    rowObj.push(dataObject[colKey]);
                }
            }
            data.addRow(rowObj);
        }

        var barFormat = new window.google.visualization.BarFormat({base: 0, min: 0});
        for (var colIndex of graphColumns) {
            barFormat.format(data, colIndex);
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
        <div>
            <ChartTitle title={title} />
            <div className='ChartDiv' id={accessType}></div>
        </div>
    );
}

export default GraphTable;
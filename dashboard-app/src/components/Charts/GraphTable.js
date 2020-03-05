import React, { useEffect } from 'react';

function GraphTable(props) {

    var dataObjects = [["Anomaly", 1460], ["SQL Injection", 402], ["Code Injection", 212], ["OS Command Injection", 143]];

    const renderTable = () => {
        var data = new window.google.visualization.DataTable();
        data.addColumn('string', 'Intrusion Type');
        data.addColumn('number', 'Counts');
        
        for (var dataObject of dataObjects) {
            data.addRow(dataObject);
        }

        var barFormat = new window.google.visualization.BarFormat({base: 0, min: 0});
        barFormat.format(data, 1);

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

export default GraphTable;
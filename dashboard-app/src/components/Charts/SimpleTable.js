import React, { useEffect } from 'react';


const SimpleTable = (props) => {

    // temporary, will replace with json handled through props
    var dataObjects = [
        {"Name": "demo-server-1", "OS": "Windows Server 2008 R2 Standard", "IP": "10.1.1.4", "Address": "00-50-56-97-5A-2B"},
		{"Name": "demo-server-2", "OS": "Windows Server 2019 Datacenter", "IP": "10.1.2.4", "Address": "00-50-56-B0-9C-75"},
		{"Name": "demo-server-3", "OS": "Windows Server 2008 R2 Standard", "IP": "10.1.2.26", "Address": "00-50-56-B0-06-1A"},
		{"Name": "demo-server-4", "OS": "Windows Server 2008 R2 Standard", "IP": "10.1.2.5", "Address": "00-50-56-97-0C-C7"},
		{"Name": "demo-server-5", "OS": "Windows Server 2008 R2 Standard", "IP": "10.1.1.1", "Address": "E4-1F-13-45-89-82"},
		{"Name": "demo-server-6", "OS": "Windows Server 2008 R2 Standard", "IP": "10.1.2.3", "Address": "00-50-56-B0-3E-D8"}
    ];

    const renderTable = () => {
        var data = new window.google.visualization.DataTable();
        // TODO replace column generation with columns given by data fields

        for (var column in dataObjects[0]) {
            data.addColumn('string', column);
        }
        
        for (var dataObject of dataObjects) {
            var row = [];
            for (var key in dataObject) {
                row.push(dataObject[key]);
            }
            data.addRow(row);
        }

        var options = {
            sort: 'disable'
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

export default SimpleTable;
import React, { useEffect } from 'react';


/*
    Expected data: List of dictionaries, with static column names each value being the row value
    [ {col1: "Value1", col2: "Value2"}, {col1, "Value3", col2: "Value4"} ]
*/
const SimpleTable = (props) => {

    //Get datat objects and the accessType for this table
    var dataObjects = props.info.Data
    var labels = props.info.Labels;
    var accessType = props.info.Access
    var title = props.info.Title;

    const renderTable = () => {
        var data = new window.google.visualization.DataTable();

        // Add the given columns from the data, using the first entry as a basis
        for (var col in labels) {
            data.addColumn('string', labels[col].label);
        }
        
        // Add each row of data, using given order
        for (var dataObject of dataObjects) {
            var row = [];
            for (var key in dataObject) {
                row.push(dataObject[key]);
            }
            data.addRow(row);
        }

        var options = {
            title: title,
            sort: 'disable'
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

export default SimpleTable;
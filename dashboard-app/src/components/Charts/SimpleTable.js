import React, { useEffect } from 'react';


/*
    Expected data: List of dictionaries, with each key being the column name and each value being the row value
    [ {"Column1": "Value1", "Column2": "Value2"}, {"Column1", "Value3", "Column2": "Value4"} ]
*/
const SimpleTable = (props) => {

    //Get datat objects and the accessType for this table
    var dataObjects = props.info.Data
    var accessType = props.info.Access

    const renderTable = () => {
        var data = new window.google.visualization.DataTable();

        // Add the given columns from the data, using the first entry as a basis
        for (var column in dataObjects[0]) {
            data.addColumn('string', column);
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
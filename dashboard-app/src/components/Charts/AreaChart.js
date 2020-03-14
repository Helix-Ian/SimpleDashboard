import React, { useEffect } from 'react';

/*
    Exact data format is unknown, expecting array of string + one or two values
*/
function AreaChart(props) {

    var accessType = props.info.Access;
    var dataObjects = props.info.Data;
    var labels = props.info.Labels;

    const renderTable = () => {
        var data = new window.google.visualization.DataTable();
        var dualValues = labels.col3 || 0;

        data.addColumn('string', labels.col1);
        // if there are two numeric values, add an extra column
        if (dualValues) {
            data.addColumn('number', labels.col2);
            data.addColumn('number', labels.col3);
        } else {
            data.addColumn('number', labels.col2);
        }

        // Add each row based on the data (assuming array of two values)
        for (var dataObject of dataObjects) {
            var row = [dataObject.col1, parseFloat(dataObject.col2)];
            if (dualValues) {
                row.push(-parseFloat(dataObject.col3)); // negative to make it under the first
            }
            data.addRow(row);
        }

        var formatGB = new window.google.visualization.NumberFormat({"pattern":"#,###.##GB;#,###.##GB"});
        formatGB.format(data, 1);
        if (dualValues) {
            formatGB.format(data, 2);
        }

        // the format option is supposed to remove the minus sign on the axis, and it works for the data,
        // but for some reason it's not working on the axis
        var options = {
            title: "Bandwidth Summary",
            vAxis: {
                format: "#,###.##GB;#,###.##GB"
            },
            legend: {
                position: (dualValues ? 'in' : 'none')
            }
        };

        var table = new window.google.visualization.AreaChart(document.getElementById(accessType));
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

export default AreaChart;
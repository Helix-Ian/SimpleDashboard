import React, { useEffect } from 'react';

/*
    Exact data format is unknown, expecting array of string + one or two values
*/
function AreaChart(props) {

    var accessType = props.info.Access;
    var dataObjects = props.info.Data;
    var labels = props.info.Labels;
    var title = props.info.Title;

    const renderTable = () => {
        var data = new window.google.visualization.DataTable();
        var dualValues = labels[2] || 0;

        data.addColumn('string', labels[0].label);
        data.addColumn('number', labels[1].label);
        // if there are two numeric values, add an extra column
        if (dualValues) {
            data.addColumn('number', labels[2].label);
        }

        // Add each row based on the data (assuming array of two values)
        for (var dataObject of dataObjects) {
            var row = [dataObject.col1, parseFloat(dataObject.col2)];
            if (dualValues) {
                row.push(parseFloat(dataObject.col3));
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
            title: title,
            vAxis: {
                format: "#,###.##GB;#,###.##GB"
            },
            legend: {
                position: (dualValues ? 'in' : 'none')
            }
        };

        var table = new window.google.visualization.AreaChart(document.getElementById(accessType));
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
        <div class='ChartDiv' id={accessType}></div>
    );
}

export default AreaChart;
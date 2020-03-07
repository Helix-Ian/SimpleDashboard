import React, { useEffect } from 'react';

/*
    Exact data format is unknown, expecting array of string + one or two values
*/
function AreaChart(props) {

    // single value testing
    // var dataObjects = [['0:00', 2.0], ['2:00', 3.9], ['4:00', 1.8], ['6:00', 3.6], ['8:00', 3.4], ['10:00', 3.6], ['12:00', 2.5],
    //                    ['14:00', 4.2], ['16:00', 2.8], ['18:00', 2.0], ['20:00', 1.8], ['22:00', 4.1], ['0:00', 2.0]];

    // dual value testing
    var dataObjects = [['1/26/2020', 0.0, 1.2], ['1/26/2020', 0.0, 2.0], ['1/27/2020', 3.1, 2.3], ['1/27/2020', 2.0, 8.0],
                       ['1/28/2020', 1.6, 1.7], ['1/28/2020', 5.1, 3.1], ['1/29/2020', 1.5, 1.1], ['1/29/2020', 1.6, 4.0]];

    const renderTable = () => {
        var data = new window.google.visualization.DataTable();
        var dualValues = false;

        data.addColumn('string', 'Time');
        // if there are two numeric values, add an extra column
        if (dataObjects[0].length > 2) {
            data.addColumn('number', 'Sent');
            data.addColumn('number', 'Received');
            dualValues = true;
        } else {
            data.addColumn('number', 'Data');
        }

        // Add each row based on the data (assuming array of two values)
        for (var dataObject of dataObjects) {
            var row = [dataObject[0], dataObject[1]];
            if (dualValues) {
                row.push(-dataObject[2]); // negative to make it under the first
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

        var table = new window.google.visualization.AreaChart(document.getElementById(props.chartName));
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
        <div id={props.chartName}></div>
    );
}

export default AreaChart;
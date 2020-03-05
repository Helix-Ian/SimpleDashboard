import React, { useEffect } from 'react';


const SummaryTable = (props) => {

    // temporary, will replace with json handled through props
    var dataObjects = [
        {name: "JonDo", data: [["192.168.4.14", 9224]]},
        {name: "Proxy.HTTP", data: [["192.168.5.1", 26], ["192.168.5.2", 9], ["192.168.5.3", 2]]}
    ];

    const renderTable = () => {
        var data = new window.google.visualization.DataTable();
        // TODO replace column generation with columns given by data fields
        data.addColumn('string', 'Application');
        data.addColumn('string', 'User (or IP)');
        data.addColumn('number', 'Session');
        data.addColumn('number', '% of Subtotal');
        
        for (var dataObject of dataObjects) {
            var objectData = dataObject.data;
            var objectValues = objectData.map((cur) => cur[1]);

            var total = objectValues.reduce((prev, cur) => prev + cur);
            var percentages = objectValues.map((cur) => (cur / total) * 100);

            var firstRow = objectData[0];
            data.addRow([dataObject.name, firstRow[0], firstRow[1], percentages[0]]);
            for (var i = 1; i < objectData.length; i++) {
                data.addRow(['', objectData[i][0], objectData[i][1], percentages[i]]);
            }
            var boldIndex = data.addRow(['', 'Subtotal', total, 100]);
            data.setProperty(boldIndex, 1, 'style', 'font-weight: bold;');
            data.setProperty(boldIndex, 2, 'style', 'font-weight: bold;');
            data.setProperty(boldIndex, 3, 'style', 'font-weight: bold;');
        }

        var percentFormat = new window.google.visualization.NumberFormat({suffix: '%'});
        percentFormat.format(data, 3);

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

export default SummaryTable;
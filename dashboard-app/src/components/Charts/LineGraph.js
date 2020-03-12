import React, { useEffect } from 'react';

function LineGraph(props) {
  //Get data objects and the accessType for this table
  var dataObjects = props.info.Data;
  var accessType = props.info.Access;

  const renderTable = () => {
    var data = new window.google.visualization.DataTable();

    // Add the given columns from the data, using the first entry as a basis
    for (var key in dataObjects[0]) {
      var columnType = key !== 'Time' ? 'number' : 'string';
      data.addColumn(columnType, key);
    }

    for (var dataObject of dataObjects) {
      var row = [];
      for (var key in dataObject) {
        let dataInstance = dataObject[key];
        if (key === 'Time') {
          // timestamp format is "2020-01-26T00:00:00.0+06:00Z"
          dataInstance = dataInstance.substring(0, 10);
        }

        row.push(dataInstance);
      }

      data.addRow(row);
    }

    var options = {
      title: 'Exploit Attack Timeline',
      curveType: 'function',
      height: 500,
      hAxis: {
        slantedText: true,
        slantedTextAngle: 45,
        textStyle: {
          fontSize: 12
        }
      },
      colors: ['#FFE066', '#FFA500', '#CD5C5C']
    };

    var chart = new window.google.visualization.LineChart(
      document.getElementById(accessType)
    );
    chart.draw(data, options);
  };

  useEffect(() => {
    // delays loading until charts api is loaded
    if (!window.isGoogleChartsLoaded) {
      window.googleChartsLoadFunctions.push(renderTable);
      return;
    }

    renderTable();
  });

  return <div id={accessType}></div>;
}

export default LineGraph;

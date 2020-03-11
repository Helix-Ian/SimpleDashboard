import React, { useEffect } from 'react';

function PieChart(props) {
  //Get data objects and the accessType for this table
  var dataObjects = props.info.Data;
  var accessType = props.info.Access;

  const renderTable = () => {
    var data = new window.google.visualization.DataTable();

    // Add the given columns from the data, using the first entry as a basis
    for (var key in dataObjects[0]) {
      var columnType = key !== 'Total' ? 'string' : 'number';
      data.addColumn(columnType, key);
    }

    for (var dataObject of dataObjects) {
      var row = [];
      for (var key in dataObject) {
        row.push(dataObject[key]);
      }

      data.addRow(row);
    }

    var options = {
      title: 'Exploit Attacks by Severity',
      slices: {
        0: { color: 'yellow' },
        1: { color: 'orange' },
        2: { color: 'red' }
      }
    };

    var chart = new window.google.visualization.PieChart(
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

export default PieChart;
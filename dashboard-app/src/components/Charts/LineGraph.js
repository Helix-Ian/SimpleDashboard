import React, { useEffect } from 'react';

function LineGraph(props) {
  //Get data objects and the accessType for this table
  var dataObjects = props.info.Data;
  var accessType = props.info.Access;

  console.log('dataObjects is...', dataObjects);

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
        row.push(dataObject[key]);
      }

      data.addRow(row);
    }

    var options = {
      title: 'Exploit Attack Timeline',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var graph = new window.google.visualization.LineGraph(
      document.getElementById(accessType)
    );
    graph.draw(data, options);
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

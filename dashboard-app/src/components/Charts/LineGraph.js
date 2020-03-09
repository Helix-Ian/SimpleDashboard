import React, { useEffect } from 'react';

function LineGraph(props) {
  var dataObjects = [
    ['Year', 'Metric 1', 'Metric 2'],
    ['2000', 1000, 400],
    ['2005', 1170, 460],
    ['2010', 660, 1120],
    ['2015', 1030, 540]
  ];

  const renderTable = () => {
    var data = new window.google.visualization.DataTable();
    data.addColumn('', '');
    data.addColumn('', '');

    for (var dataObject of dataObjects) {
      data.addRow(dataObject);
    }

    var options = {
      title: 'Line Graph Component',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var graph = new window.google.visualization.LineGraph(
      document.getElementById(props.graphName)
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

  return <div id={props.graphName}></div>;
}

export default LineGraph;

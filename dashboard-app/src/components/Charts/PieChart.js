import React, { useEffect } from 'react';

function PieChart(props) {
  var dataObjects = [
    ['string1', 1],
    ['string2', 2],
    ['string3', 3],
    ['string4', 4]
  ];

  const renderTable = () => {
    var data = new window.google.visualization.DataTable();
    data.addColumn('string', 'Test');
    data.addColumn('number', 'Test');

    for (var dataObject of dataObjects) {
      data.addRow(dataObject);
    }

    var options = {
      sort: 'disable',
      allowHtml: true
    };

    var chart = new window.google.visualization.PieChart(
      document.getElementById(props.chartName)
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

  return <div id={props.chartName}></div>;
}

export default PieChart;

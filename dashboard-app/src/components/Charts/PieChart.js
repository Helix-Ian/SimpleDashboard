import React, { useEffect } from 'react';

function PieChart(props) {
  
  var dataObjects = google.visualization.arrayToDataTable([
    ['Alert Status', 'Percentage of Total']
    ['Medium Alert', 64],
    ['High Alert', 27],
    ['Critical Alert', 9]
  ]);

  var options = {
    title: 'Example Pie Chart'
  };

  const renderTable = () => {
    var data = new window.google.visualization.DataTable();
    data.addColumn('string', 'Status Category');
    data.addColumn('number', 'Percentage');

    for (var dataObject of dataObjects) {
      data.addRow(dataObject);
    }

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

  return <div id={props.chart}></div>;
}

export default PieChart;

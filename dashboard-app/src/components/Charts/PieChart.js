import React, { useEffect } from 'react';

function PieChart(props) {
  var dataObjects = [
    ['Medium Alert', 64],
    ['High Alert', 27],
    ['Critical Alert', 9]
  ];

  const renderTable = () => {
    var data = new window.google.visualization.DataTable();
    data.addColumn('string', 'Alert Category');
    data.addColumn('number', 'Percentage');

    for (var dataObject of dataObjects) {
      data.addRow(dataObject);
    }

    var options = {
      title: 'Example Pie Chart',
      slices: {
        0: { color: '#FFC300' },
        1: { color: '#FF5733' },
        2: { color: '#FA0C04' }
      }
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

import React, { useEffect } from 'react';

function LineGraph(props) {
  var dataObjects = props.info.Data;
  var accessType = props.info.Access;
  var labels = props.info.Labels;

  const renderTable = () => {
    var data = new window.google.visualization.DataTable();

    data.addColumn('string', labels.col1);
    data.addColumn('number', labels.col2);
    data.addColumn('number', labels.col3);
    data.addColumn('number', labels.col4);

    for (var dataObject of dataObjects) {
      var rowIndex = data.addRow([
        dataObject.col1,
        parseFloat(dataObject.col2),
        parseFloat(dataObject.col3),
        parseFloat(dataObject.col4)
      ]);
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

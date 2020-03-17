import React, { useEffect } from 'react';

function LineGraph(props) {
  var dataObjects = props.info.Data;
  var accessType = props.info.Access;
  var labels = props.info.Labels;
  var title = props.info.Title;

  const renderTable = () => {
    var data = new window.google.visualization.DataTable();

    data.addColumn('string', labels[0].label);
    data.addColumn('number', labels[1].label);
    data.addColumn('number', labels[2].label);
    data.addColumn('number', labels[3].label);

    for (var dataObject of dataObjects) {
      var rowIndex = data.addRow([
        dataObject.col1,
        parseFloat(dataObject.col2),
        parseFloat(dataObject.col3),
        parseFloat(dataObject.col4)
      ]);
    }

    var options = {
      title: title,
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
    window.addEventListener('resize', renderTable, false);
  };

  useEffect(() => {
    // delays loading until charts api is loaded
    if (!window.isGoogleChartsLoaded) {
      window.googleChartsLoadFunctions.push(renderTable);
      return;
    }

    renderTable();
  });

  return <div className='ChartDiv' id={accessType}></div>;
}

export default LineGraph;

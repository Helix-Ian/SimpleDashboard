import React, { useEffect } from 'react';

function PieChart(props) {
  //Get data objects and the accessType for this table
  var dataObjects = props.info.Data;
  var accessType = props.info.Access;
  var labels = props.info.Labels;

  const renderTable = () => {
    var data = new window.google.visualization.DataTable();

    data.addColumn('string', labels.col1);
    data.addColumn('number', labels.col2);
    data.addColumn('number', labels.col3);

    var total = dataObjects
      .map(cur => parseFloat(cur.col2))
      .reduce((prev, cur) => prev + cur);

    for (var dataObject of dataObjects) {
      var rowIndex = data.addRow([
        dataObject.col1,
        parseFloat(dataObject.col2),
        parseFloat(dataObject.col3)
      ]);

      var percentage = (parseFloat(dataObject.col2) * 100) / total;
      data.setFormattedValue(
        rowIndex,
        0,
        percentage.toFixed(2) + '%' + ' ' + dataObject.col1
      );
    }

    var options = {
      title: 'Exploit Attacks by Severity',
      slices: {
        0: { color: '#FFE066' },
        1: { color: '#FFA500' },
        2: { color: '#CD5C5C' }
      },
      legend: { position: 'right', alignment: 'center' },
      pieSliceText: 'none',
      tooltip: { isHtml: true, showColorCode: true }
    };

    var chart = new window.google.visualization.PieChart(
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

  return <div class='ChartDiv' id={accessType}></div>;
}

export default PieChart;
